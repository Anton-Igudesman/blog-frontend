import React from 'react';
import { useSelector } from 'react-redux';
import PublicNavbar from './Public/PublicNavbar';
import PrivateNavbar from './Private/PrivateNavbar';
import AdminNavbar from './Admin/AdminNavbar';

export default function Navbar () {
    //get user from store
    const store = useSelector(state => state?.users);
    const { userAuth } = store
    const isAdmin = userAuth?.data?.isAdmin
    
    if (isAdmin) return <AdminNavbar />
    else if (userAuth) return <PrivateNavbar />
    else return <PublicNavbar />
}