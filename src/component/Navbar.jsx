import React from 'react';
import { Link } from 'react-router-dom';
import './component.css';
import CartDrawer from './CartDrawer';

//components
const Navbar = ({
  cartItems,
  addingToCart,
  removingFromCart,
  countCartItems,
  setCartItems,
  getItems,
  hasItems,
  setItems,
}) => {
  return (
    <div>
      <div className="logo">
        <img
          src="/src/assets/MonkeyLogo.png"
          alt="logo"
          className="logo w-40 absolute pl-10 pt-6"
        />
      </div>

      <div className="navContainer flex flex-row flex-wrap justify-center">
        <div className="navLinks flex flex-row flex-wrap content-center justify-between py-14">
          <Link to={`/`} className=" p-1">
            <p className="dropbtn">Products List</p>
          </Link>

          <div className="dropdown pt-1">
            <p className="dropbtn ">Categories</p>
            <div className="dropdown-content">
              <Link to="/">
                <p>All</p>
              </Link>
              <Link to="/categories/men's clothing">
                <p>Mens</p>
              </Link>
              <Link to="/categories/women's clothing">
                <p>Womens</p>
              </Link>
              <Link to="/categories/electronics">
                <p>Electronics</p>
              </Link>
              <Link to="/categories/jewelery">
                <p>Jeweleries</p>
              </Link>
            </div>
          </div>

          <Link to="#" className=" p-1">
            <p className="dropbtn"> Contact</p>
          </Link>

          <Link to="#" className=" p-4">
            <CartDrawer
              cartItems={cartItems}
              addingToCart={addingToCart}
              removingFromCart={removingFromCart}
              countCartItems={countCartItems}
              setCartItems={setCartItems}
              getItems={getItems}
              hasItems={hasItems}
              setItems={setItems}
            />
          </Link>
        </div>

        {/* //Cart component */}
      </div>
    </div>
  );
};

export default Navbar;
