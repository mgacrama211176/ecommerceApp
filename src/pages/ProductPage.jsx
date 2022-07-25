import React, { useEffect, useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import axios from 'axios';
import './pages.css';

import Navbar from '../component/Navbar';

import useStorage from '../hooks/useStorage';
import LoadingLoadout from '../component/LoadingLoadout';

//MUI components
import Button from '@mui/material/Button';
import { Rating } from '@mui/material';

const ProductPage = ({ product, addingToCart, removingFromCart }) => {
  const { productId } = useParams();
  //   const { productId } = useParams;
  const [done, setDone] = useState(undefined);
  const [title, setTitle] = useState();
  const [price, setPrice] = useState();
  const [description, setDescription] = useState();
  const [image, setImage] = useState();
  const [orders, setOrders] = useState();
  const [rating, setRating] = useState(0);
  const [cartItems, setCartItems] = useState([]);
  const [countCartItems, setCountCartItems] = useState(0);
  const { getItems, setItems, hasItems } = useStorage();

  const fetchDataFromApi = async () => {
    //getting the data from the axios
    const { data } = await axios.get(
      //productId is from the useParams Deconstructuring
      'https://fakestoreapi.com/products/' + productId
    );
    setDone(true);
    //destructuring each data from axios
    const { title, price, description, image } = data;
    const { count, rate } = data.rating;

    //inserting information from each useState hook
    setTitle(title);
    setPrice(price);
    setDescription(description);
    setImage(image);
    setOrders(count);
    setRating(rate);
  };
  useEffect(() => {
    fetchDataFromApi();
    if (hasItems()) {
      setCartItems(getItems());
      setCountCartItems(getItems().length);
    }
  }, []);

  //   console.log(typeof rating);
  return (
    <main>
      <Navbar
        cartItems={cartItems}
        addingToCart={addingToCart}
        countCartItems={cartItems.length}
        removingFromCart={removingFromCart}
      />
      <header className="text-lg font-bold">
        <h1>{title}</h1>
      </header>

      <Link to="#" className=" p-4"></Link>
      {!done ? (
        <LoadingLoadout />
      ) : (
        <div>
          <div className="place-content-center flex justify-evenly">
            <img
              src={image}
              alt="product_image"
              className="itemImage max-w-xs aspect-square"
            />
            <div className="productInfo">
              <p className="">{description}</p>
              <p>Total product Orders: {orders}</p>
              <p className="stars">Product Rating: {rating}</p>
              <Rating
                name="half-rating"
                value={rating}
                precision={0.1}
                readOnly
              />
              <p className="bold price">Price: PHP {price}</p>
              {/* The button can be a component since it will be used on all products */}

              <Button variant="contained" onClick={() => addingToCart(product)}>
                Add to Cart
              </Button>
            </div>
          </div>
        </div>
      )}
    </main>
  );
};

export default ProductPage;
