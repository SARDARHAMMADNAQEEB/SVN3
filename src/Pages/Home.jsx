import React from 'react'
import Navbar1 from '../components/Navbar1'
import Footer1 from '../components/Footer1'
import ImageRotate from '../Assets/ImageRotate'
import Home2 from '../Assets/Home2'
import Home3 from '../Assets/Home3'
import Home4 from '../Assets/Home4'

import Rotation2 from '../Assets/Rotation2'
import ChatbotComponent from '../components/ChatbotComponent'

function Home() {

  // const featuredProperties = [
  //   {
  //     title: 'Luxury Villa',
  //     description: 'A beautiful villa with stunning views.',
  //     price: '1,200,000',
  //     imageUrl: 'f1img1.webp',
  //   },
  //   {
  //     title: 'City Apartment',
  //     description: 'Modern city apartment in the heart of downtown.',
  //     price: '800,000',
  //     imageUrl: 'f1img2.webp',
  //   },
  //   {
  //     title: 'Seaside Cottage',
  //     description: 'Charming seaside cottage with direct beach access.',
  //     price: '600,000',
  //     imageUrl: 'f1img3.webp',
  //   },
  // ];
  

  return (
    <>
    
    <Navbar1/>
    {/* <ImageRotate/> */}
    {/* <Rotation/> */}
    <Rotation2/>
    <Home2/>
    {/* {featuredProperties.map((property, index) => (
          <Home3 key={index} property={property} />
        ))} */}
        <Home3/>
        <Home4/>
        <br/>

       
        <Footer1/>
        <ChatbotComponent/>
    </>
  )
}

export default Home