#!/bin/bash

# Very simple example of how to configure a docker-based CouchDB 2.0 cluster from scratch with as many nodes you want.
# You'll need to execute the script "couch_cluster.sh" inside of the container on startup to make sure that it's listening correctly on startup.

# The initial base couchDB image itself should have been built using something like this: https://github.com/kafecho/ansible-couchdb2
#
# Once that's built and named 'couch_ansible_installed`, this script should work.
#
# I'm thinking about extending this into docker swarm..... maybe. The overlay is pretty sick.

if [ x"$1" == x ] ; then
	echo "Need username"
	exit 1
fi

user=$1
shift

if [ x"$1" == x ] ; then
	echo "Need password"
	exit 1
fi

pass=$1
shift

if [ x"$1" == x ] ; then
	echo "Need # nodes"
	exit 1
fi

nodes=$1
shift

bringup=10 # delay to wait before the cluster is listening in the containers

function verify {
	error=$1

	if [ $error -gt 0 ] ; then
		echo "Failed. Bailing."
		exit 1
	fi
		
}

if [ $0 != "-bash" ] ; then
        pushd `dirname "$0"` 2>&1 > /dev/null
fi
dir=$(pwd)
if [ $0 != "-bash" ] ; then
        popd 2>&1 > /dev/null
fi

echo "We are here: $dir"

echo "Restarting ${nodes} nodes with ${user}:${pass}..."

for num in $(seq 1 ${nodes}) ; do
    name="cluster$num"
	docker stop -t 0 ${name} 
	docker rm ${name} 
done

if [ x"$1" == x ] ; then
    for num in $(seq 1 ${nodes}) ; do
        name="cluster$num"
        bindfirst=""
        if [ $num == 1 ] ; then
            bindfirst="-p 5985:5984"
        fi
     	docker run -i -t -d $bindfirst --name ${name} -e CUSER="$user" -e CPASS="$pass" -e "CPARAMS=$(cat /home/mrhines/mica-android/mica/params.py)" couchdb24 bash -c "cd /home/mrhines/mica; git pull; util/couch_cluster.sh >> /var/log/cluster.log"
    done
else
	echo "Skipping startup. Only cleanup."
	exit 0
fi

echo "waiting ${bringup} seconds for bringup..."
sleep ${bringup}

echo "Setting passwords and enabling initial clusters..."

for num in $(seq 1 ${nodes}) ; do
    name="cluster$num"
	ip=$(docker inspect -f '{{range .NetworkSettings.Networks}}{{.IPAddress}}{{end}}' ${name})
    echo "Enabling cluster on ${ip}"
    # If you're starting from a truly empty container, then don't feed the username and password to couchdb if it was never set before. Chicken and the egg because we're also setting the password here, too.
    curl -X POST -H "Content-Type: application/json" -d "{\"action\":\"enable_cluster\",\"bind_address\":\"0.0.0.0\",\"username\":\"${user}\",\"password\":\"${pass}\"}" -basic --user ${user}:${pass} http://${ip}:5984/_cluster_setup
    verify $?
done


firstip=$(docker inspect -f '{{range .NetworkSettings.Networks}}{{.IPAddress}}{{end}}' cluster1)

echo "First node: $firstip"
for num in $(seq 2 ${nodes}) ; do
    name="cluster$num"
	ip=$(docker inspect -f '{{range .NetworkSettings.Networks}}{{.IPAddress}}{{end}}' ${name})
    echo "adding node: $firstip <= $ip"
	curl -X POST -H "Content-Type: application/json" -d "{\"action\":\"add_node\",\"username\":\"${user}\",\"password\":\"${pass}\",\"host\":\"${ip}\",\"port\":5984}" --basic --user ${user}:${pass} http://${firstip}:5984/_cluster_setup
    verify $?
done

echo "Finishing cluster"
curl -X POST -H "Content-Type: application/json" -d '{"action":"finish_cluster"}' --basic --user ${user}:${pass} "http://${firstip}:5984/_cluster_setup"
verify $?

echo "Membership:"
curl --basic --user ${user}:${pass} "http://${firstip}:5984/_membership"
verify $?

# More examples to test fault tolerance:
#
# Removing a node: Now, verify that after replication and adding a new node that the new copies and disk sizes get repopulated in the new node.
# rev=$(curl --basic --user ${user}:${pass} 172.17.0.2:5986/_nodes/couchdb@172.17.0.4 2>/dev/null | jq "._rev" | sed "s/\"//g")
# curl -X DELETE --basic --user ${user}:${pass} "http://${firstip}:5986/_nodes/couchdb@172.17.0.4?rev=${rev}"
#
# Then replace it with a new node of the same identity:
# curl -X PUT --basic --user ${user}:${pass} "http://${firstip}:5986/_nodes/couchdb@172.17.0.4" -d {}
