import React from 'react';
import { useEffect,useState } from 'react';
import { useNavigate, useParams } from "react-router";
import axios from 'axios';
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
  import { useSelector, useDispatch } from "react-redux";
  import Swal from "sweetalert2";

  import withReactContent from "sweetalert2-react-content";


  const BASE_URL = process.env.REACT_APP_BASE_URL;
export default function Cart() {
  
  const [local, setLocal] = useState("");
  const [cart, setCart] = useState([]);
  const navigate = useNavigate();
  const itemsPrice = cart.reduce((a, c) => a + c.qty * c.price, 0);
  const taxPrice = itemsPrice * 0.05;
  const shippingPrice = itemsPrice > 2000 ? 0 : 20;
  const totalPrice = itemsPrice + taxPrice + shippingPrice;
  const MySwal = withReactContent(Swal);

const state = useSelector((state) => {
    return state;
  });
  useEffect(() => {
    // getLocalStorage()
    
    getCart();
    console.log(cart);
  }, [])

  const getLocalStorage = () => {
    const item = localStorage.getItem("newUser");
    setLocal(item);
  };
  const getCart = async () => {
   
      const item = await axios.get(
        `${BASE_URL}/cart`,{
            headers: {
              Authorization: `Bearer ${state.Login.token}`,
            },
          }
      );
      setCart(item.data.cart);
     console.log(item);
    
  };

  const onAdd = async(productId) => {
    if(local){
      console.log(productId);
      await axios.post(`${BASE_URL}/cart`,{
        itemId: productId
      },{
        headers: {
          Authorization: `Bearer ${state.Login.token}`,
        },
      });
//    
     }else {
      MySwal.fire({
        icon: "error",
        title: "Oops...",
        text: "You should register or login",
        confirmButtonColor: "black",
      });


     }
  };
  const onRemove = (product) => {
    const exist = cart.find((x) => x._id === product._id);
    if (exist.qty === 1) {
      setCart(cart.filter((x) => x._id !== product._id));
    } else {
      setCart(
        cart.map((x) =>
          x._id === product._id ? { ...exist, qty: exist.qty - 1 } : x
        )
      );
    }
  };

  return (
    <aside className="block col-1">
        {console.log(cart)}
      <h2>Cart Items</h2>
      <div>
        {cart.length === 0 && <div>Cart is empty</div>}
        {cart.map((item) => (
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

        {cart.length !== 0 && (
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
