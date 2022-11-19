import React ,{useEffect, useState}from 'react';
import { useSelector } from 'react-redux';
import Layout from '../../components/Layout';
import Card from '../../components/UI/Card';
import CartItem from './CartItem';
import { useDispatch } from 'react-redux';
import './index.css'; 
import { addToCart } from '../../actions';
import { getCartItems } from '../../actions';
import { MaterialButton } from '../../components/MaterialUI';
import PriceDetails from '../../components/PriceDetails.js';
const CartPage=(props)=>{
    const cart=useSelector(state=>state.cart);
    const auth=useSelector(state=>state.auth);
    
    const dispatch=useDispatch();
  
    // const cartItems=cart.cartItems;
    const [cartItems,setCartItems]=useState(cart.cartItems);
    useEffect(()=>{
      setCartItems(cart.cartItems);

    },[cart.cartItems]);
    useEffect(()=>{
      if(auth.authenticate){
        dispatch(getCartItems());

      }
    },[auth.authenticate]);
const onQuantityIncrement=(_id,qty)=>{
  console.log({_id,qty});
  console.log(cartItems[_id]) 
  const{name,price,img}=cartItems[_id];
  dispatch(addToCart({_id,name,price,img},1));

}
const onQuantityDecrement=(_id,qty)=>{
  const{name,price,img}=cartItems[_id];
  dispatch(addToCart({_id,name,price,img},-1));

}
let total;
if(props.onlyCartItems){
  return (
    <>
    {Object.keys(cartItems).map((key,index)=>
      <CartItem
      key={index}       
      cartItem={cartItems[key]}
      onQuantityInc={onQuantityIncrement}
      onQuantityDec={onQuantityDecrement}
      />
    )
    }
    </>
  );
}
    return(
        <Layout>
        <div className='cardContainer'  style={{alignItems:'flex-start'}}>
        <Card
        headerLeft={`My Cart`}
        headerRight={<div>Deliver to </div>} 
        style={{width:'calc(100%-400px',overflow:'hidden'}}   
        >
      
        {Object.keys(cartItems).map((key,index)=>
          <CartItem
          key={index}       
          cartItem={cartItems[key]}
          onQuantityInc={onQuantityIncrement}
          onQuantityDec={onQuantityDecrement}
          />
        )
        }
      
        <div style={{
          width:'100%',
          display:'flex',
          background:'#ffffff',
          justifyContent:'flex-end',
          boxShadow:'0 0 10px 10px #eee',
          padding:'10px 0',
          boxSizing:'border-box'
        }}>
        <div style={{width:'250px'}}>
        <MaterialButton
        title="PLACE ORDER"
        onClick={()=>props.history.push('/checkout')}/>
        </div></div>
        
        </Card>
      


      
      
        
       
        <PriceDetails
        totalItem={Object.keys(cart.cartItems).reduce(function(qty,key){
          return qty+cart.cartItems[key].qty;
        },0)}
        totalPrice={Object.keys(cart.cartItems).reduce((totalPrice,key)=>{
          const {price,qty}=cart.cartItems[key];
          return totalPrice+price*qty;
        },0)}
        />
        </div>
        </Layout>
    )
}
export default CartPage;