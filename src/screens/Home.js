import React, { useEffect, useState } from 'react';
import Card from '../components/Card';
import Footer from '../components/Footer';
import Navbar from '../components/Navbar';

export default function Home() {
  const [foodCat, setFoodCat] = useState([]);
  const [foodItems, setFoodItems] = useState([]);
  const [search, setSearch] = useState('');

  const loadFoodItems = async () => {
    try {
      const response = await fetch("http://localhost:5000/api/foodData"); // make sure this route exists
      const data = await response.json();
      setFoodItems(data); // assuming data is an array of food items
      const categories = [...new Set(data.map(item => item.category))]; // extract unique categories
      setFoodCat(categories);
    } catch (error) {
      console.error("Failed to load food items:", error);
    }
  };

  useEffect(() => {
    loadFoodItems();
  }, []);

  return (
    <div>
      <Navbar />

      <div id="carouselExampleFade" className="carousel slide carousel-fade" data-bs-ride="carousel">
        <div className="carousel-inner" id="carousel">
          <div className="carousel-caption" style={{ zIndex: 9 }}>
            <div className="d-flex justify-content-center">
              <input
                className="form-control me-2 w-75 bg-white text-dark"
                type="search"
                placeholder="Search in here..."
                aria-label="Search"
                value={search}
                onChange={(e) => setSearch(e.target.value)}
              />
              <button className="btn text-white bg-danger" onClick={() => setSearch('')}>X</button>
            </div>
          </div>

          
        </div>

      </div>

      <div className="container mt-4">
        {foodCat.length > 0 ? (
          foodCat.map((category, index) => (
            <div key={index} className="mb-4">
              <h3 className="m-3">{category}</h3>
              <hr style={{ height: "4px", backgroundImage: "-webkit-linear-gradient(left, rgb(0, 255, 137), rgb(0, 0, 0))" }} />
              <div className="row">
                {foodItems
                  .filter(item => item.category === category && item.name.toLowerCase().includes(search.toLowerCase()))
                  .map(item => (
                    <div key={item._id} className="col-12 col-md-6 col-lg-3 mb-3">
                      <Card foodName={item.name} item={item} options={{  price: item.price }} ImgSrc={item.img} />
                    </div>
                  ))}
              </div>
            </div>
          ))
        ) : (
          <div className="text-center">Loading food categories...</div>
        )}
      </div>

      <Footer />
    </div>
  );
}
