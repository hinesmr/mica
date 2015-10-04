var fs = require('fs');
//var jQuery = require('../serve/jquery-1.11.3.js');
var $ = require('jquery');
//var couch = require('../serve/jquery.couch-1.5.js');
var couch = require('couchjs');
var mica = require('../serve/mica.js');
//eval(fs.readFileSync('../serve/mica.js')+'');

var Docker = require('dockerode');
var docker = new Docker({socketPath: '/var/run/docker.sock'});

function remove(container, next) {
	container.remove(function (err, data) {
	  if (err) {
	      console.log(err);
	  } else {
	      console.log("Container removed.");
		if(next)
		      next(container, null);
	  }
	});
}
function cleanup(name, next) {
	console.log("Looking up: " + name);
        var container = docker.getContainer(name);
	if (container) {
		container.inspect(function (err, data) {
			if (err) {
			    console.log("No container to cleanup: " + name);
				if(next)
				    next(container, null);
			} else {
				console.log("Container inspected: " + data);
				if (data.State.Running) {
					container.stop(function (err, data) {
						if (err) 
						      console.log(err);
						else {
							console.log("Container stopped.");
							remove(container, next);
						}
					});
				} else {
				     remove(container, next);
				}
			  }
		});
	} else {
		console.log("No such container: " + name);
	}
}

// query API for container info
//docker run -i -t -d -p 5984:5984 -p 2222:22 -p 6984:6984 -p 7984:7984 --name couchdev micadev7 
options = {
	Image: 'micadev7', 
	Cmd: ['/home/mrhines/mica/restart.sh'], 
	name: 'couchdev',
	Tty : true,
	ExposedPorts: {
            "22/tcp": {},
            "5984/tcp": {},
            "6984/tcp": {},
            "7984/tcp": {}
        }
}

function start(result, next) {
	docker.createContainer(options, function (err, container) {
	  if (err) 
	      console.log(err);
	  else {
		console.log("Container created.");
		container.start(function (err, data) {
			if (err) 
			      console.log(err);
			else {
				console.log("Container started.");
				cleanup(options.name, null);
			}
		  });
	  }
	});

}

cleanup(options.name, start);
