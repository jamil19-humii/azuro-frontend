import { useState, useEffect } from "react";
import { useParams, useSearchParams, Link } from "react-router-dom";
import axios from "axios";
import Fuse from "fuse.js";
import ProductCard from "../../Components/ProductCard";

const Shop = () => {
  const { category, subcategory } = useParams();
  const [searchParams] = useSearchParams();
  const searchQuery = searchParams.get("search");

  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchProducts = async () => {
      setLoading(true);
      setError(null);
      try {
        const params = {};
        if (category) params.category = category;
        if (subcategory) params.subcategory = subcategory;

        const response = await axios.get("http://localhost:5000/api/products", { params });
        setProducts(response.data);
      } catch (err) {
        console.error("Error fetching products:", err);
        setError("Could not load products. Please try again later.");
      } finally {
        setLoading(false);
      }
    };

    fetchProducts();
  }, [category, subcategory]);

  let displayedProducts = products;

  if (searchQuery) {
    const fuse = new Fuse(products, {
      keys: ["name", "category", "subcategory"],
      threshold: 0.4,
    });
    displayedProducts = fuse.search(searchQuery).map((result) => result.item);
  }

  const formatTitle = (str) => (str ? str.charAt(0).toUpperCase() + str.slice(1) : "All Products");
  const pageTitle = searchQuery
    ? `Search results for "${searchQuery}"`
    : subcategory
    ? formatTitle(subcategory)
    : formatTitle(category);

  if (loading) {
    return (
      <section className="homeProductsSec">
        <div className="container" style={{ textAlign: "center", padding: "60px 0" }}>
          <p>Loading products...</p>
        </div>
      </section>
    );
  }

  if (error) {
    return (
      <section className="homeProductsSec">
        <div className="container" style={{ textAlign: "center", padding: "60px 0" }}>
          <p>{error}</p>
        </div>
      </section>
    );
  }

  return (
    <section className="homeProductsSec">
      <div className="container">
        <h2 style={{ marginBottom: "30px" }}>{pageTitle}</h2>

        <div className="shopMain">
          <div className="shopGrid">
            {displayedProducts.length > 0 ? (
              displayedProducts.map((product) => (
                <ProductCard key={product._id} product={product} />
              ))
            ) : (
              <div style={{ textAlign: "center", padding: "50px", width: "100%" }}>
                <h4>No products found.</h4>
                <Link to="/" style={{ color: "#2bbef9", textDecoration: "none" }}>
                  Back to Home
                </Link>
              </div>
            )}
          </div>
        </div>
      </div>
    </section>
  );
};

export default Shop;