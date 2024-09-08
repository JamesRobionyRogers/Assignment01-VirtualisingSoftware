<!-- PROJECT LOGO --> <br /> <p align="center"> <h1 align="center"> Deploying via Docker </h1> <h6 align="center">August 2024 - James Robiony-Rogers & Corban Surtees</h6> <p align="center"> Using virtualisation to effect portable building and deployment of software applications </p> </p>

* * * * *

Overview
--------

This project demonstrates the use of virtualization technologies to build and deploy a portable software application designed for job seekers. Our application, the Job Application Tracker, helps students and job seekers efficiently manage their job search process. It operates across three different virtual machines (VMs), showcasing the power of distributed systems and cloud-ready software development practices.

The Job Application Tracker allows users to record and monitor the companies and roles they've applied to, including key information such as application status, submission dates, additional notes, and a chronological history of each application's progress.

Built With
----------

-   **Frontend:** [React.js](https://reactjs.org) **&** [Tailwind CSS](https://tailwindcss.com)
-   **Backend:** [Python Flask REST API](https://flask.palletsprojects.com/en/2.0.x/)
-   **Database:** [Supabase](https://supabase.io)

File Tree
---------

-   `frontend` - Contains the React frontend project
-   `backend` - Contains the Python Flask backend project
-   `database` - Contains the Supabase database configuration

Running Locally
---------------

To set up and run the project locally, follow these steps:

**Build and run the job tracker:** From the root of the repository, run:

```bash
docker compose build
docker compose up -d
```

**Access the application:**

-   Job Tracker Application: [`http://localhost:80`](http://localhost:80)
-   Supabase Studio Dashboard: [`http://localhost:8000`](http://localhost:8000)
-   Python Flask API: [`http://localhost:5001`](http://localhost:5001)

**Shut down the job tracker:**

```bash
docker compose down
```


View Project
------------

<div align="center"> <img style="width: 100%" src="https://dev-to-uploads.s3.amazonaws.com/uploads/articles/rcdywbhax0k9hbipb486.png"> </div>

* * * * *

Container Structure
-----------------------

### Application Design and Use of VMs

-   **Purpose of VMs:** This project is built using three VMs:

    1.  **Frontend VM:** Hosts the React.js application interface.
    2.  **Backend VM:** Runs the Python Flask REST API.
    3.  **Database VM:** Manages the Supabase database.
-   **Justification:** Separating the application into different VMs allows for a modular design where each VM handles a distinct aspect of the application. This setup enhances scalability, maintenance, and isolation of services.

- The containers are all connected via the backend container. Http requests are sent between the containers to allow them to communicate.

### Automated Build Process

-   **Unattended Build:** The project uses Docker Compose to handle the setup of all necessary services automatically. After the initial setup, the application will preload test data for demonstration purposes.

-   **Component Download:** The build process will automatically download and configure all required components. For a fresh build, this involves downloading Docker images and setting up containers, with approximate download volumes specified in the project report.

## Test data

When the application is launched with no data in the database, or on the first launch of the application, test data will be added to each of the tables.

There are two users each with their own unique applications already assigned to them.

1. John Doe
- Email: john.doe@example.com
- Password: password123

2 Jane Smith
- Email: jane.smith@example.com
- Password: password123


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

### Rebuilding and Rerunning the Application

1. **Rebuilding the Docker Images:**
   After making changes, developers should rebuild the Docker images to incorporate the updates. This is done by running these commands from the root of the project:
   ```bash
   docker compose down
   docker compose build
   docker compose up -d
   ```


### Repository Structure

-   The repository is organized to facilitate easy navigation and understanding. The Git commit history clearly shows the incremental development of the project.

-   Frontend README: [here]
-   Backend README: [here]
-   Database README: [here]

Submission Details
------------------

-   **Repository URL:** [`GitHub`](https://github.com/JamesRobionyRogers/Assignment01-VirtualisingSoftware)
-   **Git Commit ID:** [Commit ID for marking]
-   **Screen Recording URL:** [URL to the screen recording]
-   **Project Report:** [Link to the PDF report]
