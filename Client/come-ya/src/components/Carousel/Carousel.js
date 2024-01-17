"use client"
import { Heading, Text,  Image, IconButton } from '@chakra-ui/react'
import { ChevronLeft, ChevronRight, StarRateRounded } from '@mui/icons-material';
import { Box } from '@mui/material';
import Link from 'next/link';
import ImageLoading from '../ImageLoading/ImageLoading';
import React, { Component } from "react";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css"; 
import "slick-carousel/slick/slick-theme.css";
import styles from './Carousel.module.css'

//Objeto de ejemplo
const images = [
  {
    id: 1,
    food: 'Oakland Bay Bridge',
    image:
      'https://images.unsplash.com/photo-1551963831-b3b1ca40c98e',
    price: 1200,
    restaurant: 'KFC',
    restaurantId: 5,
  },
  {
    id: 2,
    food: 'Bird',
    image:
      'https://images.unsplash.com/photo-1551782450-a2132b4ba21d',
    price: 300,
    restaurant: 'Burger King',
    restaurantId: 1,
  },
  {
    id: 3,
    food: 'Bali, Indonesia',
    image:
      'https://images.unsplash.com/photo-1558642452-9d2a7deb7f62',
    price: 120,
    restaurant: 'Starbucks',
    restaurantId: 4,
  },
  {
    id: 4,
    food: 'Goč',
    image:
      'https://images.unsplash.com/photo-1444418776041-9c7e33cc5a9c',
    price: 12,
    restaurant: 'Hummus Sabores del Desierto',
    restaurantId: 10,
  },
  {
    id: 5,
    food: 'Oakland Bay Bridge, United States',
    image:
      'https://images.unsplash.com/photo-1551782450-a2132b4ba21d',
    price: 12,
    restaurant: 'KFC',
    restaurantId: 5,
  },
  {
    id: 6,
    food: 'Chicharrón Light Josefa Brea Chicharrón LightJosefaBrea',
    image:
      'https://images.unsplash.com/photo-1558642452-9d2a7deb7f62',
    price: 1222,
    restaurant: 'Chicharrón Light Josefa Brea Chicharrón LightJosefaBrea',
    restaurantId: 10,
  },
  {
    id: 7,
    food: 'Bali, Indonesia',
    image:
      'https://images.unsplash.com/photo-1567306301408-9b74779a11af',
    price: 12,
    restaurant: 'KFC',
    restaurantId: 5,
  },
  {
    id: 8,
    food: 'Goč, Serbia',
    image:
      'https://images.unsplash.com/photo-1512341689857-198e7e2f3ca8?auto=format&fit=crop&w=400&h=250&q=60',
    price: 12,
    restaurant: 'ChicharrónLightJosefaBreaChicharrón LightJosefaBreaChicharrón Light Josefa BreaChicharrónLightJosefaBrea',
    restaurantId: 10,
  },
];


export default class Carousel extends Component {
  
  constructor(props) {
      /*Props disponibles
          titulo = string
      */
      super(props);
      this.next = this.next.bind(this);
      this.previous = this.previous.bind(this);
  }
  next() {
    this.slider.slickNext();
  }
  previous() {
    this.slider.slickPrev();
  }
  render() {
    var settings = {
        infinite: true,
        speed: 500,
        slidesToShow: 4,
        slidesToScroll: 4,
        initialSlide: 0,
        swipeToSlide: true,
        arrows: false,
        responsive: [
        {
            breakpoint: 1024,
            settings: {
                slidesToShow: 3,
                slidesToScroll: 3,
            }
        },
        {
            breakpoint: 600,
            settings: {
                slidesToShow: 2,
                slidesToScroll: 2,
                initialSlide: 2
            }
        },
        {
            breakpoint: 480,
            settings: {
                slidesToShow: 1,
                slidesToScroll: 1
            }
        }]
    };
    return (
      <div>
        
        {this.props.titulo == "Restaurantes" ? (
          
          <>
            <div className={styles.topConteiner}>
              <div className={styles.tittle}>
                <Heading as='h3' size='lg'>{this.props.titulo}</Heading>
              </div>
              <div className={styles.buttons} style={{ textAlign: "center" }}>
                <button className={styles.verTodo}>
                  {/*<Link href={`/${this.props.titulo}`}>
                    Ver todo
                  </Link>*/}
                  <Link href="/Restaurant">
                    Ver todo
                  </Link>
                </button>
                <IconButton isRound={true} colorScheme='gray' onClick={this.previous}>
                  <ChevronLeft fontSize="large" />
                </IconButton>
                <IconButton isRound={true} colorScheme='gray' onClick={this.next}>
                  <ChevronRight fontSize="large" />
                </IconButton>
              </div>
            </div><Slider ref={c => (this.slider = c)} {...settings}>
              {this.props.objects.map((restaurant, index) => {
                return (
                  <div key={index}>
                    <Link href={`/Restaurant/${restaurant.id}`}> 
                      <div className={styles.item}>
                        <Image
                          src={restaurant.logo}
                          width={350}
                          height={175}
                          borderRadius={'5%'}
                          objectFit='contain'
                          fallbackSrc={'https://via.placeholder.com/350x175'} />
                        <div className={styles.info}>
                          <Text fontSize='xl' noOfLines={1}>{restaurant.name}</Text>
                          <Box display='flex' flexDirection='row' alignItems='flex-end'>
                            <StarRateRounded sx={{ color: "#ffc107" }} />
                            <Text>{restaurant.rating}</Text>
                          </Box> 
                        </div>
                      </div>
                    </Link>
                  </div>
                );
              })}
            </Slider>
          </>
        ):(
          <>
            <div className={styles.topConteiner}>
              <div className={styles.tittle}>
                <Heading as='h3' size='lg'>{this.props.titulo}</Heading>
              </div>
              <div className={styles.buttons} style={{ textAlign: "center" }}>
                <button className={styles.verTodo}>
                  {/*<Link href={`/${this.props.titulo}`}>
                    Ver todo
                  </Link>*/}
                  <Link href={{
                    pathname: '/Search',
                    query: { search: this.props.titulo }
                  }}>
                    Ver todo
                  </Link>
                </button>
                <IconButton isRound={true} colorScheme='gray' onClick={this.previous}>
                  <ChevronLeft fontSize="large" />
                </IconButton>
                <IconButton isRound={true} colorScheme='gray' onClick={this.next}>
                  <ChevronRight fontSize="large" />
                </IconButton>
              </div>
            </div>
            <Slider ref={c => (this.slider = c)} {...settings}>
              
              {this.props.objects && this.props.objects.map((item, index) => {
                return (
                  <div key={index}>
                    <Link href={{
                      pathname:`/Restaurant/${item.restaurantId}`,
                      query: { item: item.id }
                      }}
                    >
                      <div className={styles.item}>
                        <Image
                          src={item.marketingImg1}
                          width={350}
                          height={175}
                          borderRadius={'5%'}
                          objectFit='contain'
                          fallbackSrc={'https://via.placeholder.com/350x175'} 
                          />
                        <Text fontSize='xl' noOfLines={1}>{item.food}</Text>
                        <div className={styles.info}>
                          <Text fontSize='sm' noOfLines={1}>{item.restaurant}</Text>
                          <Text fontSize='md' align={'right'}>RD${item.price}</Text>
                        </div>
                      </div>
                    </Link>
                  </div>
                );
              })}
            </Slider></>
          )
        }
      </div>
    );
  }
}
