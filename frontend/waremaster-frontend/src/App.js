import "./App.css";
import {
  BrowserRouter as Router,
  Routes,
  Route,
  BrowserRouter,
} from "react-router-dom";
import LoginPage from "./pages/LoginPage";
import HomePage from "./pages/HomePage";
import RequestsPage from "./pages/RequestsPage";
import RequestPage from "./pages/RequestPage";
import ProductsPage from "./pages/ProductsPage";
import OrdersPage from "./pages/OrdersPage";
import AccountPage from "./pages/AccountPage";
import StoragesPage from "./pages/StoragesPage"
import RegisterPage from "./pages/RegisterPage";

function App() {
  return (
    <div>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<LoginPage />} />
          <Route path="/register" element = {<RegisterPage />} />
          <Route path="/home" element={<HomePage />} />
          <Route path="/requests" element={<RequestsPage />} />
          <Route path="/request" element={<RequestPage />} />
          <Route path="/products" element={<ProductsPage />} />
          <Route path="/orders" element={<OrdersPage />} />
          <Route path="/storages" element={<StoragesPage />} />
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
