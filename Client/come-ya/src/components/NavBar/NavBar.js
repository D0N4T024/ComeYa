"use client"
import { useState, useEffect } from 'react';
import styles from './NavBar.module.css'
import Link from 'next/link'
import * as React from 'react';
import Box from '@mui/system/Box';
import { Stack, TextField, IconButton, Badge, Tooltip, Button, Menu, MenuItem } from '@mui/material';
import OpenModal from '../OpenModal/OpenModal';
import { ChakraProvider, Heading } from '@chakra-ui/react'
import Paper from '@mui/material/Paper';
import InputBase from '@mui/material/InputBase';
import Autocomplete from '@mui/material/Autocomplete';
import ShoppingCartOutlinedIcon from '@mui/icons-material/ShoppingCartOutlined';
import SearchIcon from '@mui/icons-material/Search';
import ThemeSwitcher from '../ThemeSwitcher/ThemeSwitcher';
import CloseRounded from '@mui/icons-material/CloseRounded';
import { MoreVert } from '@mui/icons-material';
import { useRouter } from 'next/navigation';

function notificationsLabel(count) {
  if (count === 0) {
    return 'no notifications';
  }
  if (count > 99) {
    return 'more than 99 notifications';
  }
  return `${count} notifications`;
}

export default function NavBar(){

  //Objetos de ejemplo
  const top100Films = [
    { title: 'The Shawshank Redemption', year: 1994 },
    { title: 'The Godfather', year: 1972 },
    { title: 'The Godfather: Part II', year: 1974 },
    { title: 'The Dark Knight', year: 2008 },
    { title: '12 Angry Men', year: 1957 },
    { title: "Schindler's List", year: 1993 },
    { title: 'Pulp Fiction', year: 1994 },
  ];

  const cart = [
    {
      "id": 43,
      "name": "Rollito Playbe",
      "description": null,
      "price": 395,
      "quantity": 3,
      "amount": 1398.3,
      "image": "https://imgur.com/FXd7EJm.png"
    },
    {
      "id": 45,
      "name": "David Sakayama",
      "description": null,
      "price": 795,
      "quantity": 4,
      "amount": 3752.4,
      "image": "https://imgur.com/wS6xKn9.png"
    },
    {
      "id": 46,
      "name": "Pokesemeimpolta",
      "description": null,
      "price": 475,
      "quantity": 3,
      "amount": 1681.5,
      "image": "https://imgur.com/qlePTJy.png"
    },
  ]

  const [cartItemsCounter, setCartItemsCounter] = useState(0);

  const [searchValue, setSearchValue] = useState('');

  const [anchorEl, setAnchorEl] = React.useState(null);
  const open = Boolean(anchorEl);
  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };
  const handleLogOut = () => {
    setAnchorEl(null);
  };



  useEffect (() => {
    setCartItemsCounter(cart.reduce((accumulator, currentValue) => accumulator + currentValue.quantity, 0))
  },[cart])

  const router = useRouter();

  const handleSearch = () => {
    // Lógica para realizar la búsqueda con searchValue
    // llamar a una API, filtrar datos, etc.
    alert(`Realizar búsqueda con: ${searchValue}`);
    router.push(`/Search/${searchValue}`);
  };

  const handleClear = () => {
    // Limpiar el valor de búsqueda
    setSearchValue('');
  };

  return(
    <nav className={styles.nav}>
      <Box className={styles.navLeft}>
        <Box className={styles.logo}>
          <Link href='/'>
            <img className={styles.imgLogo} src='imagenes/ComeYa-icono.png'>
            </img>
          </Link>
          <Heading>ComeYa</Heading>

          <Paper variant="filled"
            component="form"
            sx={{ p: '1px 4px', display: 'flex', alignItems: 'center', minWidth: '30vw', backgroundColor: '#E5E5E5'}}
          >
            <InputBase
              value={searchValue}
              onChange={(e) => setSearchValue(e.target.value)}
              sx={{ ml: 1, flex: 1 }}
              placeholder="Buscar..."
              inputProps={{ 'aria-label': 'search' }}
            />
            <IconButton type="button" sx={{ p: '10px' }} aria-label="clear" onClick={handleClear}>
              <CloseRounded />
            </IconButton>
            { searchValue === '' ? (
              <IconButton type="button" sx={{ p: '10px' }} aria-label="search">
                <SearchIcon />
              </IconButton>
            ):(
              <Link href={{
                pathname: '/Search',
                query: {search: searchValue}
              }}>
                <IconButton type="button" sx={{ p: '10px' }} aria-label="search">
                  <SearchIcon />
                </IconButton>
              </Link>
            )}
          </Paper>
        </Box>
      </Box>
      <Box className={styles.navRight}>
        <Stack direction="row" spacing={2}>
          <Link href={'/ShoppingCart'}>
            <IconButton aria-label={notificationsLabel(cartItemsCounter)}>
              <Badge badgeContent={cartItemsCounter} color="error">
                <ShoppingCartOutlinedIcon color="error"/>
              </Badge>
            </IconButton>
          </Link>
          <ChakraProvider><ThemeSwitcher /></ChakraProvider>
          <OpenModal //Para el prop WhatButton, si se pone "SignIn" es para el boton de Iniciar Sesion, sino es para Registrarse
          whatButton="SignIn"
          />
          <OpenModal 
          whatButton="SignUp"
          />
          <div>
            <IconButton 
              id="basic-button"
              aria-controls={open ? 'basic-menu' : undefined}
              aria-haspopup="true"
              aria-expanded={open ? 'true' : undefined}
              onClick={handleClick}
      
            >
              <MoreVert color='error' />
            </IconButton>
            <Menu
              id="basic-menu"
              anchorEl={anchorEl}
              open={open}
              onClose={() => setAnchorEl(null)}
              MenuListProps={{
                'aria-labelledby': 'basic-button',
              }}
            >
              <Link href='/Account/OrdersHistory'>
                <MenuItem onClick={() => setAnchorEl(null)}>Historial de ordenes</MenuItem>
              </Link>
              <MenuItem onClick={handleLogOut}>Cerrar Sesión</MenuItem>
            </Menu>
          </div>
          
        </Stack>
      </Box>
    </nav>
  )
}