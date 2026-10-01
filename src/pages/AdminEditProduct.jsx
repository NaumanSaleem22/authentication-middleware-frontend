import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import api from "../services/api";

function AdminEditProduct() {
    const { id } = useParams();
    const navigate = useNavigate();

    const [name, setName] = useState("");
    const [desc, setDesc] = useState("");
    const [price, setPrice] = useState("");
    const [image, setImage] = useState(null);
    const [currentImage, setCurrentImage] = useState("");

    const [loading, setLoading] = useState(true);
    const [saving, setSaving] = useState(false);
    const [error, setError] = useState("");
    const [success, setSuccess] = useState("");
    useEffect(() => {
        const getProduct = async () => {
            try {
                const response = await api.get(`/admin/products/${id}`);

                const product = response.data.product;

                setName(product.name);
                setDesc(product.desc);
                setPrice(product.price);
                setCurrentImage(product.image);
            } catch (error) {
                console.log(error);

                setError(
                    error.response?.data?.message ||
                    "Failed to fetch product"
                );
            } finally {
                setLoading(false);
            }
        };

        getProduct();
    }, [id]);

    const handleSubmit = async (e) => {
        e.preventDefault();

        setSaving(true);
        setError("");
        setSuccess("");
        try {
            const formData = new FormData();

            formData.append("name", name);
            formData.append("desc", desc);
            formData.append("price", price);

            if (image) {
                formData.append("image", image);
            }

            const response = await api.patch(
                `/admin/products/${id}`,
                formData
            );

            setSuccess(
                response.data.message ||
                "Product updated successfully."
            );

            setTimeout(() => {
                navigate("/products");
            }, 800);
        } catch (error) {
            console.log(error);

            setError(
                error.response?.data?.message ||
                "Failed to update product"
            );
        } finally {
            setSaving(false);
        }
    };

    if (loading) {
        return (
            <div className="container py-5">
                <h2>Loading product...</h2>
            </div>
        );
    }

    return (
        <div className="container py-5">
            <div className="row justify-content-center">
                <div className="col-12 col-md-8 col-lg-6">

                    <div className="card shadow-sm border-0">
                        <div className="card-body p-4">

                            <h1 className="h3 mb-4">
                                Admin Edit Product
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

                                <div className="mb-3">
                                    <label className="form-label d-block">
                                        Current Image
                                    </label>

                                    {currentImage && (
                                        <img
                                            src={currentImage}
                                            alt={name}
                                            className="img-fluid rounded"
                                            style={{
                                                width: "200px",
                                                height: "150px",
                                                objectFit: "cover"
                                            }}
                                        />
                                    )}
                                </div>

                                <div className="mb-4">
                                    <label className="form-label">
                                        New Image
                                    </label>

                                    <input
                                        type="file"
                                        className="form-control"
                                        accept="image/*"
                                        onChange={(e) =>
                                            setImage(e.target.files[0])
                                        }
                                    />

                                    <div className="form-text">
                                        Leave empty to keep the current image.
                                    </div>
                                </div>

                                <div className="d-flex gap-2">

                                    <button
                                        type="submit"
                                        className="btn btn-primary"
                                        disabled={saving}
                                    >
                                        {saving
                                            ? "Updating..."
                                            : "Update Product"}
                                    </button>

                                    <button
                                        type="button"
                                        className="btn btn-outline-secondary"
                                        onClick={() =>
                                            navigate("/admin/products")
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

export default AdminEditProduct;