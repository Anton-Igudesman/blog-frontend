import React from 'react';
import { Navigate } from 'react-router-dom';
import { useSelector } from 'react-redux';



const ProtectPrivateRoute = ({ children }) => {
    const user = useSelector(state => state?.users);
    const {userAuth} = user;
    const isAdmin = userAuth?.data?.isAdmin;
    console.log(userAuth)
    console.log('isAdmin', isAdmin)
    if (!userAuth) return <Navigate to='/login' />
    else return children 
            
            
        
    
}

export default ProtectPrivateRoute;