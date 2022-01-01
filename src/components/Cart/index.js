import React from 'react';
import { useEffect } from 'react';
import {
    Box,
    Text,
    Link,
    VStack,
    Button,
    Image,
    Input,
    SimpleGrid,
    GridItem,
  } from "@chakra-ui/react";
  import {  AddIcon ,MinusIcon} from '@chakra-ui/icons'
export default function Cart(props) {
  const { cartItems, onAdd, onRemove } = props;
  const itemsPrice = cartItems.reduce((a, c) => a + c.qty * c.price, 0);
  const taxPrice = itemsPrice * 0.5;
  const shippingPrice = itemsPrice > 2000 ? 0 : 20;
  const totalPrice = itemsPrice + taxPrice + shippingPrice;

  useEffect(() => {
    console.log(cartItems);
  }, [])
  return (
    <aside className="block col-1">
      <h2>Cart Items</h2>
      <div>
        {cartItems.length === 0 && <div>Cart is empty</div>}
        {cartItems.map((item) => (
          <div key={item._id} className="row">
            <div className="col-2">{item.Name}</div>
            <div className="col-2">
            <Button onClick={() => onRemove(item)}><MinusIcon/></Button>{' '}
              <Button onClick={() => onAdd(item)}><AddIcon/></Button>
            </div>

            <div className="col-2 text-right">
              {item.qty} x {item.price.toFixed(2)} SAR
            </div>
          </div>
        ))}

        {cartItems.length !== 0 && (
          <>
            <hr></hr>
            <div className="row">
              <div className="col-2">Items Price</div>
              <div className="col-1 text-right">SAR{itemsPrice.toFixed(2)}</div>
            </div>
            <div className="row">
              <div className="col-2">Tax Price</div>
              <div className="col-1 text-right">SAR{taxPrice.toFixed(2)}</div>
            </div>
            <div className="row">
              <div className="col-2">Shipping Price</div>
              <div className="col-1 text-right">
              SAR{shippingPrice.toFixed(2)}
              </div>
            </div>

            <div className="row">
              <div className="col-2">
                <strong>Total Price</strong>
              </div>
              <div className="col-1 text-right">
                <strong>SAR{totalPrice.toFixed(2)}</strong>
              </div>
            </div>
            <hr />
            <div className="row">
              <button onClick={() => alert('Implement Checkout!')}>
                Checkout
              </button>
            </div>
          </>
        )}
      </div>
    </aside>
  );
}
