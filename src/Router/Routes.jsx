import { createBrowserRouter } from "react-router-dom";
import Dashborad from "../Components/Dashboard/Dashboard";
import App from "../App";
import Analytics from "../Components/Analytics/Analytics";

const router = createBrowserRouter(
    [
        {
            path:"/",
            element:<App/>,
            children:[
                {
                    path:"/",
                    element:<Dashborad/>
                },
                {
                    path:"/analytics",
                    element:<Analytics/>
                }
            ]
        }
    ]
)
export default router;