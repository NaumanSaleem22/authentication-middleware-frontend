import { Navigate } from "react-router-dom";

function AdminRoute({ children }) {
    const token = localStorage.getItem("token");

    if (!token) {
        return <Navigate to="/login" replace />;
    }

    try {
        const payload = JSON.parse(atob(token.split(".")[1]));

        if (payload.role !== "admin") {
            return <Navigate to="/products" replace />;
        }

        return children;
    } catch (error) {
        console.log(error);
        return <Navigate to="/login" replace />;
    }
}

export default AdminRoute;