'use client'
import styles from "./ShoppingCart.module.css"
import { useState, useEffect } from 'react';
import Apiservice from "@/Apiservice";
import { Card, CardBody, Heading, Text, Box, Image, Button } from '@chakra-ui/react'
import { FormControl, Select, MenuItem, Pagination } from '@mui/material'
import { ThemeProvider, createTheme } from '@mui/material/styles';
import ProductionQuantityLimitsRoundedIcon from '@mui/icons-material/ProductionQuantityLimitsRounded';
import Link from 'next/link'

const ShoppingCart = () => {
  const [page, setPage] = useState(1);

  const handleChange = (event, value) => {
    setPage(value);
  };

  const handleClick = async () => {
    try {
      const response = await Apiservice.post(`Cart/PurchaseOrderStripe`);
      const url = response; // Asegúrate de obtener la URL correctamente desde la respuesta

      // Navegar a la URL después de obtenerla
      window.location.href = url;
    } catch (error) {
      // Manejar errores si es necesario
      console.error('Error al obtener la URL de compra:', error);
    }
  };
 

  const [cartState, setCartState] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await Apiservice.get(`Cart/CartItems?page=1`);
        if (response && Array.isArray(response)) {
          setCartState(response);
        } else {
          setCartState([]); // Asigna un array vacío si la respuesta no es un array
        }
      } catch (error) {
        console.error('Error al obtener datos:', error);
        // Manejar errores aquí si es necesario
      }
    };

    fetchData();
  }, []);

  useEffect(() => {
    // Este efecto se ejecutará cada vez que cartState cambie
    console.log('Carrito actualizado:', cartState);
  }, [cartState]);
  
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

  const [cartItemsCounter, setCartItemsCounter] = useState(0);
  const [cartItemsSubtotal, setCartItemsSubtotal] = useState(0);

  useEffect (() => {
    setCartItemsCounter(cartState.reduce((itemCounter, item ) => itemCounter + item.quantity, 0))
    setCartItemsSubtotal(cartState.reduce((itemSubtotal, item) => itemSubtotal + item.amount, 0))
  },[cartState])


  const deleteItem = async (itemId) =>{
    
    try {
      
      //console.log(itemId)
      const response = await Apiservice.delete(`Cart/DeleteItem?itemId=${itemId}`);
      console.log(response);
      
    } catch (error) {
      console.error('Error al registrar usuario:', error);
      
      
    }
  }
  const handleQuantityChange = (id, quantity) => {
    // Utiliza map para crear un nuevo array con los cambios
    const updatedCart = cartState.map(item => {
      // Verifica si este es el objeto que deseas actualizar
      if (item.id === id) {
        // Crea un nuevo objeto con la cantidad actualizada y retorna
        const updatedItem = {
          ...item,
          quantity: quantity,
          amount: item.price * quantity, // Actualiza el valor de 'amount'
        };
        return updatedItem;
      }
      // Si no es el objeto que deseas actualizar, retorna el objeto sin cambios
      return item;
      
    });

    // Actualiza el estado con el nuevo array
    setCartState(updatedCart);
  };

  return(
    <div className={styles.mainConteiner}>
      <div className={styles.tittle}>
        <Heading>Carrito de compras</Heading>
      </div>
      <div className={styles.cartConteiner}>
        {cartState.map((item, index) => {
          return(
            <div key={index}>
              { item.quantity > 0 ? (
                <Card
                  direction={{ base: 'column', sm: 'row' }}
                  overflow='hidden'
                  variant='elevated'
                >
                  <Image
                    objectFit='contain'
                    maxW={{ base: '100%', sm: '200px' }}
                    src={item.image}
                    alt={`Imagen de ${item.name}`}
                  />
                  <CardBody>
                    <Box display='flex' justifyContent='space-between'>
                      <Box>
                          <Heading size='xs' textTransform='uppercase'>{item.name}</Heading>
                          <Box display='flex' justifyContent='flex-start' alignItems='center' gap={2} >
                            <ThemeProvider theme={theme}>
                              <FormControl sx={{ m: 1, minWidth: 50}} size="small" error>
                                <Select
                                  style={{ color: '#C62828' }}
                                  value={item.quantity}
                                  displayEmpty
                                  onChange={(event) => handleQuantityChange(item.id, event.target.value)}
                                  inputProps={{ 'aria-label': 'Without label' }}
                                >
                                  {[1, 2, 3, 4, 5, 6, 7, 8, 9].map((value) => (
                                    <MenuItem key={value} value={value}>
                                      Cant. {value}
                                    </MenuItem>
                                  ))}
                                </Select>
                              </FormControl>
                            </ThemeProvider>
                            <button onClick={(event) => {handleQuantityChange(item.id, 0)
                            deleteItem(item.id)}}>Eliminar</button>
                          </Box>
                      </Box>
                      <Box >
                        <Heading size='sm' >${item.price}</Heading>
                      </Box> 
                    </Box>
                  </CardBody>
                </Card>
              ):(null)}
            </div>
          )
        })}
        {cartItemsCounter !== 0 ? (
          <Box display='flex' alignItems='flex-end' flexDirection='column'>
            <Heading size='sm' my={4}>Subtotal ({cartItemsCounter} productos): ${cartItemsSubtotal.toFixed(2)} </Heading>
            <Button
              mt={4}
              backgroundColor='yellow.400'
              colorScheme='yellow'
              width={'100%'}
              p={6}
              onClick={handleClick}
            >
              PROCESAR COMPRA
            </Button> 
            <Box mt={6} alignSelf='center'>
              <ThemeProvider theme={theme}><Pagination count={10} page={page} onChange={handleChange} color='error'/></ThemeProvider>
            </Box>
          </Box>
        ):(
          <Box display='flex' flexDirection='column' justifyContent='center' alignItems='center'>
            <ProductionQuantityLimitsRoundedIcon sx={{ fontSize: 200, color: '#BDBDBD' }} />
            <Text size='sm' my={4}>Tu carrito esta vacio, haz click para <Link href={'/'} style={{textDecoration: 'underline'}}>continuar viendo</Link></Text>
          </Box>
        )}
      </div>
    </div>
  )
}

export default ShoppingCart