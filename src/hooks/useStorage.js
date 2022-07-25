const useStorage = () => {
  const key = 'cart';

  const setItems = (cartItems) => {
    return localStorage.setItem(key, JSON.stringify(cartItems));
  };

  const getItems = () => {
    return JSON.parse(localStorage.getItem(key));
  };

  const hasItems = () => {
    return getItems().length > 0;
  };

  return { setItems, getItems, hasItems };
};

export default useStorage;
