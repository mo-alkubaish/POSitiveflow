/**
 * DashboardLayout serves as a higher-order component that provides a consistent layout for various admin pages.
 * It includes a common navigation bar and dynamically renders child components.
 * 
 * Features:
 * - Navbar: Includes a pre-defined set of navigation links tailored for administrative tasks.
 * - Dynamic Content: The component renders child content passed through its `children` prop, enabling reusability across different admin pages.
 * 
 * Usage:
 * - This layout is typically used to wrap around specific admin pages (e.g., Dashboard, Customer Management) to provide a uniform interface with navigation.
 * 
 * Props:
 * - `children`: React.ReactNode - Represents the content of specific admin pages that will be displayed within the layout.
 */



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