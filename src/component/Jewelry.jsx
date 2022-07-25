import React, { useState, useEffect } from 'react';
import axios from 'axios';

const Jewelry = () => {
  const [categories, setCategories] = useState([]);

  //fetching categories
  const fetchCategories = async () => {
    const { data } = await axios.get(
      'https://fakestoreapi.com/products/categories'
    );

    setCategories(data);
    console.log(data);
  };

  useEffect(() => {
    fetchCategories();
  }, []);
  return (
    <div>
      <p>{categories}</p>
    </div>
  );
};

export default Jewelry;
