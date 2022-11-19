import React from 'react'
import Layout from '../../components/Layout';

import Header from '../../components/Header';

import MenuHeader from '../../components/MenuHeader';
import Carousel from 'react-bootstrap/Carousel';
import 'bootstrap/dist/css/bootstrap.min.css';
import { useState } from 'react';
import "./style.css";
const HomePage = (props) => {
  const [index, setIndex] = useState(0);

  const handleSelect = (selectedIndex, e) => {
    setIndex(selectedIndex);
  };
  
  return (
    <Layout>
   <div className='homepage'></div>
   
  </Layout>

  );
}

export default HomePage 