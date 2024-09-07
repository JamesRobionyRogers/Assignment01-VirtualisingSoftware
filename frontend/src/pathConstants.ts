

const PathConstants = {
    BASENAME: '/',
    HOME: '/',
    LOGIN: '/login',
    SIGNUP: '/signup',
    
    DASHBOARD: '/dashboard',
    NEW_APPLICATION: '/dashboard/application/new',
    APPLICATION: '/dashboard/application/:uuid',
    GENERATE: '/dashboard/generate',
    ARCHIVE: '/dashboard/archive',

    PROFILE: '/dashboard/profile',
    SETTINGS: '/dashboard/settings',
}

const API_BASE_URL = 'http://localhost:5001';
const APIConstants = {
    BASE_URL: API_BASE_URL,
    ALL_APPLICATIONS: (user_id: string) => `${API_BASE_URL}/applications/user/${user_id}`,
    USERS: `${API_BASE_URL}/users`,
}

export default PathConstants;
export { API_BASE_URL, APIConstants };