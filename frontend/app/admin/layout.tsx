import React from 'react';
import Navbar from '../components/Navbar';

interface NavLink {
    path: string
    label: string
}
const navLinks: NavLink[] = [
    { path: '/admin/dashboard', label: 'Dashboard' },
    { path: '/admin/customer-management', label: 'Customer Management' },
    { path: '/admin/discounts', label: 'Discounts' },
    { path: '/admin/user-management', label: 'User Management' },
    { path: '/admin/settings', label: 'Settings' },
];


export default function DashboardLayout({
    children, // will be a page or nested layout
}: {
    children: React.ReactNode
}) {
    return (
        <>
            <link href="https://fonts.googleapis.com/css2?family=Poppins:wght@400;500;600;700&display=swap" rel="stylesheet" /> 
            <section className="bg-gray-100 min-h-screen">
                {/* Include shared UI here e.g. a header or sidebar */}
                <Navbar navLinks={navLinks} />
                <div>
                    {children}
                </div>
            </section> 
        </>
        );
}