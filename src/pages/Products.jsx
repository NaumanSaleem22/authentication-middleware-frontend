import { useEffect, useState } from "react";

import api from "../services/api";
import ProductCard from "../components/ProductCard";

function Products() {

    const [products, setProducts] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState("");

    useEffect(() => {

        const getProducts = async () => {

            try {

                const response = await api.get("/products");

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

    if (loading) {
        return (
            <div className="text-center py-5">
                <div
                    className="spinner-border text-primary"
                    role="status"
                >
                    <span className="visually-hidden">
                        Loading...
                    </span>
                </div>

                <p className="text-muted mt-3 mb-0">
                    Loading products...
                </p>
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
                        My Products
                    </h1>

                    <p className="text-muted mb-0">
                        Manage your products
                    </p>
                </div>

            </div>

            {products.length === 0 ? (

                <div className="text-center py-5">

                    <h3>No products found</h3>

                    <p className="text-muted">
                        Create your first product to get started.
                    </p>

                </div>

            ) : (

                <div className="row g-4">

                    {products.map((product) => (

                        <div
                            className="col-12 col-md-6 col-lg-4"
                            key={product._id}
                        >

                            <ProductCard
                                product={product}
                                onDelete={(deletedId) => {

                                    setProducts((currentProducts) =>
                                        currentProducts.filter(
                                            (item) =>
                                                item._id !== deletedId
                                        )
                                    );

                                }}
                            />

                        </div>

                    ))}

                </div>

            )}

        </div>
    );
}

export default Products;