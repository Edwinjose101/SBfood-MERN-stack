/* eslint-disable react/jsx-no-undef */
import React, { useState } from 'react'
import { Link, useNavigate } from "react-router-dom";
import Badge from "@material-ui/core/Badge";
import ShoppingCartIcon from "@material-ui/icons/ShoppingCart";
import { useCart } from './ContextReducer';
import Modal from '../Modal';
import Cart from '../screens/Cart';

export default function Navbar(props) {
    const [cartView, setCartView] = useState(false);
    localStorage.setItem('temp', "first");
    let navigate = useNavigate();

    const handleLogout = () => {
        localStorage.removeItem('token');
        navigate("/login");
    }

    const loadCart = () => {
        setCartView(true);
    }

    const items = useCart() || [];

    return (
        <div>
            <nav className="navbar navbar-expand-lg"
                style={{
                    position: "fixed",
                    top: 0,
                    width: "100%",
                    zIndex: 10,
                    backgroundColor: "#1f2a40", // Professional navy color
                    boxShadow: "0 2px 8px rgba(0,0,0,0.2)"
                }}>
                <div className="container-fluid px-4">
                    <Link className="navbar-brand fs-2 fw-bold text-white" to="/" style={{ fontFamily: 'Segoe UI, sans-serif' }}>
                        SB Foods
                    </Link>
                    <button className="navbar-toggler text-white" type="button" data-bs-toggle="collapse" data-bs-target="#navbarContent" aria-controls="navbarContent" aria-expanded="false" aria-label="Toggle navigation">
                        <span className="navbar-toggler-icon"></span>
                    </button>

                    <div className="collapse navbar-collapse" id="navbarContent">
                        <ul className="navbar-nav me-auto mb-2 mb-lg-0">
                            <li className="nav-item">
                                <Link className="nav-link text-light fs-5 mx-2" to="/">Home</Link>
                            </li>
                            {localStorage.getItem("token") && (
                                <li className="nav-item">
                                    <Link className="nav-link text-light fs-5 mx-2" to="/myorder">My Orders</Link>
                                </li>
                            )}
                        </ul>

                        <div className="d-flex align-items-center">
                            {!localStorage.getItem("token") ? (
                                <>
                                    <Link className="btn btn-outline-light me-2" to="/login">Login</Link>
                                    <Link className="btn btn-success text-white" to="/signup">Sign Up</Link>
                                </>
                            ) : (
                                <>
                                    <div className="btn btn-outline-light me-3 d-flex align-items-center" onClick={loadCart}>
                                        <Badge color="secondary" badgeContent={items.length}>
                                            <ShoppingCartIcon style={{ color: 'white' }} />
                                        </Badge>
                                        <span className="ms-2 text-white">Cart</span>
                                    </div>

                                    {cartView && (
                                        <Modal onClose={() => setCartView(false)}>
                                            <Cart />
                                        </Modal>
                                    )}

                                    <button className="btn btn-danger text-white" onClick={handleLogout}>Logout</button>
                                </>
                            )}
                        </div>
                    </div>
                </div>
            </nav>
        </div>
    )
}
