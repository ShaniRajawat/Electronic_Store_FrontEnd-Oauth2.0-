import { Outlet } from "react-router-dom";

const AdminDashboard=()=>{
    return(
        <div>
            <h1>This is admin Dashboard</h1>

            <Outlet/>
        </div>
    )
}
export default AdminDashboard;