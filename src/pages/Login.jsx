import { useState } from "react";
import { useNavigate } from "react-router-dom";
import api from "../services/api";

function Login() {
    const navigate = useNavigate();

    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [loading, setLoading] = useState(false);
    const [message, setMessage] = useState("");

    const handleSubmit = async (e) => {
        e.preventDefault();

        setLoading(true);
        setMessage("");

        try {
            const response = await api.post("/login", {
                email,
                password
            });

            localStorage.setItem("token", response.data.token);

            navigate("/products");
        } catch (error) {
            console.log(error);

            setMessage(
                error.response?.data?.message ||
                "Something went wrong"
            );
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="container py-5">
            <div className="row justify-content-center">
                <div className="col-12 col-sm-10 col-md-7 col-lg-5">
                    <div className="card shadow-sm border-0">
                        <div className="card-body p-4 p-md-5">

                            <h1 className="h3 text-center mb-4">
                                Login
                            </h1>

                            {message && (
                                <div className="alert alert-danger">
                                    {message}
                                </div>
                            )}

                            <form onSubmit={handleSubmit}>

                                <div className="mb-3">
                                    <label className="form-label">
                                        Email
                                    </label>

                                    <input
                                        type="email"
                                        className="form-control"
                                        value={email}
                                        onChange={(e) =>
                                            setEmail(e.target.value)
                                        }
                                        required
                                    />
                                </div>

                                <div className="mb-4">
                                    <label className="form-label">
                                        Password
                                    </label>

                                    <input
                                        type="password"
                                        className="form-control"
                                        value={password}
                                        onChange={(e) =>
                                            setPassword(e.target.value)
                                        }
                                        required
                                    />
                                </div>

                                <button
                                    type="submit"
                                    className="btn btn-primary w-100"
                                    disabled={loading}
                                >
                                    {loading
                                        ? "Logging in..."
                                        : "Login"}
                                </button>

                            </form>

                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default Login;