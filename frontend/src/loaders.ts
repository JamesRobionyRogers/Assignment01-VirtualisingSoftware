import axios from "axios";
import { json, LoaderFunctionArgs } from "react-router-dom";

// import { fetchApplicationData } from "./api";
import { APIConstants } from "./pathConstants";
import { AxiosError } from "./types";

const headers = {
    'Authorization': `Basic ${sessionStorage.getItem('basic_auth_token')}`,
    'Content-Type': 'application/json'
};

export async function applicationLoader({ params }: LoaderFunctionArgs) {
    const { uuid } = params;

    // DEBUGGING: Returning test data 
    return  {
        uuid: uuid,
        img: "https://cdn1.iconfinder.com/data/icons/google-s-logo/150/Google_Icons-09-512.png",
        job: "Software Engineering Director",
        company: "Google",
        description: "As the Software Engineering Director for Cloud Observability in Hyderabad, you'll be the foundation of our team in India, responsible for hiring the team and developing them into a high-performing engineering organization. You'll oversee the migration of existing Application Monitoring projects (Cloud Error Reporting, Uptime Monitoring, and Cloud Profiler) to the team in Hyderabad, ensuring continuity for our customers and stakeholders. You'll also ramp up a new effort to improve the usability and integration of third-party observability tools with Google Cloud and Gemini Cloud Assist, our intelligent assistant that helps Google Cloud Platform (GCP) customers operate and troubleshoot their production services.",
        status: "Applied",
        date: "2024/08/27",
        link: "https://www.google.com/about/careers/applications/jobs/results/99640647849255622-software-engineering-director-cloud-observability?q=Engineering#!t=jo&jid=127025001&",
        notes: "these are the notes"
    }



    // if (!uuid) return json({});

    // TODO: Implement the fetchApplicationData function using axios
    // const data = await fetchApplicationData(uuid);
    // if (!data) throw new Response('Not Found', { status: 404 });

    // return json(data);
}

export async function allApplicationLoader() {
    const user_id = sessionStorage.getItem('user_id') ?? 'no-id';

    try { 
        const response = await axios.get(APIConstants.ALL_APPLICATIONS(user_id), { headers });

        if (!response.data) {
            return json({ error: "Failed to fetch applications." });
        }

        return json(response.data);
    }
    catch (error) {
        const errorMessage = (error as AxiosError).response.data.error || "Failed to fetch applications.";

        console.error(errorMessage);
        return json({ error: errorMessage });
    }
}
