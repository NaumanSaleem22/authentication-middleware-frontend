import { useState } from "react";
import { useNavigate } from "react-router-dom";
import api from "../services/api";

function CreateProduct() {

    const navigate = useNavigate();

    const [name, setName] = useState("");
    const [desc, setDesc] = useState("");
    const [price, setPrice] = useState("");
    const [image, setImage] = useState(null);

    const [loading, setLoading] = useState(false);
    const [error, setError] = useState("");
    const [success, setSuccess] = useState("");
    const handleSubmit = async (e) => {

        e.preventDefault();

        setLoading(true);
        setError("");
        setSuccess("");
        try {

            const formData = new FormData();

            formData.append("image", image);
            formData.append("name", name);
            formData.append("desc", desc);
            formData.append("price", price);

            const response = await api.post("/create-product", formData);
            setSuccess(
                response.data.message || "Product created successfully."
            );
            setTimeout(() => {
                navigate("/products");
            }, 800);

        } catch (error) {

            console.log(error);

            setError(
                error.response?.data?.message ||
                "Failed to create product"
            );

        } finally {

            setLoading(false);
        }
    };

    return (
        <div className="container py-5">

            <div className="row justify-content-center">

                <div className="col-12 col-md-8 col-lg-6">

                    <div className="card shadow-sm border-0">

                        <div className="card-body p-4">

                            <h1 className="h3 mb-4">
                                Create Product
                            </h1>

                            {error && (
                                <div className="alert alert-danger">
                                    {error}
                                </div>
                            )}
                            {success && (
                                <div className="alert alert-success">
                                    {success}
                                </div>
                            )}
                            <form onSubmit={handleSubmit}>

                                <div className="mb-3">

                                    <label className="form-label">
                                        Product Name
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
                                        Description
                                    </label>

                                    <textarea
                                        className="form-control"
                                        rows="4"
                                        value={desc}
                                        onChange={(e) =>
                                            setDesc(e.target.value)
                                        }
                                        required
                                    />

                                </div>

                                <div className="mb-3">

                                    <label className="form-label">
                                        Price
                                    </label>

                                    <input
                                        type="number"
                                        className="form-control"
                                        min="0"
                                        value={price}
                                        onChange={(e) =>
                                            setPrice(e.target.value)
                                        }
                                        required
                                    />

                                </div>

                                <div className="mb-4">

                                    <label className="form-label">
                                        Product Image
                                    </label>

                                    <input
                                        type="file"
                                        className="form-control"
                                        accept="image/*"
                                        onChange={(e) =>
                                            setImage(
                                                e.target.files[0]
                                            )
                                        }
                                        required
                                    />
                                    {image && (
                                        <div className="mt-3">
                                            <img
                                                src={URL.createObjectURL(image)}
                                                alt="Product preview"
                                                className="img-fluid rounded border"
                                                style={{
                                                    maxHeight: "250px",
                                                    objectFit: "cover"
                                                }}
                                            />
                                        </div>
                                    )}
                                </div>

                                <div className="d-flex gap-2">

                                    <button
                                        type="submit"
                                        className="btn btn-primary"
                                        disabled={loading}
                                    >
                                        {loading && (
                                            <span
                                                className="spinner-border spinner-border-sm me-2"
                                                aria-hidden="true"
                                            ></span>
                                        )}

                                        {loading ? "Creating..." : "Create Product"}
                                    </button>

                                    <button
                                        type="button"
                                        className="btn btn-outline-secondary"
                                        disabled={loading}
                                        onClick={() =>
                                            navigate("/products")
                                        }
                                    >
                                        Cancel
                                    </button>

                                </div>

                            </form>

                        </div>

                    </div>

                </div>

            </div>

        </div>
    );
}

export default CreateProduct;