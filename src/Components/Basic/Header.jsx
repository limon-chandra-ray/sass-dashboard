import { useContext } from "react";
import { AuthContext } from "../../contexts/AuthProvider";

const Header=()=>{
  const {user} = useContext(AuthContext)
    return(
        <header className="bg-white shadow p-4 flex justify-between items-center">
          <input
            type="text"
            placeholder="Search..."
            className="border rounded p-2 w-1/3"
          />
          <div className="flex items-center space-x-4">
            {
              user ?
              <>
                <button className="p-2 bg-gray-200 rounded">🔔</button>
                <div className="p-2 bg-gray-200 rounded">Profile</div>
              </>:null
            }
            
          </div>
        </header>
    )
}
export default Header;