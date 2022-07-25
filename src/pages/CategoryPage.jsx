import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';
import Navbar from '../component/Navbar';
import { Rating } from '@mui/material';
import { useParams } from 'react-router-dom';
//components
import Button from '@mui/material/Button';

const CategoryPage = () => {
  const [products, setProducts] = useState([]);

  //
  const { category } = useParams();

  const fetchCategories = async () => {
    const { data } = await axios.get(
      `https://fakestoreapi.com/products/category/${category}`
    );
    setProducts(data);
  };
  useEffect(() => {
    fetchCategories();
  }, []);

  return (
    <div>
      {/* <Navbar /> */}
      {category} Category
      <div className="grid grid-cols-4">
        {products.map((product) => (
          <li key={product.id} className="">
            <Link to={`/product/${product.id}`}>
              <img
                src={product.image}
                alt="product_image"
                className=" mx-auto object-contain"
              />
              <p className="line-clamp-1">{product.title}</p>
            </Link>
            <p>{product.category}</p>
            <p>Order Count: {product.rating.count}</p>
            <p>Rating: {product.rating.rate}</p>
            <div className="flex justify-center">
              <Rating
                name="half-rating"
                value={product.rating.rate}
                precision={0.1}
                readOnly
              />
            </div>
            <p>Price: $ {product.price}</p>
            <div className="flex justify-center">
              <Button variant="contained">Add to Cart</Button>
            </div>
          </li>
        ))}
      </div>
    </div>
  );
};

export default CategoryPage;
