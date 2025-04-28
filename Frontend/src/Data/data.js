import '@fortawesome/fontawesome-free/css/all.min.css';

export const userMenu = [
    {
        name: 'Home',
        path: '/',
        icon: 'fa-solid fa-house'
    },
    {
        name: 'Appoinments',
        path: '/book-appoinment',
        icon: 'fa-solid fa-calendar-check'
    }, 
    {
        name: 'Apply Doctor',
        path: '/apply-doctor',
        icon: 'fa-solid fa-user-doctor'
    },
    {
        name: 'Profile',
        path: '/profile',
        icon: 'fa-solid fa-user'
    },
]

// Admin menu
export const adminMenu = [
    {
        name: 'Home',
        path: '/',
        icon: 'fa-solid fa-house'
    }, 
    {
        name: 'Doctors',
        path: '/getAllDoctors',
        icon: 'fa-solid fa-user-doctor'
    },
    {
        name: 'Users',
        path: '/getAllUsers',
        icon: 'fa-solid fa-user'
    }, 
    {
        name: 'Profile',
        path: '/profile',
        icon: 'fa-solid fa-user'
    },
]