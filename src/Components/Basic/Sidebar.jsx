import { useContext, useState } from "react";
import { AuthContext } from "../../contexts/AuthProvider";
import toast from "react-hot-toast";
import { Link, useLocation } from "react-router-dom";

const Sidebar=()=>{
    const {user, logOut} = useContext(AuthContext)
    const location = useLocation()

    const SideBarLogOut=()=>{
        logOut()
        toast.success("logout success")
    }
    const isActive = (href) => location.pathname === href || false;

    return <aside className="w-64 bg-gray-800 text-white flex flex-col">
        <a href="/" className="p-4 text-xl font-bold">SaSS Admin</a>
        <nav className="h-full flex flex-col ">
            <div className="flex flex-col grow gap-y-2">
                <a href="/" className={`hover:bg-slate-500 ${isActive("/") ? "bg-slate-500":"bg-slate-700"} py-2 pl-3`}>Dashboard</a>
                <a href="/analytics" className={`hover:bg-slate-500 ${isActive("/analytics") ? "bg-slate-500":"bg-slate-700"} py-2 pl-3`}>Analytics</a>
                <a href="/sales-man" className={`hover:bg-slate-500 ${isActive("/sales-man") ? "bg-slate-500":"bg-slate-700"} py-2 pl-3`}>Sales Man</a>
            </div>
            <div className="flex flex-col pb-5">
                {
                    user?
                    <>
                        <button onClick={SideBarLogOut} className='bg-red-500 py-2 pl-3'>Log out</button>
                    </>:null
                }
            </div>
        </nav>
    </aside>
}
export default Sidebar;