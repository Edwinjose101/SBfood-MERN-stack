import React from 'react';
import DeleteIcon from '@material-ui/icons/Delete';
import { useCart, useDispatchCart } from '../components/ContextReducer';

export default function Cart() {
  const data = useCart();
  const dispatch = useDispatchCart();

  const handleCheckOut = async () => {
    const userEmail = localStorage.getItem('userEmail');

    const response = await fetch('http://localhost:5000/api/auth/orderData', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        order_data: data,
        email: userEmail,
        order_date: new Date().toDateString(),
      }),
    });

    if (response.status === 200) {
      dispatch({ type: 'DROP' });
      alert('Order placed successfully!');
    } else {
      alert('Failed to place order. Try again!');
    }
  };

  const totalPrice = data.reduce((total, food) => total + food.price, 0);

  if (data.length === 0) {
    return <div className="m-5 w-100 text-center fs-3">The Cart is Empty!</div>;
  }

  return (
    <div className="container m-auto mt-5 table-responsive">
      <table className="table table-hover">
        <thead className="text-success fs-4">
          <tr>
            <th>#</th>
            <th>Food Name</th>
            <th>Quantity</th>
            <th>Size</th>
            <th>Amount</th>
            <th>Action</th>
          </tr>
        </thead>
        <tbody>
          {data.map((food, index) => (
            <tr key={index}>
              <td>{index + 1}</td>
              <td>{food.name}</td>
              <td>{food.qty}</td>
              <td>{food.size}</td>
              <td>₹{food.price}/-</td>
              <td>
                <button className="btn p-0">
                  <DeleteIcon
                    style={{ color: 'red' }}
                    onClick={() => dispatch({ type: 'REMOVE', index })}
                  />
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      <div className="mt-4 d-flex justify-content-between align-items-center">
        <h2>Total Price: ₹{totalPrice}/-</h2>
        <button className="btn btn-success" onClick={handleCheckOut}>
          Check Out
        </button>
      </div>
    </div>
  );
}
