import { useRef, useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Field, Menu, MenuButton, MenuItem, MenuItems, Textarea } from '@headlessui/react'; 
import { BellIcon, PlusIcon, CheckIcon, ChevronDownIcon, ClockIcon, DocumentTextIcon, LinkIcon, CalendarDaysIcon, PaperClipIcon } from '@heroicons/react/20/solid'; 
import { NoSymbolIcon, TrashIcon } from '@heroicons/react/24/outline';
import { Avatar, Breadcrumbs, Chip, Timeline, TimelineBody, TimelineConnector, TimelineHeader, TimelineIcon, TimelineItem } from '@material-tailwind/react';

import { ApplicationAction, ApplicationData, StatusMap, suppressMissingAttributes } from '../types';
import PathConstants from '../pathConstants';

const STATUS_MAP: StatusMap = {
    Applied: "blue",
    Interview: "yellow",
    Rejected: "red",
    Offer: "green",
};

const ACTIONS: ApplicationAction[] = [
    { name: 'Add event to timeline', color: 'gray', icon: PlusIcon, action: () => {} },
    { name: 'Mark as Rejected', color: 'red', icon: NoSymbolIcon, action: () => {} },
    { name: 'Delete this application', color: 'red', icon: TrashIcon, action: () => {} },
];

function formatDate(dateString: string): string {
    const date = new Date(dateString);
    const days = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];
    const day = date.getDate();
    const month = days[date.getMonth()];
    const year = date.getFullYear();

    // Determine the ordinal suffix
    function getOrdinalSuffix(day: number) {
        if (day >= 11 && day <= 13) return 'th'; // Special case for 11th, 12th, 13th
        switch (day % 10) {
            case 1: return 'st';
            case 2: return 'nd';
            case 3: return 'rd';
            default: return 'th';
        }
    }

    const suffix = getOrdinalSuffix(day);

    return `${day}${suffix} ${month} ${year}`;
}

export default function Application({ application }: { application: ApplicationData}) {

    const [applicationData, setApplicationData] = useState<ApplicationData>(application);

    // Force a re-render of the component when the application data changes
    useEffect(() => {
        setApplicationData(application);
    }, [application]);

    // const [applicationData, setApplicationData] = useState<ApplicationData>({
    //     uuid: "",
    //     img: "https://cdn1.iconfinder.com/data/icons/google-s-logo/150/Google_Icons-09-512.png",
    //     job: "Graduate Software Engineer",
    //     company: "Google",
    //     org: "",
    //     status: "Applied",
    //     date: new Date("2018/04/23"),
    //     link: "https://www.google.com",
    //     documents: [
    //         { name: "resume_back_end_developer.pdf", size: "2.4mb", link: "#" },
    //         { name: "coverletter_back_end_developer.pdf", size: "4.5mb", link: "#" },
    //     ],
    // });

    const handleUploadDocument = () => {
        alert("Uploading document...");
    }

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setApplicationData({
            ...applicationData,
            [e.target.name]: e.target.value,
        });
    };

    const [editCompany, setEditCompany] = useState<boolean>(false);
    const companyRef = useRef<HTMLInputElement>(null);

    const handleEditCompany = () => {
        setEditCompany(true);
        companyRef.current?.focus();
    };

    // Effect to handle click outside of the company editing area
    useEffect(() => {
        const handleClickOutside = (event: MouseEvent) => {
            if (companyRef.current && !companyRef.current.contains(event.target as Node)) {
                setEditCompany(false);
            }
        };

        document.addEventListener('mousedown', handleClickOutside);
        return () => document.removeEventListener('mousedown', handleClickOutside);
    }, []);

    return (
        <div className="relative h-full">
            <Breadcrumbs 
                className="mx-5 px-0 bg-transparent" 
                separator={<span className="mx-2">/</span>}
                {...suppressMissingAttributes}>
                <Link to={PathConstants.DASHBOARD} className="opacity-60"> Dashboard </Link>
                <Link to={PathConstants.DASHBOARD} className="opacity-60"> Application Tracker </Link>
            </Breadcrumbs>

            {/* Heading */}
            <div className="m-5 mt-0">
                <div className="lg:flex lg:items-center lg:justify-between">
                    <div className="flex flex-row gap-5 min-w-0 flex-1">
                        <h2 className="w-full text-2xl font-bold leading-7 text-gray-900 sm:truncate sm:text-3xl sm:tracking-tight">
                            <input 
                                name="job"
                                type="text" 
                                value={applicationData.job} 
                                placeholder="Job Title"
                                onChange={handleChange} 
                                className="-m-2 p-2 w-full flex-grow text-2xl font-bold leading-7 text-gray-900 border-transparent focus:border-transparent md:text-3xl" 
                            />
                        </h2>
                    </div>
                    
                    <div className="mt-5 flex lg:ml-4 lg:mt-0">
                        <span className="ml-3 hidden sm:block">
                            <a
                                href={applicationData.link}
                                target="_blank"
                                className="inline-flex items-center rounded-md bg-white px-3 py-2 text-sm font-semibold text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 hover:bg-gray-50"
                            >
                                <LinkIcon aria-hidden="true" className="-ml-0.5 mr-1.5 h-5 w-5 text-gray-400" />
                                View Listing
                            </a>
                        </span>

                        <span className="sm:ml-3">
                            <button
                                type="button"
                                className="inline-flex items-center rounded-md bg-indigo-600 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
                            >
                                <CheckIcon aria-hidden="true" className="-ml-0.5 mr-1.5 h-5 w-5" />
                                Save
                            </button>
                        </span>

                        {/* Dropdown */}
                        <Menu as="div" className="relative ml-3 sm:hidden">
                            <MenuButton className="inline-flex items-center rounded-md bg-white px-3 py-2 text-sm font-semibold text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 hover:ring-gray-400">
                                More
                                <ChevronDownIcon aria-hidden="true" className="-mr-1 ml-1.5 h-5 w-5 text-gray-400" />
                            </MenuButton>

                            <MenuItems
                                transition
                                className="absolute right-0 z-10 -mr-1 mt-2 w-48 origin-top-right rounded-md bg-white py-1 shadow-lg ring-1 ring-black ring-opacity-5 transition focus:outline-none data-[closed]:scale-95 data-[closed]:transform data-[closed]:opacity-0 data-[enter]:duration-200 data-[leave]:duration-75 data-[enter]:ease-out data-[leave]:ease-in"
                            >
                                <MenuItem>
                                    <a href="#" className="block px-4 py-2 text-sm text-gray-700 data-[focus]:bg-gray-100">
                                        View
                                    </a>
                                </MenuItem>
                            </MenuItems>
                        </Menu>
                    </div>
                </div>
                <div className="mt-1 flex flex-col sm:mt-0 sm:flex-row sm:flex-wrap sm:space-x-6">
                    <Chip
                        variant="ghost"
                        size="sm"
                        value={applicationData.status}
                        color={STATUS_MAP[applicationData.status]}
                        className="mt-auto"
                    />

                    <div className="mt-2 flex items-center text-sm text-gray-500">
                        {/* <BuildingOffice2Icon aria-hidden="true" className="mr-1.5 h-5 w-5 flex-shrink-0 text-gray-400" /> */}
                        <Avatar src={applicationData.img} alt={applicationData.company} size="xs" className="flex-shrink-0 text-gray-400" {...suppressMissingAttributes} />

                        {
                            editCompany ? 
                            <input 
                                id="invisible-input-company"
                                name="company"
                                type="text" 
                                placeholder="Company name"
                                value={applicationData.company} 
                                ref={companyRef}
                                onChange={handleChange} 
                                className="p-0 pl-2 text-sm rounded border-transparent focus:border-transparent"
                                onBlur={() => setEditCompany(false)}
                            /> :
                            <p onClick={handleEditCompany} className="p-0 pl-2 rounded border-transparent focus:border-transparent">
                                { (applicationData.company) ? applicationData.company : "Company name" }
                            </p>
                        }
                    </div>
                    
                    <div className="mt-2 flex items-center text-sm text-gray-500">
                        <CalendarDaysIcon aria-hidden="true" className="mr-1.5 h-5 w-5 flex-shrink-0 text-gray-400" />
                        Applied on {formatDate(applicationData.date)}
                    </div>
                </div>
            </div>
            
            <hr className="my-2 border-blue-gray-50" />

            <div className="py-4 px-2 grid grid-cols-4 gap-y-10 md:grid-cols-10 md:gap-x-5">
                
                    {/* Job description & Timeline */}
                    <section className="col-span-6 row-span-2 sm:order-1 md:order-none">
                        <h3 className="text-lg font-bold text-gray-900">Job Description</h3>
                        <hr className="my-2 border-blue-gray-50" />
                        <Field className=" ">
                            <Textarea
                                className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                                value={applicationData.description}
                                placeholder="No job description provided"
                                rows={3}
                            />
                        </Field>

                        <div className="ml-3">
                            <span className="w-[28px] grid justify-center"><span className="h-4 border-l-2"></span></span>
                            <Timeline className="text-gray-500 text-sm md:text-[16px]">
                                <TimelineItem>
                                    <TimelineConnector/>
                                    <TimelineHeader>
                                        <TimelineIcon className="bg-gray-500">
                                            <ClockIcon className="size-4" />
                                        </TimelineIcon>
                                        <div className="flex flex-row items-center gap-1 ">
                                            <span className="font-medium">Started tracking application</span>
                                            <p>on the 25th April 2018</p>
                                        </div>
                                    </TimelineHeader>
                                    <TimelineBody className="pb-2" />
                                </TimelineItem>
                                
                                <TimelineItem>
                                    <TimelineConnector />
                                    <TimelineHeader>
                                        <TimelineIcon className="bg-gray-500">
                                            <BellIcon className="h-4 w-4" />
                                        </TimelineIcon>
                                        <div className="flex flex-row items-center gap-1 ">
                                            <span className="font-medium">Status changed</span>
                                            <p>to</p>
                                            <span className="inline-flex items-center rounded-md bg-yellow-50 mx-1 px-2 py-1 text-xs font-medium text-yellow-800 ring-1 ring-inset ring-yellow-600/20">Interview</span>
                                            <p>on the 1st May 2018</p>
                                        </div>
                                    </TimelineHeader>
                                </TimelineItem>
                            </Timeline>
                            <span className="w-[28px] grid justify-center"><span className="h-4 border-l-2"></span></span>
                        </div>
                    </section>

                    {/* Cover Letter */}
                    <section className="relative col-span-4 row-span-6 flex flex-col sm:order-4 sm:row-span-4 md:order-none">
                        <h3 className="text-lg font-bold text-gray-900">Cover Letter</h3>
                        <div className="flex-grow mt-2 flex justify-center items-center rounded-lg border border-dashed border-gray-900/25 px-6">
                            <div className="text-center">
                                <DocumentTextIcon aria-hidden="true" className="mx-auto h-12 w-12 text-gray-300" />
                                <div className="mt-4 flex text-sm leading-6 text-gray-600">
                                    <label
                                        htmlFor="file-upload"
                                        className="relative cursor-pointer rounded-md bg-white font-semibold text-indigo-600 focus-within:outline-none focus-within:ring-2 focus-within:ring-indigo-600 focus-within:ring-offset-2 hover:text-indigo-500"
                                    >
                                        <span>Generate</span>
                                        <input id="file-upload" name="file-upload" type="file" className="sr-only" />
                                    </label>
                                    <p className="pl-1">a cover letter here</p>
                                </div>
                                <p className="text-xs leading-5 text-gray-600">TXT or PDF. Up to 3 options</p>
                            </div>
                        </div>
                    </section>
                    
                    {/* Additional Notes  */}
                    <section className="col-span-6 row-span-2 sm:order-2 md:order-none">
                        <h3 className="text-lg font-bold text-gray-900">Additional Notes</h3>
                        <hr className="my-2 border-blue-gray-50" />
                        <Field className=" ">
                            <Textarea
                                className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                                placeholder="Oops... No notes here. &#13;&#10;&#13;&#10;Keep track of things such as the hiring manager's name, the interview date, or any other important details here."
                                rows={5}
                            />
                        </Field>
                    </section>

                    {/* Documents */}
                    <section className="col-span-6 row-span-3 sm:order-3 md:order-none">
                        <div className="mb-2 flex flex-row justify-between">
                            <h3 className="text-lg font-bold text-gray-900">Documents</h3>
                            <button onClick={handleUploadDocument} className=" inline-flex gap-2 items-center rounded-md bg-indigo-600 px-2 py-1 text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600">
                                <PlusIcon className="h-4 w-4" />
                                <span className="text-sm text-white">Upload Document</span>
                            </button>
                        </div>

                        {/* TODO: Extract to component */}

                        {
                            // Check if documents exist
                                (applicationData.documents) ? 

                                <ul role="list" className="divide-y divide-gray-100 rounded-md border border-gray-200">

                                    { 
                                        applicationData.documents.map((document, index) => (
                                            <li key={index} className="flex items-center justify-between py-4 pl-4 pr-5 text-sm leading-6">
                                                <div className="flex w-0 flex-1 items-center">
                                                    <PaperClipIcon aria-hidden="true" className="h-5 w-5 flex-shrink-0 text-gray-400" />
                                                    <div className="ml-4 flex min-w-0 flex-1 gap-2">
                                                        <span className="truncate font-medium">{document.name}</span>
                                                        <span className="flex-shrink-0 text-gray-400">{document.size}</span>
                                                    </div>
                                                </div>
                                                <div className="ml-4 flex-shrink-0">
                                                    <a href={document.link} className="font-medium text-indigo-600 hover:text-indigo-500">
                                                        Download
                                                    </a>
                                                </div>
                                            </li>
                                        ))
                                    }
                                </ul> : <div>

                                </div>
                        }
                        
                    </section>

                    {/* Actions section */}
                    <section className="mt-1 col-span-4 row-span-2 sm:order-last md:order-none">
                        <h3 className="text-lg font-bold text-gray-900">Actions</h3>
                        <hr className="my-2 border-blue-gray-50" />
                        <ul className="flex flex-col gap-3">
                            { 
                                ACTIONS.map((action, index) => (
                                    <li key={index} className={`text-sm font-semibold text-${action.color}-500`}>
                                        <button type="button" onClick={action.action} className="flex flex-row gap-2">
                                            <action.icon aria-hidden="true" className="h-5 w-5" />
                                            {action.name}
                                        </button>

                                    </li>
                                ))
                            }
                        </ul>
                    </section>

                    
                
                {/* Right column */}
                <div className="col-span-4 flex flex-col gap-5">
                    

                    {/* <section>
                        <h3 className="text-lg font-bold text-gray-900">Documents</h3>
                        <div className="mt-2 flex justify-center rounded-lg border border-dashed border-gray-900/25 px-6 py-10">
                            <div className="text-center">
                                <DocumentTextIcon aria-hidden="true" className="mx-auto h-12 w-12 text-gray-300" />
                                <div className="mt-4 flex text-sm leading-6 text-gray-600">
                                    <label
                                        htmlFor="file-upload"
                                        className="relative cursor-pointer rounded-md bg-white font-semibold text-indigo-600 focus-within:outline-none focus-within:ring-2 focus-within:ring-indigo-600 focus-within:ring-offset-2 hover:text-indigo-500"
                                    >
                                        <span>Generate</span>
                                        <input id="file-upload" name="file-upload" type="file" className="sr-only" />
                                    </label>
                                    <p className="pl-1">a cover letter here</p>
                                </div>
                                <p className="text-xs leading-5 text-gray-600">TXT or PDF. Up to 3 options</p>
                            </div>
                        </div>
                    </section> */}
                    
                </div>
            </div>
        </div>
    );
}
