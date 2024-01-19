"use client"
import { useState, useEffect } from 'react';
import styles from './NavBar.module.css'
import Link from 'next/link'
import * as React from 'react';
import Box from '@mui/system/Box';
import { Stack, IconButton, Badge, Menu, MenuItem } from '@mui/material';
import OpenModal from '../OpenModal/OpenModal';
import { ChakraProvider, Image } from '@chakra-ui/react'
import Paper from '@mui/material/Paper';
import InputBase from '@mui/material/InputBase';
import ShoppingCartOutlinedIcon from '@mui/icons-material/ShoppingCartOutlined';
import SearchIcon from '@mui/icons-material/Search';
import ThemeSwitcher from '../ThemeSwitcher/ThemeSwitcher';
import CloseRounded from '@mui/icons-material/CloseRounded';
import { MoreVert } from '@mui/icons-material';
import { useRouter } from 'next/navigation';
import Apiservice from '@/Apiservice';

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



  const router = useRouter();

  const [cartItemsCounter, setCartItemsCounter] = useState(0);

  const [cartState, setCartState] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await Apiservice.get(`Cart/CartItems`);
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


  const isAuthenticated = () => {
    const token = localStorage.getItem('token');
  return token !== null && token !== undefined && token !== '';
  };

  const [autenticado, setAutenticado] = useState(isAuthenticated());

  useEffect(() => {
    // Verificar la autenticación cuando el componente se monta
    setAutenticado(isAuthenticated());
  }, []);

  useEffect (() => {
    setCartItemsCounter(cartState.reduce((accumulator, currentValue) => accumulator + currentValue.quantity, 0))
  },[cartState])






  const [searchValue, setSearchValue] = useState('');

  const [anchorEl, setAnchorEl] = React.useState(null);
  const open = Boolean(anchorEl);
  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };
  const handleLogOut = () => {
    localStorage.removeItem('token');
    setAnchorEl(null);
  };

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
            <Image 
              src='imagenes/ComeYa-logoNewFont.jpg'
              width={45}
              height={45}
              borderRadius={'5%'}
              objectFit='cover'
              fallbackSrc={'https://via.placeholder.com/45x45'} />
              
          </Link>
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
          { autenticado === true ? (
            <>
              <Link href={'/ShoppingCart'}>
                <IconButton aria-label={notificationsLabel(cartItemsCounter)}>
                  <Badge badgeContent={cartItemsCounter} color="error">
                    <ShoppingCartOutlinedIcon color="error"/>
                  </Badge>
                </IconButton>
              </Link>
              <ChakraProvider><ThemeSwitcher /></ChakraProvider>
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
            </>
          ):(
            <>
              <ChakraProvider><ThemeSwitcher /></ChakraProvider>
              <OpenModal //Para el prop WhatButton, si se pone "SignIn" es para el boton de Iniciar Sesion, sino es para Registrarse
                whatButton="SignIn"
              />
              <OpenModal 
                whatButton="SignUp"
              />
            </>
          )}
        </Stack>
      </Box>
    </nav>
  )
}