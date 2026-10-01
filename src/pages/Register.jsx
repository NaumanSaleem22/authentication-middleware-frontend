import { useState } from "react";
import { useNavigate } from "react-router-dom";
import api from "../services/api";

function Register() {
    const navigate = useNavigate();

    const [name, setName] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");

    const [loading, setLoading] = useState(false);
    const [error, setError] = useState("");
    const [message, setMessage] = useState("");

    const handleSubmit = async (e) => {
        e.preventDefault();

        setLoading(true);
        setError("");
        setMessage("");

        try {
            const response = await api.post("/register", {
                name,
                email,
                password
            });

            setMessage(response.data.message);

            setTimeout(() => {
                navigate("/login");
            }, 1000);
        } catch (error) {
            console.log(error);

            setError(
                error.response?.data?.message ||
                "Registration failed"
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
                                Create Account
                            </h1>

                            {error && (
                                <div className="alert alert-danger">
                                    {error}
                                </div>
                            )}

                            {message && (
                                <div className="alert alert-success">
                                    {message}
                                </div>
                            )}

                            <form onSubmit={handleSubmit}>

                                <div className="mb-3">
                                    <label className="form-label">
                                        Name
                                    </label>

                                    <input
                                        type="text"
                                        className="form-control"
                                        value={name}
                                        onChange={(e) =>
                                            setName(e.target.value)
                                        }
                                        required
                                    />
                                </div>

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
                                        ? "Registering..."
                                        : "Register"}
                                </button>

                            </form>

                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default Register;