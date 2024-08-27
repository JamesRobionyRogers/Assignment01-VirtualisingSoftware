import { json, LoaderFunctionArgs } from "react-router-dom";

import { fetchApplicationData } from "./api";

export async function applicationLoader({ params }: LoaderFunctionArgs) {
    const { uuid } = params;

    if (!uuid) return json({});

    const data = await fetchApplicationData(uuid);
    if (!data) throw new Response('Not Found', { status: 404 });

    return json(data);
}