import { Link, useNavigate } from "react-router-dom";

function Navbar() {
    const navigate = useNavigate();

    const token = localStorage.getItem("token");

    let isAdmin = false;

    if (token) {
        try {
            const payload = JSON.parse(
                atob(token.split(".")[1])
            );

            isAdmin = payload.role === "admin";
        } catch (error) {
            console.log(error);
        }
    }

    const handleLogout = () => {
        localStorage.removeItem("token");
        navigate("/login");
    };

    return (
        <nav className="navbar navbar-expand-lg bg-dark navbar-dark">
            <div className="container">

                <Link
                    to={token ? "/products" : "/login"}
                    className="navbar-brand fw-bold"
                >
                    ProductApp
                </Link>

                <div className="d-flex align-items-center gap-2">

                    {token ? (
                        <>
                            <Link
                                to="/products"
                                className="btn btn-outline-light"
                            >
                                Products
                            </Link>

                            <Link
                                to="/products/create"
                                className="btn btn-primary"
                            >
                                Create Product
                            </Link>

                            {isAdmin && (
                                <Link
                                    to="/admin/products"
                                    className="btn btn-warning"
                                >
                                    Admin Panel
                                </Link>
                            )}

                            <button
                                onClick={handleLogout}
                                className="btn btn-danger"
                            >
                                Logout
                            </button>
                        </>
                    ) : (
                        <>
                            <Link
                                to="/login"
                                className="btn btn-outline-light"
                            >
                                Login
                            </Link>

                            <Link
                                to="/register"
                                className="btn btn-primary"
                            >
                                Register
                            </Link>
                        </>
                    )}

                </div>
            </div>
        </nav>
    );
}

export default Navbar;