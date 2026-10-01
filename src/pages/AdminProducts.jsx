import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import api from "../services/api";

function AdminProducts() {
    const navigate = useNavigate();

    const [products, setProducts] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState("");
    const [success, setSuccess] = useState("");
    const [deleteId, setDeleteId] = useState(null);
    const [deleting, setDeleting] = useState(false);
    useEffect(() => {
        const getProducts = async () => {
            try {
                const response = await api.get("/admin/products");

                setProducts(response.data.products);
            } catch (error) {
                console.log(error);

                setError(
                    error.response?.data?.message ||
                    "Failed to fetch products"
                );
            } finally {
                setLoading(false);
            }
        };

        getProducts();
    }, []);

    const handleDelete = async (id) => {
        setDeleteId(id);
    };

    const confirmDelete = async () => {
        setDeleting(true);
        setError("");
        setSuccess("");

        try {
            await api.delete(`/admin/delete/${deleteId}`);

            setProducts((currentProducts) =>
                currentProducts.filter(
                    (product) => product._id !== deleteId
                )
            );

            setDeleteId(null);
            setSuccess("Product deleted successfully.");
        } catch (error) {
            console.log(error);

            setError(
                error.response?.data?.message ||
                "Failed to delete product"
            );
        } finally {
            setDeleting(false);
        }
    };

    if (loading) {
        return (
            <div className="container py-5">
                <h2>Loading products...</h2>
            </div>
        );
    }

    if (error) {
        return (
            <div className="container py-5">
                <div className="alert alert-danger">
                    {error}
                </div>
            </div>
        );
    }

    return (
        <div className="container py-5">

            <div className="d-flex justify-content-between align-items-center mb-4">
                <div>
                    <h1 className="mb-1">
                        Admin Products
                    </h1>

                    <p className="text-muted mb-0">
                        Manage all users' products
                    </p>
                </div>
            </div>
            {success && (
                <div className="alert alert-success">
                    {success}
                </div>
            )}

            {error && (
                <div className="alert alert-danger">
                    {error}
                </div>
            )}
            {products.length === 0 ? (
                <div className="text-center py-5">
                    <h3>No products found</h3>
                </div>
            ) : (
                <div className="row g-4">

                    {products.map((product) => (
                        <div
                            className="col-12 col-md-6 col-lg-4"
                            key={product._id}
                        >
                            <div className="card h-100 shadow-sm">

                                <img
                                    src={product.image}
                                    alt={product.name}
                                    className="card-img-top"
                                    style={{
                                        height: "220px",
                                        objectFit: "cover"
                                    }}
                                />

                                <div className="card-body d-flex flex-column">

                                    <h5 className="card-title">
                                        {product.name}
                                    </h5>

                                    <p className="card-text text-muted">
                                        {product.desc}
                                    </p>

                                    <p className="mb-2">
                                        <strong>
                                            Price:
                                        </strong>{" "}
                                        ${product.price}
                                    </p>

                                    <p className="mb-3">
                                        <strong>
                                            User:
                                        </strong>{" "}
                                        {product.userId?.name || "Unknown"}
                                    </p>

                                    <div className="d-flex gap-2 mt-auto">

                                        <button
                                            className="btn btn-primary flex-grow-1"
                                            onClick={() =>
                                                navigate(
                                                    `/admin/products/edit/${product._id}`
                                                )
                                            }
                                        >
                                            Edit
                                        </button>

                                        <button
                                            className="btn btn-danger flex-grow-1"
                                            onClick={() =>
                                                handleDelete(product._id)
                                            }
                                        >
                                            Delete
                                        </button>

                                    </div>

                                </div>
                            </div>
                        </div>
                    ))}

                </div>
            )}
            {deleteId && (
                <div
                    className="modal fade show d-block"
                    tabIndex="-1"
                    style={{
                        backgroundColor: "rgba(0, 0, 0, 0.5)"
                    }}
                >
                    <div className="modal-dialog modal-dialog-centered">
                        <div className="modal-content">

                            <div className="modal-header">
                                <h5 className="modal-title">
                                    Delete Product
                                </h5>

                                <button
                                    type="button"
                                    className="btn-close"
                                    onClick={() => setDeleteId(null)}
                                    disabled={deleting}
                                />
                            </div>

                            <div className="modal-body">
                                <p className="mb-0">
                                    Are you sure you want to delete this
                                    product?
                                </p>
                            </div>

                            <div className="modal-footer">

                                <button
                                    type="button"
                                    className="btn btn-secondary"
                                    onClick={() => setDeleteId(null)}
                                    disabled={deleting}
                                >
                                    Cancel
                                </button>

                                <button
                                    type="button"
                                    className="btn btn-danger"
                                    onClick={confirmDelete}
                                    disabled={deleting}
                                >
                                   {deleting && (
        <span
            className="spinner-border spinner-border-sm me-2"
            aria-hidden="true"
        ></span>
    )}

    {deleting ? "Deleting..." : "Delete"}
                                </button>

                            </div>

                        </div>
                    </div>
                </div>
            )}
        </div>
    );
}

export default AdminProducts;