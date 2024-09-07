import { Outlet } from 'react-router-dom';

import ApplicationTrackerView from '../views/ApplicationTracker';

function ApplicationsLayout() {
    return (
        <div className="applications-layout">
            <ApplicationTrackerView />

            {/* Used for displaying the Single Application Drawer */}
            <Outlet />
        </div>
    );
}

export default ApplicationsLayout;