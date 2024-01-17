"use client"
import { Image } from '@chakra-ui/react'
import ImageLoading from '../ImageLoading/ImageLoading';
import { React,useEffect ,useState, Component } from "react";
import Slider from "react-slick";
import Apiservice from '@/Apiservice';
import "slick-carousel/slick/slick.css"; 
import "slick-carousel/slick/slick-theme.css";

//Objeto de ejemplo


const MainCarousel = () => {
  const [restaurants,setRestaurants] = useState([])
  const fetchData = async () => {
    const responseRestaurantCarousel = await Apiservice.get('Restaurants');
    setRestaurants(responseRestaurantCarousel);
  }
  fetchData();
  

  const settings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 3,
    slidesToScroll: 3,
    initialSlide: 0,
    autoplay: true,
    autoplaySpeed: 3000,
    pauseOnHover: true,
    arrows: false,
    responsive: [
      {
        breakpoint: 1024,
        settings: {
          slidesToShow: 2,
          slidesToScroll: 2,
        },
      },
      {
        breakpoint: 600,
        settings: {
          slidesToShow: 1,
          slidesToScroll: 1,
        },
      },
    ],
  };

  return (
    <div>
      <Slider {...settings}>
        {restaurants.map((restaurant, index) => (
          <div key={index}>
            <div style={{ marginLeft: '1em', marginRight: '1em' }}>
              <Image
                src={restaurant.marketingImg}
                width={500}
                height={300}
                borderRadius='5%'
                objectFit='cover'
                loading={<ImageLoading />}
                fallbackSrc={'https://via.placeholder.com/500x300'}
              />
            </div>
          </div>
        ))}
      </Slider>
    </div>
  );
};

export default MainCarousel;