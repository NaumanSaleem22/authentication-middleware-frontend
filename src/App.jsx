import { Routes, Route } from "react-router-dom";
import ProtectedRoute from "./components/ProtectedRoute";
import Login from "./pages/Login";
import Products from "./pages/Products";
import CreateProduct from "./pages/CreateProduct";
import EditProduct from "./pages/EditProduct";
import Navbar from "./components/Navbar";
import Register from "./pages/Register";
import PublicRoute from "./components/PublicRoute";
import AdminRoute from "./components/AdminRoute";
import AdminProducts from "./pages/AdminProducts";
import AdminEditProduct from "./pages/AdminEditProduct";
function App() {

  return (
    <>
      <Navbar />
      <Routes>

        {/* Public Routes */}

        <Route
          path="/login"
          element={<PublicRoute>
            <Login />
          </PublicRoute>}
        />

        <Route
          path="/register"
          element={<PublicRoute>
            <Register />
          </PublicRoute>}
        />

        {/* Protected Routes */}

        <Route
          path="/products"
          element={
            <ProtectedRoute>
              <Products />
            </ProtectedRoute>
          }
        />

        <Route
          path="/products/create"
          element={
            <ProtectedRoute>
              <CreateProduct />
            </ProtectedRoute>
          }
        />

        <Route
          path="/products/edit/:id"
          element={
            <ProtectedRoute>
              <EditProduct />
            </ProtectedRoute>
          }
        />

        <Route
          path="/admin/products"
          element={
            <AdminRoute>
              <AdminProducts />
            </AdminRoute>
          }
        />
<Route
    path="/admin/products/edit/:id"
    element={
        <AdminRoute>
            <AdminEditProduct />
        </AdminRoute>
    }
/>
      </Routes>
    </>
  );
}

export default App;