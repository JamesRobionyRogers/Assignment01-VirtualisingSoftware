import { useState } from "react";
import {useLoaderData, useNavigate } from "react-router-dom";
import { Card, CardHeader, Input, Typography, Button, CardBody, Chip, CardFooter, Tabs, TabsHeader, Tab, Avatar, IconButton, Tooltip } from "@material-tailwind/react";
import { MagnifyingGlassIcon, ChevronUpDownIcon, LinkIcon, DocumentTextIcon, ArrowPathIcon, } from "@heroicons/react/24/outline";
import { PencilIcon, UserPlusIcon } from "@heroicons/react/24/solid";


import { color as ChipColor } from "@material-tailwind/react/types/components/chip";
import { ApplicationData, suppressMissingAttributes } from "../types";
import { formatDate } from "../utils";


const TABS = [
    { label: "All", value: "all" },
    { label: "Applied", value: "applied" },
    { label: "Interview", value: "interview" },
    { label: "Rejected", value: "rejected" },
    { label: "Offer", value: "offer" },
];

const TABLE_HEAD = ["Company", "Role", "Status", "Date", "Actions"];

const STATUS_MAP: { [key: string]: ChipColor } = {
    Applied: "blue",
    Interview: "yellow",
    Rejected: "red",
    Offer: "green",
};

export default function ApplicationTracker() {
    const navigate = useNavigate();

    const loaderData = useLoaderData();

    // Extract the list of all applications from the loader otherwise set it to an empty array
    const allApplications: ApplicationData[] = loaderData as ApplicationData[] ?? [];

    console.log("All Applications:", allApplications);

    const [filter, setFilter] = useState('all');
    const [searchTerm, setSearchTerm] = useState('');
    const handleSearch = (e: { target: { value: string; }; }) => setSearchTerm(e.target.value.toLowerCase());
    

    const pageCount = 10; // Math.ceil(TABLE_ROWS.length / 10);
    const [page, setPage] = useState(1);

    const handleAddApplication = () => navigate('/dashboard/applications/new');

    const handleReloadComponent = () => navigate('/dashboard/applications');

    return (
        <>
            <div className="flex flex-col h-full">
                <Card className="flex flex-col flex-1 shadow-none dark:bg-neutral-950" {...suppressMissingAttributes}>
                    <CardHeader floated={false} shadow={false} className="rounded-none bg-transparent" {...suppressMissingAttributes}>
                        <div className="mb-8 flex items-center justify-between gap-8 ">
                            <div>
                                <Typography variant="h5" color="blue-gray" className="dark:text-white" {...suppressMissingAttributes}>
                                    Application Tracker
                                </Typography>
                                <Typography color="gray" className="mt-1 font-normal dark:text-gray-400" {...suppressMissingAttributes}>
                                    Track the status of your job applications
                                </Typography>
                            </div>
                            <div className="flex shrink-0 flex-col gap-2 sm:flex-row">
                                <Button onClick={handleReloadComponent} className="flex items-center gap-3 dark:bg-white dark:text-black" size="sm" {...suppressMissingAttributes}>
                                    <ArrowPathIcon strokeWidth={2} className="h-4 w-4" /> Reload
                                </Button>

                                <Button onClick={handleAddApplication} className="flex items-center gap-3 dark:bg-white dark:text-black" size="sm" {...suppressMissingAttributes}>
                                    <UserPlusIcon strokeWidth={2} className="h-4 w-4" /> Add Job Application
                                </Button>
                            </div>
                        </div>
                        <div className="flex flex-col items-center justify-between gap-4 md:flex-row">
                            <Tabs value="all" className="w-full md:w-max">
                                <TabsHeader {...suppressMissingAttributes}>
                                    {TABS.map(({ label, value }) => (
                                        <Tab key={value} value={value} onClick={() => setFilter(value)} {...suppressMissingAttributes}>
                                            &nbsp;&nbsp;{label}&nbsp;&nbsp;
                                        </Tab>
                                    ))}
                                </TabsHeader>
                            </Tabs>
                            <div className="w-full md:w-72">
                                <Input
                                    label="Search"
                                    onChange={handleSearch}
                                    icon={<MagnifyingGlassIcon className="h-5 w-5" />} 
                                    onPointerEnterCapture={undefined} onPointerLeaveCapture={undefined} crossOrigin={undefined}
                                />
                            </div>
                        </div>
                    </CardHeader>

                    <CardBody className="px-0 flex-1 overflow-auto" {...suppressMissingAttributes} >
                        <table className="mt-4 w-full min-w-max table-auto text-left">
                            <thead>
                                <tr>
                                    {TABLE_HEAD.map((head, index) => (
                                        <th
                                            key={head}
                                            className="cursor-pointer border-y border-blue-gray-100 bg-blue-gray-50/50 p-4 transition-colors hover:bg-blue-gray-50 dark:bg-gray-900"
                                        >
                                            <Typography
                                                variant="small"
                                                color="blue-gray"
                                                className={`flex items-center justify-between gap-2 font-normal leading-none opacity-70 ${(index === TABLE_HEAD.length - 1) ? "justify-end pr-4" : ""} dark:text-white`}
                                                {...suppressMissingAttributes}
                                            >
                                                {head}{" "}
                                                {index < TABLE_HEAD.length - 1 && (
                                                    <ChevronUpDownIcon strokeWidth={2} className="h-4 w-4" />
                                                )}
                                            </Typography>
                                        </th>
                                    ))}
                                </tr>
                            </thead>
                            <tbody>
                                {
                                    allApplications.filter( ({ job_title, company_name, status }) => {
                                        const isFilterMatch = filter === "all" || status.toLowerCase() === filter;
                                        const isSearchMatch = company_name.toLowerCase().includes(searchTerm) || job_title.toLowerCase().includes(searchTerm);

                                        return isFilterMatch && isSearchMatch;
                                    })
                                    .map(
                                        ({ id, img, job_title, company_name, status, application_date, application_url }: ApplicationData, index) => {
                                            const isLast = index === allApplications.length - 1;
                                            const classes = isLast ? "p-4" : "p-4 border-b border-blue-gray-50";

                                            const viewApplication = () => navigate(`/dashboard/applications/${id}`);

                                            img = "https://cdn1.iconfinder.com/data/icons/google-s-logo/150/Google_Icons-09-512.png";

                                            return (
                                                <tr key={index} onClick={viewApplication} className="hover:cursor-pointer">
                                                    <td className={classes}>
                                                        <div className="flex items-center gap-3">
                                                            { img && ( <Avatar src={img} alt={company_name} size="sm" {...suppressMissingAttributes} /> ) }
                                                            <div className="flex flex-col">
                                                                <Typography
                                                                    variant="small"
                                                                    color="blue-gray"
                                                                    className="font-normal dark:text-white"
                                                                    {...suppressMissingAttributes}
                                                                >
                                                                    {company_name}
                                                                </Typography>
                                                            </div>
                                                        </div>
                                                    </td>
                                                    <td className={classes}>
                                                        <div className="flex flex-col">
                                                            <Typography
                                                                variant="small"
                                                                color="blue-gray"
                                                                className="font-normal dark:text-white"
                                                                {...suppressMissingAttributes}
                                                            >
                                                                {job_title}
                                                            </Typography>

                                                            {/* TODO: Department such as: Finance, etc...  */}
                                                            {/* <Typography
                                                                variant="small"
                                                                color="blue-gray"
                                                                className="font-normal opacity-70 dark:text-white"
                                                                {...suppressMissingAttributes}
                                                            >
                                                                {department}
                                                            </Typography> */}
                                                        </div>
                                                    </td>
                                                    <td className={classes}>
                                                        <div className="w-max">
                                                            <Chip
                                                                variant="ghost"
                                                                size="sm"
                                                                value={status}
                                                                color={STATUS_MAP[status]}
                                                            />
                                                        </div>
                                                    </td>
                                                    <td className={classes}>
                                                        <Typography
                                                            variant="small"
                                                            color="blue-gray"
                                                            className="font-normal dark:text-white"
                                                            {...suppressMissingAttributes}
                                                        >
                                                            {formatDate(application_date)}
                                                        </Typography>
                                                    </td>
                                                    <td className={`${classes} flex gap-2 justify-center`}>
                                                        <Tooltip content="Cover Letter">
                                                            <IconButton variant="text" {...suppressMissingAttributes}>
                                                                <DocumentTextIcon className="h-4 w-4 text-blue-400" />
                                                            </IconButton>
                                                        </Tooltip>
                                                        <a href={application_url} target="_blank" rel="noopener noreferrer">
                                                            <Tooltip content="Application Link">
                                                                <IconButton variant="text" {...suppressMissingAttributes}>
                                                                    <LinkIcon className="h-4 w-4 dark:text-white" />
                                                                </IconButton>
                                                            </Tooltip>
                                                        </a>
                                                        <Tooltip content="Edit Application">
                                                            <IconButton variant="text" {...suppressMissingAttributes}>
                                                                <PencilIcon className="h-4 w-4 dark:text-white" />
                                                            </IconButton>
                                                        </Tooltip>
                                                    </td>
                                                </tr>
                                            );
                                        }
                                    )
                                }
                            </tbody>
                        </table>
                    </CardBody>

                    <CardFooter className="flex items-center justify-between border-t border-blue-gray-50 p-4" {...suppressMissingAttributes} >
                        <Typography variant="small" color="blue-gray" className="font-normal dark:text-white" {...suppressMissingAttributes}>
                            Page {page} of {pageCount}
                        </Typography>

                        {
                            pageCount > 1 && (
                                <div className="flex gap-2">
                                    <Button onClick={() => setPage(page - 1)} variant="outlined" size="sm" className="dark:text-white dark:border-gray-400" {...suppressMissingAttributes}>
                                        Previous
                                    </Button>
                                    <Button onClick={() => setPage(page + 1)} variant="outlined" size="sm" className="dark:text-white dark:border-gray-400" {...suppressMissingAttributes}>
                                        Next
                                    </Button>
                                </div>
                            )
                        }
                    </CardFooter>
                </Card>
            </div>
        </>
    );
}
