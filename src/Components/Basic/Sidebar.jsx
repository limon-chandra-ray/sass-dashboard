const Sidebar=()=>{
    return <aside className="w-64 bg-gray-800 text-white flex flex-col">
        <a href="/" className="p-4 text-xl font-bold">SaSS Admin</a>
        <nav className="flex flex-col gap-y-2">
            <a href="/" className='bg-blue-950 py-2 pl-3'>Dashboard</a>
            <a href="/analytics" className='bg-blue-950 py-2 pl-3'>Analytics</a>
        {/* <ul>
            <li className="px-4 py-2 hover:bg-gray-700">Dashboard</li>
            <li className="px-4 py-2 hover:bg-gray-700">
                
            </li>
            <li className="px-4 py-2 hover:bg-gray-700">Website Content</li>
            <li className="px-4 py-2 hover:bg-gray-700">Themes</li>
            <li className="px-4 py-2 hover:bg-gray-700">Users</li>
            <li className="px-4 py-2 hover:bg-gray-700">Integrations</li>
            <li className="px-4 py-2 hover:bg-gray-700">Billing</li>
            <li className="px-4 py-2 hover:bg-gray-700">Support</li>
        </ul> */}
        </nav>
    </aside>
}
export default Sidebar;