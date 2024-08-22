<!-- PROJECT LOGO -->
<br />
<p align="center">
    <h1 align="center"> Deploying via Docker </h1>
    <h6 align="center">August 2024 - James Robiony-Rogers & Corban Surtees</h6>

  <p align="center">
   Using virtualisation to effect portable building and deployment of software applications
  </p>
</p>

___

## Overview 

This project demonstrates the use of virtualization technologies to build and deploy a portable software application for job seekers. Our application, a Job Application Tracker, is designed to help students and job seekers efficiently manage their job search process. It operates across three different virtual machines (VMs), showcasing the power of distributed systems and cloud-ready software development practices.

The Job Application Tracker allows users to record and monitor the companies and roles they've applied to, including key information such as application status, submission dates, additional notes, and a chronological history of each application's progress.


## Built With

* **Frontend:** [React.js](https://reactjs.org) **&** [Tailwind CSS](https://tailwindcss.com)
* **Backend:** [Python Flask REST API](https://flask.palletsprojects.com/en/2.0.x/)
* **Database:** [Supabase](https://supabase.io)

## File Tree 
- `frontend` - Contains the react frontend project
- `backend` - Contains the python flask backend project
- `database` - Contains the supabase database configuration


### Running Locally

1. Build and run the supabase database 
```bash
cd backend 
docker compose up -d
```

2. Build and run the job tracker (from the root of the repository)
```bash 
docker compose up -d
```

3. Access the job tracker application at [`http://localhost:80`](http://localhost:5000)
   - Supabase studio dashboard: [`http://localhost:8000`](http://localhost:8000)
   - Python Flask API: [`http://localhost:5001`](http://localhost:5001)

### Shutting Down the Project

1. Shut down the job tracker 
```bash
docker compose down
```

2. Shut down the supabase database 
```bash
cd backend
docker compose down
```


<!-- USAGE EXAMPLES -->
## View Project

<div align="center">
   <img style="width: 100%" src="https://dev-to-uploads.s3.amazonaws.com/uploads/articles/rcdywbhax0k9hbipb486.png">
</div>

---


### Useful Docker Commands 

Building a single docker image 
```bash
docker build --no-cache --progress=plain --tag "job-tracker-<name>" .
```
- `--no-cache` - Build the image without using cache
- `--progress=plain` - Show all output from build progress (verbose)

Running a single docker container 
```bash
docker run -d -p 5000:5000 --name "job-tracker-<name>" job-tracker-<name>
```

Stopping a single docker container 
```bash
docker stop job-tracker-<name>
```

Building and running multiple docker containers from a docker-compose file
```bash
docker compose up -d
```

Stopping multiple docker containers from a docker-compose file
```bash
docker compose down
```

Viewing all running docker containers 
```bash
docker ps
```
