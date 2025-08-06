import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';
import shopify from '../assets/shopify.png';
import './Products.css';

interface Product {
  id: number;
  title: string;
  price: number;
  description: string;
  category: string;
  image: string;
  rating: {
    rate: number;
    count: number;
  };
}

const Products = () => {
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [selectedCategory, setSelectedCategory] = useState<string>('all');
  const [searchQuery, setSearchQuery] = useState<string>('');

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const response = await axios.get('https://fakestoreapi.com/products');
        setProducts(response.data);
        setLoading(false);
      } catch (error) {
        console.error('Error fetching products:', error);
        setLoading(false);
      }
    };
    fetchProducts();
  }, []);

  const filteredProducts = products.filter((product) => {
    const matchesCategory = 
      selectedCategory === 'all' || product.category === selectedCategory;
    const matchesSearch = 
      product.title.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesCategory && matchesSearch;
  });

  const categories = ['all', ...new Set(products.map((product) => product.category))];

  return (
    <div className="ecommerce-container">
      <nav className="navbar">
        <div className="nav-container">
          <img src={shopify} alt="Shopify Logo" />
          <div className="search-box">
            <input
              type="text"
              placeholder="Search products..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
            <span className="search-icon">🔍</span>
          </div>
          <div className="nav-links">
            <a href="#">Cart (0)</a>
            <Link to="/Login">Login</Link>
          </div>
        </div>
      </nav>

      <main className="main-content">
        <div className="category-filters">
          {categories.map((category) => (
            <button
              key={category}
              onClick={() => setSelectedCategory(category)}
              className={`category-btn ${
                selectedCategory === category ? 'active' : ''
              }`}
            >
              {category}
            </button>
          ))}
        </div>

        {loading ? (
          <div className="loading-spinner"></div>
        ) : (
          <div className="product-grid">
            {filteredProducts.map((product) => (
              <div key={product.id} className="product-card">
                <div className="product-image-container">
                  <img src={product.image} alt={product.title} />
                </div>
                <div className="product-details">
                  <h3>{product.title}</h3>
                  <div className="price-rating">
                    <span className="price">${product.price}</span>
                    <span className="rating">
                      ⭐ {product.rating.rate} ({product.rating.count})
                    </span>
                  </div>
                  <button className="add-to-cart">Add to Cart</button>
                </div>
              </div>
            ))}
          </div>
        )}
      </main>

      <footer className="footer">
        <div className="footer-container">
          <div className="footer-section">
            <h3>FakeStore</h3>
            <p>Your one-stop shop for everything fake but fabulous!</p>
          </div>
          <div className="footer-section">
            <h4>Quick Links</h4>
            <ul>
              <li><Link to="/">Home</Link></li>
              <li><Link to="/products">Products</Link></li>
              <li><Link to="/about">About Us</Link></li>
            </ul>
          </div>
          <div className="footer-section">
            <h4>Customer Service</h4>
            <ul>
              <li><a href="#">Contact Us</a></li>
              <li><a href="#">FAQs</a></li>
              <li><a href="#">Returns</a></li>
            </ul>
          </div>
          <div className="footer-section">
            <h4>Newsletter</h4>
            <input type="email" placeholder="Your email" />
            <button>Subscribe</button>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default Products;