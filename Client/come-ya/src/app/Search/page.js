'use client'
import { useState, useEffect } from 'react';
import Apiservice from '@/Apiservice';
import styles from "./Search.module.css"
import { useSearchParams } from "next/navigation"
import { Card, CardBody, Heading, Text, Image, Stack, Box, Badge } from '@chakra-ui/react'
import Link from "next/link"
import { Pagination } from '@mui/material';
import { ThemeProvider, createTheme } from '@mui/material/styles';


export default function SearchedCategory(){
  const searchParams = useSearchParams();
  const search = searchParams.get('search');
  const [page, setPage] = useState(1);
  const [data,setData] = useState([])

  useEffect(() => {
    const fetchData = async () => {
      try {
        // Hacer la solicitud GET o POST según sea necesario
        const response = await Apiservice.get(`Items/Search?termino=${search}&page=${page}&pageSize=8`);
        console.log(response)
        setData(response);
        
        
       ;
      } catch (error) {
       // console.error("El error es",error);
      }
    };

    fetchData();
  }, [search, page]);
  
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

  
  const handleChange = (event, value) => {
    setPage(value);
  };
    
  return(
    <div className={styles.mainConteiner}>
        <div className={styles.tittle}>
            <Heading>Resultados de buscar "{search}"</Heading>
        </div>
        <div className={styles.searchConteiner}>
          {data.map((item, index) => {
            return(
              <div key={index}>
                <Link href={`/Restaurant/${item.restaurantId}`}>
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
                      src={item.image}
                      alt={`Imagen de ${item.name}`}
                    />
                    <Stack>
                      <CardBody>
                        <Box display='flex' justifyContent='space-between' alignItems='center'>
                          <Box>
                            <Heading size='md'>{item.name}</Heading>
                            <Text size='sm' as='i'>{item.restaurant}</Text>

                          </Box>
                          <Box display='flex' flexDirection='row' alignItems='center' gap={1}>
                            <Badge borderRadius='full' px='2' mr='2' colorScheme='teal'>
                              {item.category}
                            </Badge>
                            <Text py='2'>${item.price}</Text>
                            
                          </Box> 
                        </Box>
                        <Text py='2'>{item.description}</Text>
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