<!-- PROJECT LOGO --> 
<p align="center"> 
  <h1 align="center"> Deploying via Docker </h1> 
  <h6 align="center">August 2024 - James Robiony-Rogers & Corban Surtees</h6> 
  
  <p align="center"> 
    Using virtualisation to effect portable building and deployment of software applications 
  </p> 
</p>

---

# Overview

This project demonstrates the use of virtualization technologies to build and deploy a portable software application designed for job seekers. Our application, the Job Application Tracker, helps students and job seekers efficiently manage their job search process. It operates across three different virtual machines (VMs), showcasing the power of distributed systems and cloud-ready software development practices.

The Job Application Tracker allows users to record and monitor the companies and roles they've applied to, including key information such as application status, submission dates, additional notes, and a chronological history of each application's progress.


## Built With

-   **Frontend:** [React.js](https://reactjs.org) **&** [Tailwind CSS](https://tailwindcss.com)
-   **Backend:** [Python Flask REST API](https://flask.palletsprojects.com/en/2.0.x/)
-   **Database:** [Supabase](https://supabase.io)

## File Tree

-  `.github/workflows` - Contains the GitHub Actions workflow for CI/CD
-  `frontend` - Contains the React frontend project
-  `backend` - Contains the Python Flask backend project
-  `database` - Contains the Supabase database configuration

---

## Running the Project Locally

Running the project locally requires Docker to be installed on your machine.

1. Clone the Repository using the following command:
```sh
git clone https://github.com/JamesRobionyRogers/Assignment01-VirtualisingSoftware.git
```

2. Change into the project directory:
```sh
cd Assignment01-VirtualisingSoftware
```

3. Build and run the Job Tracker:
```sh
docker compose build
docker compose up -d
```

4. Access the application via the following URLs:
-   Job Tracker Application: [`http://localhost:80`](http://localhost:80)
-   Supabase Studio Dashboard: [`http://localhost:8000`](http://localhost:8000)
-   Python Flask API: [`http://localhost:5001`](http://localhost:5001)


5. Shut down the Job Tracker:
```sh
docker compose down
```

---

## View Project

<div align="center"> 
  <img style="width: 100%" src="https://dev-to-uploads.s3.amazonaws.com/uploads/articles/rcdywbhax0k9hbipb486.png"> 
</div>

* * * * *

## Container Structure

This projects is build utilising three containers. The containers are as follows:

- **Frontend Tier:** This container hosts the React.js application interface via nginx.
- **Backend Tier:** This container runs the Python Flask REST API.
- **Database Tier:** The database tier is a collection of services running in containers that run make up the Supabase database and its services.

By separating the application into different containers, we can achieve a modular design where each container handles a distinct aspect of the application. This setup enhances scalability, maintenance, and isolation of services.

The containers are all connected via the backend container. Http requests are sent between the containers to allow them to communicate.

## Docker Compose Configuration

The project uses Docker Compose to manage the setup of all necessary services. The `docker-compose.yml` file in the root directory defines the services required to run the application. After the initial setup, the application will preload test data for demonstration purposes.

Through the build process, the application will automatically download and configure all required components. For a fresh build, this involves downloading Docker images and setting up containers, with approximate download volumes specified in the project report.

---

## Example Data 

The application comes preloaded with example data to demonstrate its functionality. The example data includes two users, each with their own applications. The users are as follows:

<!-- Create table for user data -->
| Name | Email Address | Password |
|---------|---------------|----------|
| John Doe | john.doe@example.com | password123 |
| Jane Smith | jane.smith@example.com | password123 |

---

## Further Development      

The Job Application Tracker is a versatile application that can be extended in various ways. Below are links to the various tiers README files to get up to speed with development on the project.

- **Frontend README:** [here](frontend/README.md)
- **Backend README:** [here](backend/README.md)
- **Database README:** [here](database/README.md)




## Suggested Improvements

### Types of Changes

1. **Contact Page**
   - **Example Change:** 
    
     A contact page may be helpful for users to ask questions or send feedback on our application.
   - **How to Implement the Change:**
     
     Edit `frontend/src` contents, and add more components to extend the functionality of the application. Restart the application following the instructions below.

2. **Authentication**
   - **Example Change:** 

     A change to the API to use a more secure method of authentication.
   - **Steps to Implement the Change:**

     Edit `backend/app/api` contents to use a different authentication method. Restart the application following the instructions below.
