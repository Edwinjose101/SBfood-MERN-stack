import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useDispatchCart, useCart } from './ContextReducer';

export default function Card(props) {
  const dispatch = useDispatchCart();
  const data = useCart();
  const navigate = useNavigate();

  const [qty, setQty] = useState(1);

  const options = props.options;
  const priceValue = parseInt(Object.values(options)[0], 10); // Assuming single price
  const finalPrice = qty * priceValue;

  const handleClick = () => {
    if (!localStorage.getItem('token')) {
      navigate('/login');
    }
  };

  const handleQty = (e) => {
    setQty(e.target.value);
  };

  const handleAddToCart = async () => {
    const foodItem = props.item;
    const existingItem = data.find(item => item.id === foodItem._id);

    if (existingItem) {
      await dispatch({
        type: 'UPDATE',
        id: foodItem._id,
        price: finalPrice,
        qty: qty
      });
    } else {
      await dispatch({
        type: 'ADD',
        id: foodItem._id,
        name: foodItem.name,
        price: finalPrice,
        qty: qty,
        size: "",
        img: props.ImgSrc
      });
    }
  };

  return (
    <div
      className="card mt-4 shadow-sm border-0"
      style={{
        width: '18rem',
        borderRadius: '12px',
        backgroundColor: '#f4f6f8',
        fontFamily: '"Poppins", "Segoe UI", sans-serif'
      }}
    >
      <img
        src={props.ImgSrc}
        className="card-img-top"
        alt="food"
        style={{
          height: '160px',
          objectFit: 'cover',
          borderTopLeftRadius: '12px',
          borderTopRightRadius: '12px'
        }}
      />
      <div className="card-body d-flex flex-column justify-content-between">
        <h5
          className="card-title mb-3"
          style={{
            fontFamily: '"Poppins", "Segoe UI", sans-serif',
            color: '#2c3e50',
            fontWeight: '600',
            fontSize: '1.25rem'
          }}
        >
          {props.foodName}
        </h5>

        <div className="d-flex justify-content-between align-items-center mb-3">
          <select
            className="form-select form-select-sm w-50"
            onClick={handleClick}
            onChange={handleQty}
            style={{
              fontWeight: '500',
              backgroundColor: '#e3eaf2',
              color: '#2c3e50',
              border: '1px solid #ccc',
              fontFamily: '"Poppins", "Segoe UI", sans-serif'
            }}
          >
            {Array.from(Array(6), (_, i) => (
              <option key={i + 1} value={i + 1}>
                {i + 1} Qty
              </option>
            ))}
          </select>

          <div
            className="fs-6 fw-semibold"
            style={{
              color: '#2c3e50',
              fontWeight: '600',
              fontSize: '1rem',
              fontFamily: '"Poppins", "Segoe UI", sans-serif'
            }}
          >
            Price: ₹{finalPrice}/-
          </div>
        </div>

        <button
          className="btn w-100 fw-semibold"
          style={{
            backgroundColor: '#2c3e50',
            color: 'white',
            borderRadius: '8px',
            fontSize: '0.95rem',
            fontFamily: '"Poppins", "Segoe UI", sans-serif',
            letterSpacing: '0.5px'
          }}
          onClick={handleAddToCart}
        >
          Add to Cart
        </button>
      </div>
    </div>
  );
}
