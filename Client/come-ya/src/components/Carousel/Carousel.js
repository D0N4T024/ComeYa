"use client"
import { Heading, Text,  Image, IconButton } from '@chakra-ui/react'
import { ChevronLeft, ChevronRight, StarRateRounded } from '@mui/icons-material';
import { Box } from '@mui/material';
import Link from 'next/link';
import React, { Component } from "react";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css"; 
import "slick-carousel/slick/slick-theme.css";
import styles from './Carousel.module.css'

export default class Carousel extends Component {
  
  constructor(props) {
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
                      //query: { item: item.id }
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
