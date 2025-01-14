import { useContext } from "react";
import { AuthContext } from "../../contexts/AuthProvider";
import toast from "react-hot-toast";

const Sidebar=()=>{
    const {user, logOut} = useContext(AuthContext)
    const SideBarLogOut=()=>{
        logOut()
        toast.success("logout success")
    }
    return <aside className="w-64 bg-gray-800 text-white flex flex-col">
        <a href="/" className="p-4 text-xl font-bold">SaSS Admin</a>
        <nav className="flex flex-col gap-y-2">
            <a href="/" className='bg-blue-950 py-2 pl-3'>Dashboard</a>
            <a href="/analytics" className='bg-blue-950 py-2 pl-3'>Analytics</a>
            {
                user?
                <>
                    <button onClick={SideBarLogOut} className='bg-red-500 py-2 pl-3'>Log out</button>
                </>:null
            }
        </nav>
    </aside>
}
export default Sidebar;