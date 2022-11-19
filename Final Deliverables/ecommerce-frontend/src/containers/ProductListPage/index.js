import React from 'react';
import ProductStore from './ProductStore';
import Layout from '../../components/Layout'
import ProductPage from './ProductPage';
import ClothingAndAccessories from './ClothingAndAccessories';
import './style.css';

import { generatePublicUrl } from '../../urlConfig';
import getParams from '../../utils/getParams';
const ProductListPage = (props) => {
    const renderProduct=()=>{
        console.log(props);
        const params=getParams(props.location.search);
        let content=null;
        switch(params.type){
            case 'store':
                content=<ProductStore {...props} />;
                break;      
            case 'page':
                content=<ProductPage {...props} />
                break;
            default:
                content=<ClothingAndAccessories {...props}/>;

        }
        return content;
    }

  return (
   <Layout>
  
   
   {renderProduct()}
   </Layout>
  )
  }

export default ProductListPage