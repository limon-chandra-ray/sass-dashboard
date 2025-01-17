import React, { useContext } from 'react';
import { Navigate, useLocation } from 'react-router-dom';

import { ArrowPathIcon } from '@heroicons/react/24/outline';
import { AuthContext } from '../contexts/AuthProvider';



const PrivateRoute = ({ children }) => {
    const { user, loading } = useContext(AuthContext)
    const location = useLocation();

    if (loading) {
        return <div className="w-full flex justify-center items-center text-center h-full">
            <ArrowPathIcon className='size-5 animate-spin'/>
        </div>
    }

    if (user) {
        return children;
    }

    return <Navigate to="/login" state={{ from: location }} replace></Navigate>;
};

export default PrivateRoute;