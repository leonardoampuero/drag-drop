# Drag and drop jquery

Demo
https://s3-sa-east-1.amazonaws.com/ampuero/recording.gif

## How it works

* Add, delete, and sort items 
* Drap and drop with jquery sortable
* Save items on MongoDB
* Order the items and save the position immediately

## Techs - libraries

* Vanilla Javascript + jquery
* Nodejs for the API
* Bootstrap v4
* MongoDB
* StandarJs for coding conventions
* Docker file

### Run it

```bash
> npm install
> npm start
```

### Run docker

```bash
> docker-compose up
```

If you get an error such as 
ERROR: Couldn't connect to Docker daemon - you might need to run `docker-machine start default`

```bash
> docker-machine restart default
> docker-machine env default
> docker-compose up
```

If you cannot access localhost:3000 check you docker-machine ip

```bash
> docker-machine ip default
```




