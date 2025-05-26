import React, { useEffect, useState } from 'react';
import './Homepage.css';
import { Link } from 'react-router-dom';
import axios from 'axios';
import Temple from '../assets/Temple.jpg';
import Popup from '../Popup/Pop'; // Assuming the component is named Pop.jsx

const categories = [
  { name: 'UNESCO', icon: '🏛️' },
  { name: 'Research Papers', icon: '📄' },
  { name: 'Photo Essays', icon: '🖼️' },
  { name: 'Food & Culture', icon: '🍲' },
  { name: 'Rare Books', icon: '📚' },
  { name: 'E-Books', icon: '📖' },
  { name: 'Manuscripts', icon: '📝' },
];

const Homepage = () => {
  const [uploadedImages, setUploadedImages] = useState([]);

  // Fetch uploaded images on mount
  useEffect(() => {
    axios.get('http://localhost:4000/api/images/')
      .then((res) => setUploadedImages(res.data))
      .catch((err) => console.error('Error fetching images:', err));
  }, []);

  return (
    <div className="homepage">
      {/* 👇 Popup appears after 5 seconds */}
      <Popup />

      {/* Header */}
      <header className="header">
        <div className="logo">INDIAN CULTURE</div>
        <input type="text" placeholder="Discover collections..." className="search-bar" />
        <button className="search-button">🔍</button>
        <nav className="nav-buttons">
          <Link to="/login"><button>Login/Register</button></Link>
          <button>About us</button>
          <button>Project Details</button>
        </nav>
      </header>

      {/* Banner Image */}
      <section className="banner">
        <img src={Temple} alt="Temple" />
      </section>

      {/* Categories Section */}
      <section className="categories">
        <h2>Categories</h2>
        <div className="category-list">
          {categories.map((cat, idx) => (
            <div className="category-card" key={idx}>
              <div className="icon">{cat.icon}</div>
              <div className="label">{cat.name}</div>
            </div>
          ))}
        </div>
      </section>

      {/* Uploaded Images Gallery */}
      <section className="gallery">
        <h2>Community Uploaded Images</h2>
        {uploadedImages.length === 0 ? (
          <p>No images uploaded yet.</p>
        ) : (
          <div className="image-grid">
            {uploadedImages.map((img) => (
              <img
                key={img._id}
                src={`http://localhost:4000/api/images${img.imageUrl}`}
                alt="Uploaded"
                className="gallery-image"
              />
            ))}
          </div>
        )}
      </section>
    </div>
  );
};

export default Homepage;
