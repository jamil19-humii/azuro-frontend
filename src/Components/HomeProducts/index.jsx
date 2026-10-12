import { useState, useEffect } from "react";
import axios from "axios";
import Slider from "react-slick/lib/slider";
import ProductCard from "../ProductCard";
import { API_URL } from "../../config";

const HomeProducts = () => {
  const SlickSlider = Slider.default || Slider;
  const [bestSellers, setBestSellers] = useState([]);

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const res = await axios.get(`${API_URL}/api/products`);
        // Take the first 3 products as "best sellers" for now
        setBestSellers(res.data.slice(0, 3));
      } catch (err) {
        console.error("Error fetching best sellers:", err);
      }
    };
    fetchProducts();
  }, []);

  const settings = {
    dots: false,
    infinite: true,
    speed: 500,
    slidesToShow: 3,
    slidesToScroll: 1,
    responsive: [
      { breakpoint: 992, settings: { slidesToShow: 2 } },
      { breakpoint: 576, settings: { slidesToShow: 1 } },
    ],
  };

  if (bestSellers.length === 0) return null;

  return (
    <section className="homeProductsSec">
      <div className="container">
        <div className="hd text-center">
          <h2>Best Seller Products</h2>
          <p>
            Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor
            incididunt ut labore et dolore magna aliqua.
          </p>
        </div>

        <div className="productSlider">
          <SlickSlider {...settings}>
            {bestSellers.map((product) => (
              <ProductCard key={product._id} product={product} showAddToCart={false} />
            ))}
          </SlickSlider>
        </div>
      </div>
    </section>
  );
};

export default HomeProducts;