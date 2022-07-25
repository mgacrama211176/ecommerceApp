import React, { useState, useEffect, useContext } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';
//components
import Button from '@mui/material/Button';
import { Rating } from '@mui/material';
import Navbar from '../component/Navbar';
import useStorage from '../hooks/useStorage';
import LoadingLoadout from '../component/LoadingLoadout';

const ProductListPage = () => {
  //Fetching all data from all categories
  const [products, setProducts] = useState([]);
  const [cartItems, setCartItems] = useState([]);
  const { setItems, getItems, hasItems } = useStorage();
  const [done, setDone] = useState(undefined);

  //fetch all data again from all products.
  const fetchAllProducts = async () => {
    const { data } = await axios.get('https://fakestoreapi.com/products');
    setProducts(data);
    setDone(true);
  };

  useEffect(() => {
    fetchAllProducts();
    if (hasItems()) {
      setCartItems(getItems());
    }
  }, []);

  useEffect(() => {
    // if (!hasItems()) {
    setItems(cartItems);
    // }
  }, [cartItems]);

  const addingToCart = (product) => {
    const existingProduct = cartItems.find((x) => x.id === product.id);
    if (existingProduct) {
      setCartItems(
        cartItems.map((x) =>
          x.id === product.id
            ? { ...existingProduct, qty: existingProduct.qty + 1 }
            : x
        )
      );
      alert(`Product "${product.title}" has been added`);
    } else {
      setCartItems([...cartItems, { ...product, qty: 1 }]);
      alert(`Product "${product.title}" has been added`);
    }
  };

  const removingFromCart = (product) => {
    const existingProduct = cartItems.find((x) => x.id === product.id);
    if (existingProduct.qty === 1) {
      setCartItems(cartItems.filter((x) => x.id !== product.id));
      alert(`Product "${product.title}" has been added`);
    } else {
      setCartItems(
        cartItems.map((x) =>
          x.id === product.id
            ? { ...existingProduct, qty: existingProduct.qty - 1 }
            : x
        )
      );
    }
  };

  return (
    <main>
      <Navbar
        cartItems={cartItems}
        addingToCart={addingToCart}
        countCartItems={cartItems.length}
        removingFromCart={removingFromCart}
        setCartItems={setCartItems}
        hasItems={hasItems}
      />

      <header>
        <h1 className="text-xl antialiased font-bold p-10">Product List</h1>
      </header>
      {!done ? (
        <LoadingLoadout />
      ) : (
        <div className="items-center flex justify-center bg-sky-700">
          <ul className="grid grid-cols-4 w-3/4">
            {products.map((product) => (
              <li
                key={product.id}
                className=" border-2 rounded-lg text-lg font-sans antialiased "
              >
                <Link to={`/product/${product.id}`} className="w-1 ">
                  <img
                    src={product.image}
                    alt="product_image"
                    className="object-contain mx-auto"
                  />
                  <p className="line-clamp-1">{product.title}</p>
                </Link>
                <p>{product.category}</p>
                <p>Rating: {product.rating.rate}</p>
                <Rating
                  name="half-rating"
                  value={product.rating.rate}
                  precision={0.1}
                  readOnly
                />

                <p>Price: $ {product.price}</p>
                <Button
                  variant="contained"
                  onClick={() => addingToCart(product)}
                >
                  Add to Cart
                </Button>
              </li>
            ))}
          </ul>
        </div>
      )}
    </main>
  );
};

export default ProductListPage;
