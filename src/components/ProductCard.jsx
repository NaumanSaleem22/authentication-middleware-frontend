import { useState } from "react";
import { useNavigate } from "react-router-dom";
import api from "../services/api";

function ProductCard({ product, onDelete }) {
    const navigate = useNavigate();

    const [showModal, setShowModal] = useState(false);
    const [deleting, setDeleting] = useState(false);

    const handleDelete = async () => {
        setDeleting(true);

        try {
            await api.delete(`/products/${product._id}`);

            onDelete(product._id);
            setShowModal(false);
        } catch (error) {
            console.log(error);

            alert(
                error.response?.data?.message ||
                "Failed to delete product"
            );
        } finally {
            setDeleting(false);
        }
    };

    return (
        <>
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

                    <h5 className="mt-auto mb-3">
                        ${product.price}
                    </h5>

                    <div className="d-flex gap-2">

                        <button
                            className="btn btn-primary flex-grow-1"
                            onClick={() =>
                                navigate(
                                    `/products/edit/${product._id}`
                                )
                            }
                        >
                            Edit
                        </button>

                        <button
                            className="btn btn-danger flex-grow-1"
                            onClick={() => setShowModal(true)}
                        >
                            Delete
                        </button>

                    </div>

                </div>
            </div>

            {/* Delete Modal */}

            {showModal && (
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
                                    onClick={() =>
                                        setShowModal(false)
                                    }
                                    disabled={deleting}
                                />
                            </div>

                            <div className="modal-body">
                                <p className="mb-0">
                                    Are you sure you want to delete{" "}
                                    <strong>{product.name}</strong>?
                                </p>
                            </div>

                            <div className="modal-footer">

                                <button
                                    type="button"
                                    className="btn btn-secondary"
                                    onClick={() =>
                                        setShowModal(false)
                                    }
                                    disabled={deleting}
                                >
                                    Cancel
                                </button>

                                <button
                                    type="button"
                                    className="btn btn-danger"
                                    onClick={handleDelete}
                                    disabled={deleting}
                                >
                                    {deleting
                                        ? "Deleting..."
                                        : "Delete"}
                                </button>

                            </div>

                        </div>
                    </div>
                </div>
            )}
        </>
    );
}

export default ProductCard;