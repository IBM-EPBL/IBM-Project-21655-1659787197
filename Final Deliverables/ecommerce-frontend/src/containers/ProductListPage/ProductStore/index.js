import React ,{useState,useEffect}from 'react'
import { getProductsBySlug } from '../../../actions';

import { useDispatch, useSelector } from 'react-redux';
import { generatePublicUrl } from '../../..//urlConfig';
import { Link } from 'react-router-dom';
import Card from '../../../components/UI/Card';
import { MaterialButton } from '../../../components/MaterialUI';
import Price from '../../../components/UI/Card/Price';
import Rating from '../../../components/UI/Card/Rating';
const ProductStore = (props) => {
    const dispatch=useDispatch();
    const [priceRange,setPriceRange]=useState({
        under5k:500,
        under10k:1000,
        
        under15k:1500,
        under20k:2000,
        under30k:3000
    });
    const product=useSelector(state=>state.product);

    useEffect(()=>{
       
        const {match}=props;
        dispatch(getProductsBySlug(match.params.slug));
        
    },[]);
  return (
   <>
  
   {    
    Object.keys(product.productsByPrice).map((key,index)=>{
        
        return(
            <Card
            headerLeft={`${props.match.params.slug} mobile under ${priceRange[key]}`} 
            headerRight={<button>view all</button>}
            style={{
                width:'calc(100%-40px)',
                margin:'20px'
            }}
       
            >
     
            <div style={{display:'flex'}}> 
            {
                product.productsByPrice[key].map(product=>
                    <Link 
                    to={`/${product.slug}/${product._id}/p`}
                        style={{
                        display:'block'
                    }}className='productContainer'>
                    <div className='productImgContainer'>
                    <img src={generatePublicUrl(product.productPictures[0].img)} alt=""/>
                    </div>
                 
                    <div className='productInfo'>
                    <div style={{margin:'5px  0'}}>Samsung 4gb phone</div>
                    <div>
                    <Rating value="4.3"/>
                    &nbsp;&nbsp;
                    <span
                    style={{
                        color:"#777",
                        fontWeight:"500",
                        fontSize:"12px"
                    }}
                    >

                    (3353)
                    </span></div>
                   
                    <div className='productPrice'>{product.price} 
                    </div>
                    </div></Link>)
            }   
         
           
            </div>
            
            </Card>
        );
    })
   }
  
   
</>
  )
}

export default ProductStore