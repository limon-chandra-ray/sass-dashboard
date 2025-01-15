import { createBrowserRouter } from "react-router-dom";
import Dashborad from "../Components/Dashboard/Dashboard";
import App from "../App";
import Analytics from "../Components/Analytics/Analytics";
import Login from "../Components/auth/Login";
import Signup from "../Components/auth/Signup";
import PrivateRoute from "../PrivateRoute/PrivateRoute";
import SalesMan from "../Components/SalesMan/Sales";
import Support from "../Components/Support/Support";
import PaymentMethod from "../Components/PaymentMethod/PaymentMethod";
import ProductPrice from "../Components/ProductPrice/ProductPrice";


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
                },
                {
                    path:"/sales-man",
                    element:<PrivateRoute><SalesMan/></PrivateRoute>
                },
                {
                    path:"/support",
                    element:<PrivateRoute><Support/></PrivateRoute>
                },
                {
                    path:"/payment-methods",
                    element:<PrivateRoute><PaymentMethod/></PrivateRoute>
                },
                {
                    path:"/product-price-list",
                    element:<PrivateRoute><ProductPrice/></PrivateRoute>
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