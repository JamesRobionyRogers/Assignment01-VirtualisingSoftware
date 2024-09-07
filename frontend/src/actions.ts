import axios from "axios";

import { parseDateString } from "./utils";

export async function handleAddApplication({ request }: { request: Request }): Promise<{ error?: string; success?: string }> {
    const userId = sessionStorage.getItem("user_id");
    const token = sessionStorage.getItem("basic_auth_token");
    
    const formData = await request.formData();

    // Extract form fields from formData
    const job = formData.get("job");
    const company = formData.get("company");
    const status = formData.get("status");
    const date = parseDateString(formData.get("date") as string);
    const url = formData.get("url");
    const description = formData.get("description");
    const notes = formData.get("notes");

    console.log(date);

    console.log("Form data:", job, company);

    // Perform validation or API request
    if (!job || !company) {
        return { error: "All fields are required." };
    }

    const payload = {
        user_id: userId,
        job_title: job,
        company_name: company,
        status: status,
        application_date: date,
        application_url: url,
        description: description,
        notes: notes,
    };

    const headers = {
        'Authorization': `Basic ${token}`,
        'Content-Type': 'application/json'
    };

    console.log("Payload:", payload);
    console.log("Headers:", headers);

    try {
        const response = await axios.post("http://localhost:5001/applications", payload, { headers });

        if (!response.data) {
            const errorMessage = response.data.error || "Failed to add application.";
            console.log("Error:", errorMessage);
            return { error: errorMessage };
            // return { error: `Failed to add application. ${response.statusText}` };
        }

        return { success: "Application added successfully!" };
    }
    catch (error) {
        console.error(error.response.data.error);
        return { error: "Failed to add application." };
    }

}