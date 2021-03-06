MLL: Meta-Language Learning through reading and chat
====================================================

MLL (Meta-Language Learning) is a multi-language, data-driven,
analytical language-learning memory-assisted software program
that tracks what words you know and don't know
as you read through stories. The motivation is that there are
already oceans of pre-existing chinese authors and internet
content out there, so why not use it for language learning
(even beginners), rather than depend on communities of people
and/or flashcards to bootstrap the content of the language
software - let's teach people to read what already exists
in the world, and then use people to correct the errors
*after* the content has already been tranformed into an
interactive, readable format.

Full Usage Documentation: https://github.com/hinesmr/mica/wiki

Credits:
 1. Lexical word parsing and character grouping: http://www.ictclas.org
 2. Offline chinese translation: https://pypi.python.org/pypi/cjklib
 3. Offline polyphome listings: https://github.com/lxyu/pinyin
 4. Online sentence-level translations: http://www.microsoft.com/en-us/translator/ (as long as it remains free)
 5. PDF extraction: pdfminer
 6. PDF creation: fpdf
 7. CouchDB


INSTALLATION:
=============

There are several steps to perform before MLL can run:

(Yes, please follow them all).

1) Install basic package dependencies

$ sudo apt-get install python-dev python-openssl python-setuptools python-sqlalchemy python-twisted* python-beaker python-webob libstdc++5 python-simplejson python-daemon python-pip python-crypto python-zodb

2) Create a developer account / Translator Application key/ID requests from Microsoft

$ https://datamarket.azure.com/account/keys # create keys

$ http://datamarket.azure.com/dataset/bing/microsofttranslator # bind those keys to the translator API

 # You might need to create a couple of new accounts - just follow the instructions

3) Install CJK library and CEDICT:

$ cd /tmp

$ sudo pip install cjklib  # not yet in apt-get

$ sudo installcjkdict CEDICT

$ wget ftp://ftp.unicode.org/Public/UNIDATA/Unihan.zip

$ sudo buildcjkdb -r build cjklibData 


4) Generated a self-signed certificate for Twisted

$ openssl req -x509 -nodes -days 9000 -newkey rsa:2048 -keyout mica.key -out mica.crt

5) Copy ICTCLAS (www.ictclas.org) libraries for linking 

$ sudo cp ictc_64bit/libICTCLAS50.* /usr/lib64  # if you are on a 64-bit system

$ sudo cp ictc_32bit/libICTCLAS50.* /usr/lib    # if you are on a 32-bit system

$ sudo ldconfig

6) Compile Python Interface to Beijing University ICTCLAS Chinese Lexical Analysis System 
 
$ cd mica

$ python setup.py build

$ sudo python setup.py install 

$ cp build/*/mica_ictclas.so .

7) Install PDF manipulation libraries:

$ sudo pip install pdfminer
$ sudo pip install fpdf

8) Next, install CouchDB (at least version 1.5). I recommend modifying your /etc/couchdb/local.ini to setup SSL support if you want to use the Android version of MICA Reader.

9) Next, install python-couchdb (pip install couchdb, if it's not in your distribution).

10) Create a configuration file params.py and fill out the required parameters (TBD).


RUNNING:
========

1) If all the dependencies are in place, then you should be able to do the following:

$ ./test.py

2) Open your browser and view the web page on port (on port 443 instead of 80 if you used SSL).

   - The default username is 'admin' and the default password is 'password'. 

4) Try uploading a story or searchable PDF and happy reading!


FAQ:
=======

1) Do you have a mobile version?
   - Yes, it's called "Read Alien": https://readalien.com, both for Android and iOS. In fact, I use the mobile version much more frequently than the web-based version. The mobile version does not allow upload of new stories. You first must upload them to the web version and then the phone will automatically stay synchronized with the website at all times so that you can use the mobile application in an offline mode while you are learning.
   - Both versions are free in their respective app stores.
   - The iOS version is here: <a href='http://github.com/hinesmr/mll-ios'>MLL for iOS</a>
   - The android version is here: <a href='http://github.com/hinesmr/mll-android'>MLL for Android</a>.
