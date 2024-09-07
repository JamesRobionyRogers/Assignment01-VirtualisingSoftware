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

    if (!uuid) return json({});

    try {
        const response = await axios.get(APIConstants.APPLICATION(uuid), { headers });

        if (!response.data) {
            return json({ error: `Failed to fetch application with id = ${uuid}` });
        }

        return json(response.data);
    }
    catch (error) {
        const errorMessage = (error as AxiosError).response.data.error || "Failed to fetch application.";

        console.error(errorMessage);
        return json({ error: errorMessage });
    }
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
