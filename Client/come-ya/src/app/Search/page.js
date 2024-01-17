'use client'
import { useState } from 'react';
import Apiservice from '@/Apiservice';
import styles from "./Search.module.css"
import { useSearchParams } from "next/navigation"
import { Card, CardBody, Heading, Text, Image, Stack, Box, Badge } from '@chakra-ui/react'
import Link from "next/link"
import { Pagination } from '@mui/material';
import { ThemeProvider, createTheme } from '@mui/material/styles';


export default function SearchedCategory(){
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

  const [page, setPage] = useState(1);
  const handleChange = (event, value) => {
    setPage(value);
  };

  const searchParams = useSearchParams();
  const search = searchParams.get('search');
  const result = [
    {
      id: 1,
      food: 'PAPA SUPER SUPREMA',
      category: 'vegana',
      description: 'Papas fritas crujientes, Queso fundido, Salsa rosada especial, pechuga de pollo, pierna de cerdo, tocineta y puerro.',
      price: 750,
      image:
        'https://images.unsplash.com/photo-1551782450-a2132b4ba21d',
      restaurant: 'La Barra (Atalaya)',
      restaurantId: 10,
    },
    {
      id: 2,
      food: 'Combo Mega Stacker',
      category: 'no vegetariana',
      description: 'Pan, doble carne whopper, tocino, queso y salsa stacker, acompañado de papas regular y Coca-Cola 500ml',
      price: 600,
      image:
        'https://images.unsplash.com/photo-1551963831-b3b1ca40c98e',
      restaurant: 'Burger King',
      restaurantId: 1,
    },
    {
      id: 3,
      food: 'Big Box Plus',
      category: 'no vegetariana',
      description: '1 Sandwich Doble Crunch + 1 Papa frita Peq + 1 Biscuit + 1 Pieza de pollo + 1 Refresco de botella Peq',
      price: 499.9,
      image:
        'https://images.unsplash.com/photo-1551963831-b3b1ca40c98e',
      restaurant: 'KFC',
      restaurantId: 5,
    },
    {
      id: 4,
      food: 'Ensalada César',
      category: 'vegetariana',
      description: 'Lechuga romana, crutones, queso parmesano y aderezo César. Añade pollo a la parrilla opcionalmente.',
      price: 350,
      image: 'https://images.unsplash.com/photo-1551782450-a2132b4ba21d',
      restaurant: 'Fresh Greens',
      restaurantId: 10,
    },
    {
      id: 5,
      food: 'Sushi Fusión',
      category: 'mariscos',
      description: 'Rollos de sushi variados con rellenos frescos y sabrosos. Acompañado de salsa de soja y jengibre encurtido.',
      price: 900,
      image: 'https://images.unsplash.com/photo-1667489022797-ab608913feeb?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxlZGl0b3JpYWwtZmVlZHw5fHx8ZW58MHx8fHw%3D&auto=format&fit=crop&w=800&q=60',
      restaurant: 'Sakura Sushi',
      restaurantId: 10,
    },
    {
      id: 6,
      food: 'Pizza Suprema',
      category: 'no vegetariana',
      description: 'Mozzarella, pepperoni, champiñones, aceitunas, jamón y salsa de tomate en una masa crujiente y deliciosa.',
      price: 550,
      image: 'https://images.unsplash.com/photo-1551782450-a2132b4ba21d',
      restaurant: 'Pizza Italia',
      restaurantId: 10,
    },
    {
      id: 7,
      food: 'Tacos Al Pastor',
      category: 'no vegetariana',
      description: 'Tacos de cerdo adobado con piña, cebolla y cilantro. ¡Auténtico sabor mexicano!',
      price: 180,
      image: 'https://images.unsplash.com/photo-1667489022797-ab608913feeb?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxlZGl0b3JpYWwtZmVlZHw5fHx8ZW58MHx8fHw%3D&auto=format&fit=crop&w=800&q=60',
      restaurant: 'Taquería El Rey',
      restaurantId: 10,
    },
    {
      id: 8,
      food: 'Wrap Vegano',
      category: 'vegana',
      description: 'Wrap relleno de verduras frescas, hummus, aguacate y aderezo de tahini. Acompañado de batatas fritas.',
      price: 480,
      image: 'https://images.unsplash.com/photo-1551963831-b3b1ca40c98e',
      restaurant: 'Green Bites',
      restaurantId: 10,
    },
    {
      id: 9,
      food: 'Ramen de Mariscos',
      category: 'mariscos',
      description: 'Sopa de ramen con caldo de mariscos, fideos, camarones, almejas y cebollín. ¡Una explosión de sabores!',
      price: 680,
      image: 'https://images.unsplash.com/photo-1551963831-b3b1ca40c98e',
      restaurant: 'Tokyo Ramen House',
      restaurantId: 10,
    },
    {
      id: 10,
      food: 'Hamburguesa BBQ',
      category: 'no vegetariana',
      description: 'Hamburguesa con carne a la parrilla, queso cheddar, cebolla caramelizada, tocino y salsa BBQ. Servida con papas fritas.',
      price: 620,
      image: 'https://images.unsplash.com/photo-1551963831-b3b1ca40c98e',
      restaurant: 'Smokehouse Grill',
      restaurantId: 10,
    },
    {
      id: 11,
      food: 'Burrito Vegetariano',
      category: 'vegetariana',
      description: 'Burrito relleno de frijoles, arroz, aguacate, pimientos y salsa fresca. ¡Una opción deliciosa y saludable!',
      price: 420,
      image: 'https://images.unsplash.com/photo-1551963831-b3b1ca40c98e',
      restaurant: 'Burritos Verdes',
      restaurantId: 10,
    },
    {
      id: 12,
      food: 'Sándwich de Pavo',
      category: 'no vegetariana',
      description: 'Sándwich con pechuga de pavo, queso suizo, lechuga, tomate y mostaza. Servido con papas al horno.',
      price: 380,
      image: 'https://images.unsplash.com/photo-1667489022797-ab608913feeb?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxlZGl0b3JpYWwtZmVlZHw5fHx8ZW58MHx8fHw%3D&auto=format&fit=crop&w=800&q=60',
      restaurant: 'Fresh Deli',
      restaurantId: 10,
    },
    {
      id: 14,
      food: 'Pollo a la Brasa',
      category: 'no vegetariana',
      description: 'Pollo entero asado a la brasa con papas doradas y salsa de ají amarillo. Acompañado de ensalada fresca.',
      price: 850,
      image: 'https://images.unsplash.com/photo-1551963831-b3b1ca40c98e',
      restaurant: 'La Barra (Atalaya)',
      restaurantId: 10,
    },
    {
      id: 15,
      food: 'Lomo Saltado',
      category: 'no vegetariana',
      description: 'Salteado de carne de res con cebolla, tomate, ají amarillo y papas fritas. Servido con arroz.',
      price: 780,
      image: 'https://images.unsplash.com/photo-1551963831-b3b1ca40c98e',
      restaurant: 'La Barra (Atalaya)',
      restaurantId: 10,
    },
    {
      id: 16,
      food: 'Whopper Doble',
      category: 'no vegetariana',
      description: 'Doble carne de res, queso, lechuga, tomate, cebolla, pepinillos y salsa de la casa en un pan suave con ajonjolí.',
      price: 680,
      image: 'https://images.unsplash.com/photo-1667489022797-ab608913feeb?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxlZGl0b3JpYWwtZmVlZHw5fHx8ZW58MHx8fHw%3D&auto=format&fit=crop&w=800&q=60',
      restaurant: 'Burger King',
      restaurantId: 1,
    },
    {
      id: 17,
      food: 'Nuggets de Pollo',
      category: 'no vegetariana',
      description: 'Porción de nuggets de pollo crujientes. Acompañados de salsa a elección: barbacoa, mostaza o miel.',
      price: 350,
      image: 'https://images.unsplash.com/photo-1551782450-a2132b4ba21d',
      restaurant: 'Burger King',
      restaurantId: 1,
    },
    {
      id: 18,
      food: 'Filete de Pescado',
      category: 'mariscos',
      description: 'Filete de pescado fresco empanizado y frito. Servido con papas fritas y salsa tártara.',
      price: 690,
      image: 'https://images.unsplash.com/photo-1667489022797-ab608913feeb?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxlZGl0b3JpYWwtZmVlZHw5fHx8ZW58MHx8fHw%3D&auto=format&fit=crop&w=800&q=60',
      restaurant: 'KFC',
      restaurantId: 5,
    },
    {
      id: 19,
      food: 'Wrap de Pollo',
      category: 'no vegetariana',
      description: 'Wrap de pollo a la parrilla con lechuga, tomate, queso cheddar y salsa ranchera. Acompañado de nachos.',
      price: 420,
      image: 'https://images.unsplash.com/photo-1551963831-b3b1ca40c98e',
      restaurant: 'KFC',
      restaurantId: 5,
    },
    {
      id: 20,
      food: 'Café Latte',
      category: 'bebidas',
      description: 'Café espresso con leche vaporizada y una fina capa de espuma. La opción perfecta para los amantes del café.',
      price: 180,
      image: 'https://images.unsplash.com/photo-1551963831-b3b1ca40c98e',
      restaurant: 'Starbucks',
      restaurantId: 10,
    },
    {
      id: 21,
      food: 'Frappuccino de Vainilla',
      category: 'bebidas',
      description: 'Mezcla cremosa de café, leche y hielo con esencia de vainilla. Decorado con crema batida y jarabe de vainilla.',
      price: 250,
      image: 'https://images.unsplash.com/photo-1667489022797-ab608913feeb?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxlZGl0b3JpYWwtZmVlZHw5fHx8ZW58MHx8fHw%3D&auto=format&fit=crop&w=800&q=60',
      restaurant: 'Starbucks',
      restaurantId: 10,
    },
    {
      id: 22,
      food: 'Subway Melt',
      category: 'no vegetariana',
      description: 'Submarino con pechuga de pavo, jamón, tocino, queso suizo, lechuga, tomate y aderezos a elección.',
      price: 540,
      image: 'https://images.unsplash.com/photo-1551963831-b3b1ca40c98e',
      restaurant: 'Subway',
      restaurantId: 10,
    },
    {
      id: 23,
      food: 'Ensalada Veggie Delight',
      category: 'vegetariana',
      description: 'Ensalada fresca con lechuga, espinaca, tomate, pepino, pimientos y aderezo a elección. Opción saludable y deliciosa.',
      price: 320,
      image: 'https://images.unsplash.com/photo-1667489022797-ab608913feeb?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxlZGl0b3JpYWwtZmVlZHw5fHx8ZW58MHx8fHw%3D&auto=format&fit=crop&w=800&q=60',
      restaurant: 'Subway',
      restaurantId: 10,
    },
  ];
    
  return(
    <div className={styles.mainConteiner}>
        <div className={styles.tittle}>
            <Heading>Resultados de buscar "{search}"</Heading>
        </div>
        <div className={styles.searchConteiner}>
          {result.map((item, index) => {
            return(
              <div key={index}>
                <Link href={`/Restaurant/${item.id}`}>
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
                      objectFit='cover'
                      maxW={{ base: '100%', sm: '200px' }}
                      src={item.image}
                      alt={`Imagen de ${item.Name}`}
                    />
                    <Stack>
                      <CardBody>
                        <Box display='flex' justifyContent='space-between' alignItems='center'>
                          <Box>
                            <Heading size='md'>{item.food}</Heading>
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