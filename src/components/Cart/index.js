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
    HStack,
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
  const itemsPrice = cart.reduce((a, c) => a + c.quantity * c.itemId.price, 0);
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
     console.log(item.data.cart);
    
  };

  const onAdd = async(productId) => {
    
      console.log(productId);
      await axios.post(`${BASE_URL}/cart`,{
        itemId: productId
      },{
        headers: {
          Authorization: `Bearer ${state.Login.token}`,
        },
      });
//   
getCart(); 
     
  };
  const onRemove = async(productId) => {
      console.log(productId);
    await axios.post(`${BASE_URL}/reduce-cart-item/${productId}`,{
        headers: {
          Authorization: `Bearer ${state.Login.token}`,
        },
      });
      getCart(); 
  };

  return (
    <aside className="block col-1">
        <Box>
      <Text fontSize="2rem" as='strong'>Cart Items</Text>
      <div>
        {cart.length === 0 && <div><Text fontSize="1.5rem">Cart is empty</Text></div>}
        {cart.map((item) => (
          <div key={item.itemId._id} className="row">
           
            <div className="col-2"><Text fontSize="1.5rem">{item.itemId.Name}</Text></div>
            <HStack>
           

            <div className="col-2 text-right">
              {item.quantity} x {item.itemId.price.toFixed(2)} SAR
            </div>
            <div className="col-2">
            <Button size='xs' onClick={() => onRemove(item.itemId._id)}><MinusIcon/></Button>{' '}
              <Button size='xs' onClick={() => onAdd(item.itemId._id)}><AddIcon/></Button>
            </div>
            </HStack>
          </div>
        ))}

        {cart.length !== 0 && (
          <>
            <hr></hr>
            <div className="row">
              <div className="col-2"><Text as='strong'>Items Price</Text></div>
              <div className="col-1 text-right">SAR {itemsPrice.toFixed(2)}</div>
            </div>
            <div className="row">
              <div className="col-2"><Text as='strong'>Tax Price</Text></div>
              <div className="col-1 text-right">SAR {taxPrice.toFixed(2)}</div>
            </div>
            <div className="row">
              <div className="col-2"><Text as='strong'>Delivery Price</Text></div>
              <div className="col-1 text-right">
              SAR {shippingPrice.toFixed(2)}
              </div>
            </div>

            <div className="row">
              <div className="col-2">
                <strong>Total Price</strong>
              </div>
              <div className="col-1 text-right">
                <strong>SAR {totalPrice.toFixed(2)}</strong>
              </div>
            </div>
            <hr />
            <div className="row">
              <Button bg="#E7815C" w="100%" onClick={() => alert('Implement Checkout!')}>
              <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-bag-check" viewBox="0 0 16 16">
  <path fill-rule="evenodd" d="M10.854 8.146a.5.5 0 0 1 0 .708l-3 3a.5.5 0 0 1-.708 0l-1.5-1.5a.5.5 0 0 1 .708-.708L7.5 10.793l2.646-2.647a.5.5 0 0 1 .708 0z"/>
  <path d="M8 1a2.5 2.5 0 0 1 2.5 2.5V4h-5v-.5A2.5 2.5 0 0 1 8 1zm3.5 3v-.5a3.5 3.5 0 1 0-7 0V4H1v10a2 2 0 0 0 2 2h10a2 2 0 0 0 2-2V4h-3.5zM2 5h12v9a1 1 0 0 1-1 1H3a1 1 0 0 1-1-1V5z"/>
</svg>  Checkout
              </Button>
            </div>
          </>
        )}
      </div></Box>
    </aside>
  );
}
