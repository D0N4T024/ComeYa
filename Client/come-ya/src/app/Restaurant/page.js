"use client"
import { useState, useEffect } from 'react';
import { Card, CardBody, Heading, Text, Image, Stack, Box } from '@chakra-ui/react'
import styles from "./Restaurant.module.css"
import { StarRateRounded } from "@mui/icons-material"
import Link from "next/link"
import Apiservice from '@/Apiservice';
import { Pagination } from '@mui/material';
import { ThemeProvider, createTheme } from '@mui/material/styles';

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
          //console.error('Error al obtener datos:', error);
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