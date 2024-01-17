"use client"
import { Image, Heading, Text, Button, useToast } from '@chakra-ui/react'
import styles from './ProductView.module.css'
import {AddShoppingCartIcon, FormControl, Select, MenuItem, Box }  from '@mui/material'
import { ThemeProvider, createTheme } from '@mui/material/styles';
import { useState } from 'react'

const ProductView = ({ onClose, ...props }) => {
  const toast = useToast()
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
  const [quantity, setQuantity] = useState(1);
  const handleChange = (event) => {
      setQuantity(event.target.value);
  };
  const onSubmit = () => {
    toast({
      title: 'Account created.',
      description: "We've created your account for you.",
      status: 'success',
      variant: "subtle",
      position: "top-right",
      duration: 8000,
    })
    onClose();
  }
  return (
      <div className={styles.content}>
        <Box display={'flex'} justifyContent={'center'} alignContent={'center'} width={'100%'}>
          <Image 
            src={props.image}
            width={400}
            height={400}
            objectFit='contain'
          />
        </Box>
          <div>
              <Heading as='h3' size='lg'>{props.food}</Heading>
              <Heading mb={4} as='h4' size='md' color='yellow.600'>RD${props.price}</Heading>
              <Text mb={4}>{props.description}</Text>
              <ThemeProvider theme={theme}>
                  <FormControl sx={{ m: 1, minWidth: 50 }}>
                      <Select
                      value={quantity}
                      onChange={handleChange}
                      displayEmpty
                      inputProps={{ 'aria-label': 'Without label' }}
                      >
                        {[1, 2, 3, 4, 5, 6, 7, 8, 9].map((value) => (
                          <MenuItem key={value} value={value}>
                            {value}
                          </MenuItem>
                        ))}
                      </Select>
                  </FormControl>
              </ThemeProvider>
              <Button mt={4} backgroundColor='yellow.400' colorScheme='yellow' width={'100%'} p={6} onClick={onSubmit}>Agregar al carrito</Button>
          </div>
      </div>
  )
}

export default ProductView;