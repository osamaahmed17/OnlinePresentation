# Super basic instructions for non expert
For the non tech savy who just want to run the page, use the following, else you can also
run the standard 
npm i
npm start 
from within the presentation folder


You can modify the file index.html from withih the presentation folder > ui 
Just do the very simple changes and run it as it is.

# Setup

Either Vagrant or Docker setup can be used.

## Vagrant
```
# Create Vagrant box
vagrant up

# Go into the box
vagrant ssh

# Go into the mapped directory
cd /code

# Install bower dependencies
bower install

# Run the app 
./serve.sh
```

Then you will be able to view the app at http://localhost:8080

## Docker

```
# build the docker container
 docker build -t nv-demo .

# Run the app
 ./docker_serve.sh
```

Then you will be able to view the app at http://<DOCKER_HOST>:8080 (e.g. http://192.168.99.100:8080)

## Local

```
 # Install dependencies
 npm install && bower install

 # Run the app
 ./serve.sh
```
