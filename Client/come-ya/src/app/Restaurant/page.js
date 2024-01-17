"use client"
import { useState, useEffect } from 'react';
import { Card, CardBody, Heading, Text, Image, Stack, Box } from '@chakra-ui/react'
import styles from "./Restaurant.module.css"
import { StarRateRounded } from "@mui/icons-material"
import Link from "next/link"
import Apiservice from '@/Apiservice';
import { Pagination } from '@mui/material';
import { ThemeProvider, createTheme } from '@mui/material/styles';

const restaurantes = [
    {
      Id: 1,
      Name: "Burger King",
      Logo: "https://images.unsplash.com/photo-1551782450-a2132b4ba21d",
      Description: "Burger King es una cadena de restaurantes de comida rápida que se especializa en hamburguesas y otros productos similares.  Actualmente, Burger King es la segunda cadena de hamburguesas más grande de los Estados Unidos.",
      Rating: 4.5,
    },
    {
      Id: 2,
      Name: "McDonald's",
      Logo: "https://images.unsplash.com/photo-1551782450-a2132b4ba21d",
      Description: "Burger King es una cadena de restaurantes de comida rápida que se especializa en hamburguesas y otros productos similares.  Actualmente, Burger King es la segunda cadena de hamburguesas más grande de los Estados Unidos.",
      Rating: 4.2,
    },
    {
      Id: 3,
      Name: "Pizza Hut",
      Logo: "https://images.unsplash.com/photo-1551782450-a2132b4ba21d",
      Description: "Pizza Hut es una cadena internacional de restaurantes de pizzas y comida italiana. Ofrece una variedad de pizzas, pasta, ensaladas y otros platos deliciosos.",
      Rating: 4.9,
    },
    {
      Id: 4,
      Name: "Starbucks",
      Logo: "https://images.unsplash.com/photo-1551963831-b3b1ca40c98e",
      Description: "Starbucks es una cadena global de cafeterías que ofrece una amplia variedad de bebidas a base de café, té, y aperitivos. Es conocida por su ambiente acogedor y café de alta calidad.",
      Rating: 4.7,
    },
    {
      Id: 4.0,
      Name: "Subway",
      Logo: "https://images.unsplash.com/photo-1551963831-b3b1ca40c98e",
      Description: "Subway es una cadena de restaurantes especializada en la venta de sándwiches y ensaladas. Es conocida por su opción de personalizar los sándwiches según las preferencias del cliente.",
      Rating: 4.1,
    },
    {
      Id: 5,
      Name: "KFC, Kentucky Fried Chicken ffffffffffff fffffffff",
      Logo: "https://images.unsplash.com/photo-1667489022797-ab608913feeb?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxlZGl0b3JpYWwtZmVlZHw5fHx8ZW58MHx8fHw%3D&auto=format&fit=crop&w=800&q=60",
      Description: "KFC, Kentucky Fried Chicken, es una cadena de restaurantes de comida rápida especializada en pollo frito. Sus recetas originales y crujientes son muy populares en todo el mundo.",
      Rating: 4.3,
    },
    {
      Id: 6,
      Name: "Domino's Pizza",
      Logo: "https://images.unsplash.com/photo-1667489022797-ab608913feeb?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxlZGl0b3JpYWwtZmVlZHw5fHx8ZW58MHx8fHw%3D&auto=format&fit=crop&w=800&q=60",
      Description: "Domino's Pizza es una cadena de pizzerías conocida por su entrega rápida y su variedad de pizzas. Ofrece opciones de personalización y entrega a domicilio.",
      Rating: 2.9,
    },
    {
      Id: 7,
      Name: "Taco Bell",
      Logo: "https://images.unsplash.com/photo-1667489022797-ab608913feeb?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxlZGl0b3JpYWwtZmVlZHw5fHx8ZW58MHx8fHw%3D&auto=format&fit=crop&w=800&q=60",
      Description: "Taco Bell es una cadena de restaurantes de comida rápida especializada en comida tex-mex, como tacos, burritos y nachos. Es conocida por su menú sabroso y asequible.",
      Rating: 4.0,
    },
    {
      Id: 8,
      Name: "Starbucks",
      Logo: "https://images.unsplash.com/photo-1667489022797-ab608913feeb?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxlZGl0b3JpYWwtZmVlZHw5fHx8ZW58MHx8fHw%3D&auto=format&fit=crop&w=800&q=60",
      Description: "Starbucks es una cadena global de cafeterías que ofrece una amplia variedad de bebidas a base de café, té y aperitivos. Es conocida por su ambiente acogedor y café de alta calidad.",
      Rating: 4.7,
    },
    {
      Id: 9,
      Name: "Dunkin'",
      Logo: "https://images.unsplash.com/photo-1667489022797-ab608913feeb?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxlZGl0b3JpYWwtZmVlZHw5fHx8ZW58MHx8fHw%3D&auto=format&fit=crop&w=800&q=60",
      Description: "Dunkin' es una cadena de cafeterías y donas conocida por sus cafés, donas y productos horneados. Ofrece una selección variada de bebidas y opciones para el desayuno.",
      Rating: 3.2,
    },
    {
      Id: 10,
      Name: "Chick-fil-A",
      Logo: "https://images.unsplash.com/photo-1667489022797-ab608913feeb?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxlZGl0b3JpYWwtZmVlZHw5fHx8ZW58MHx8fHw%3D&auto=format&fit=crop&w=800&q=60",
      Description: "Chick-fil-A es una cadena de restaurantes de comida rápida especializada en pollo. Es famosa por sus sándwiches de pollo y opciones de menú de alta calidad.",
      Rating: 4.6,
    },
]

export default function Restaurants() {
  const [page, setPage] = useState(1);

  const handleChange = (event, value) => {
    setPage(value);
  };

  const [data, setData] = useState([]);
  var params ={page: page, pageSize: 8 }
    useEffect(() => {
      const fetchData = async () => {
        try {
          // Hacer la solicitud GET o POST según sea necesario
          const response = await Apiservice.get('Restaurants',params);

  
          // Puedes hacer más acciones según tus necesidades
          setData(response);
        } catch (error) {
          console.error('Error al obtener datos:', error);
        }
      };
  
      fetchData();
    }, [params]);
  let theme = createTheme({
    palette: {
      primary: {
        main: '#C62828',
      },
      secondary: {
        main: '#C62828',
      },
    },
  });

  


  return(
    <div className={styles.mainConteiner}>
      <div className={styles.tittle}>
        <Heading>Restaurantes</Heading>
      </div>
      <div className={styles.restaurantsGrid}>
        {data.map((restaurant, index) => {
          return(
            <div key={index}>
              <Link href={`/Restaurant/${restaurant.id}`}>
                <Card
                  direction={{ base: 'column', sm: 'row' }}
                  overflow='hidden'
                  variant='elevated'
                  transition="box-shadow 0.3s ease-in-out"
                  _hover={{
                    boxShadow: 'lg', // Aumenta la sombra en el hover
                  }}
                >
                  <Image
                    objectFit='contain'
                    maxW={{ base: '100%', sm: '200px' }}
                    src={restaurant.logo}
                    alt={`Imagen de ${restaurant.logo}`}
                  />
                  <Stack>
                    <CardBody>
                      <Box display='flex' justifyContent='space-between' alignItems='center'>
                        <Heading size='md'>{restaurant.name}</Heading>
                        <Box display='flex' flexDirection='row' alignItems='center'>
                          <StarRateRounded sx={{ color: "#ffc107" }} />
                          <Text py='2'>{restaurant.rating}</Text>
                        </Box> 
                      </Box>
                      <Text py='2'>{restaurant.description}</Text>
                    </CardBody>
                  </Stack>
                </Card>
              </Link>
            </div>
          )
        })}
      </div>
      <Box mt={6}>
        <ThemeProvider theme={theme}><Pagination count={10} page={page} onChange={handleChange} color='error'/></ThemeProvider>
      </Box>
    </div>
  )
}