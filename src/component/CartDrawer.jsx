import * as React from 'react';
import Box from '@mui/material/Box';
import Drawer from '@mui/material/Drawer';
import Button from '@mui/material/Button';
import List from '@mui/material/List';
import Divider from '@mui/material/Divider';
import ListItem from '@mui/material/ListItem';
import ListItemText from '@mui/material/ListItemText';
import InboxIcon from '@mui/icons-material/MoveToInbox';
import MailIcon from '@mui/icons-material/Mail';
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';
import Badge from '@mui/material/Badge';
import AddIcon from '@mui/icons-material/Add';
import RemoveCircleOutlineIcon from '@mui/icons-material/RemoveCircleOutline';

import { useState } from 'react';

export default function CartDrawer({
  cartItems,
  addingToCart,
  removingFromCart,
  countCartItems,
  setCartItems,
}) {
  const itemsPrice = cartItems.reduce((a, c) => a + c.price * c.qty, 0);
  const taxPrice = itemsPrice * 0.12;
  const shipping = itemsPrice > 2000 ? 0 : 50;
  const totalPrice = itemsPrice + taxPrice + shipping;
  const [openDrawer, setOpenDrawer] = useState({
    right: false,
  });

  const toggleDrawer = (anchor, open) => (event) => {
    if (
      event.type === 'keydown' &&
      (event.key === 'Tab' || event.key === 'Shift')
    ) {
      return;
    }

    setOpenDrawer({ ...openDrawer, [anchor]: open });
  };

  const list = (anchor) => (
    <Box
      sx={{ width: anchor === 'top' || anchor === 'bottom' ? 'auto' : 350 }}
      role="presentation"
      onClick={toggleDrawer(anchor, false)}
      onKeyDown={toggleDrawer(anchor, false)}
    >
      <List>
        {['Your Shopping Cart'].map((text, index) => (
          <ListItem button key={text}>
            <ShoppingCartIcon>
              {index % 2 === 0 ? <InboxIcon /> : <MailIcon />}
            </ShoppingCartIcon>
            <ListItemText primary={text} />
          </ListItem>
        ))}
      </List>
      <Divider />
      <List>
        <div className="flex-col justify-center">
          <div>{cartItems.length === 0 && <div>Your cart is empty</div>}</div>
          <div className="ProductBasket">
            {cartItems.map((item) => (
              <div key={item.id} className=" border-2 p-10">
                <p>{item.title}</p>

                <img src={item.image} className="w-20 mx-auto"></img>
                <p>$ {item.price}</p>
                <p>Item Quantity: {item.qty}</p>
                <div className="">
                  <button onClick={() => removingFromCart(item)}>
                    <RemoveCircleOutlineIcon
                      color="primary"
                      aria-label="add"
                      size="small"
                    />
                  </button>

                  <button onClick={(e) => addingToCart(item)}>
                    <AddIcon color="primary" aria-label="add" size="small" />
                  </button>
                </div>
              </div>
            ))}
            {cartItems.length !== 0 && (
              <>
                <hr />
                <div className="flex row-auto">
                  <div className="col-2">Item's Price: </div>
                  <div className="col-1 text-right">
                    $ {itemsPrice.toFixed(2)}
                  </div>
                </div>
                <div className="flex row-auto">
                  <div className="col-2">Item's Tax: </div>
                  <div className="col-1 text-right">
                    $ {taxPrice.toFixed(2)}
                  </div>
                </div>
                <div className="flex row-auto">
                  <div className="col-2">Item's Shipping: </div>
                  <div className="col-1 text-right">
                    $ {shipping.toFixed(2)}
                  </div>
                </div>
                <div className="flex row-auto">
                  <div className="col-2 font-black">Total Item price: </div>
                  <div className="col-1 text-right">
                    $ {totalPrice.toFixed(2)}
                  </div>
                </div>
              </>
            )}
          </div>
        </div>
      </List>
      <Divider />
      <div className="flex justify-center py-4">
        <Button
          variant="contained"
          color="success"
          onClick={() => {
            setCartItems = '';
            alert('Thank you for the purchase!');
          }}
          className="mx-auto"
        >
          Success
        </Button>
      </div>
    </Box>
  );

  return (
    <div>
      {['right'].map((anchor) => (
        <React.Fragment key={anchor}>
          <Button onClick={toggleDrawer(anchor, true)}>
            <Badge badgeContent={countCartItems} color="primary">
              <ShoppingCartIcon color="action" />
            </Badge>
          </Button>

          <Drawer
            anchor={anchor}
            open={openDrawer[anchor]}
            onClose={toggleDrawer(anchor, false)}
          >
            {list(anchor)}
          </Drawer>
        </React.Fragment>
      ))}
    </div>
  );
}
