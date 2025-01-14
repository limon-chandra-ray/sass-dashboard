import { createBrowserRouter } from "react-router-dom";
import Dashborad from "../Components/Dashboard/Dashboard";
import App from "../App";
import Analytics from "../Components/Analytics/Analytics";
import Login from "../Components/auth/Login";
import Signup from "../Components/auth/Signup";
import PrivateRoute from "../PrivateRoute/PrivateRoute";


const router = createBrowserRouter(
    [
        {
            path:"/",
            element:<App/>,
            children:[
                {
                    path:"/",
                    element:<PrivateRoute><Dashborad/></PrivateRoute>
                },
                {
                    path:"/analytics",
                    element:<PrivateRoute><Analytics/></PrivateRoute>
                }
            ]
        },
        {
            path:"/login",
            element:<Login/>
        },{
            path:"/sign-up",
            element:<Signup/>
        }
    ]
)
export default router;