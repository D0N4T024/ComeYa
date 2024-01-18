"use client"
import LoadingPage from '@/app/loading';
import { useState, useEffect} from 'react'
import styles from './RestaurantName.module.css'
import { Image, Heading, Text, Box, Card, Badge } from '@chakra-ui/react'
import PropTypes from 'prop-types';
import Slider from '@mui/material/Slider';
import { styled } from '@mui/material/styles';
import Tooltip from '@mui/material/Tooltip';
import { FormControlLabel, Checkbox } from '@mui/material';
import { StarRateRounded, Replay } from "@mui/icons-material"
import CloseRoundedIcon from '@mui/icons-material/CloseRounded';
import { ThemeProvider, createTheme } from '@mui/material/styles';
import WindowDimensions from '../../../components/WindowDimensions/WindowDimensions'
import stylesModal from '../../../components/OpenModal/OpenModal.module.css'
import ProductView from '../../../components/ProductView/ProductView';
import { useSearchParams } from 'next/navigation';
import Apiservice from '@/Apiservice';



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


function ValueLabelComponent(props) {
  const { children, value } = props;

  return (
    <Tooltip enterTouchDelay={0} placement="top" title={value}>
      {children}
    </Tooltip>
  );
}

ValueLabelComponent.propTypes = {
  children: PropTypes.element.isRequired,
  value: PropTypes.number.isRequired,
};

const iOSBoxShadow =
  '0 3px 1px rgba(0,0,0,0.1),0 4px 8px rgba(0,0,0,0.13),0 0 0 1px rgba(0,0,0,0.02)';

const marks = [
  {
    value: 0,
    label: '$100'
  },
  {
    value: 33.3,
    label: '$400'
  },
  {
    value: 66.6,
    label: '$700'
  },
  {
    value: 100,
    label: '$1000+'
  },
];

const IOSSlider = styled(Slider)(({ theme }) => ({
  height: 2,
  padding: '15px 0',
  '& .MuiSlider-thumb': {
    height: 28,
    width: 28,
    backgroundColor: '#fff',
    boxShadow: iOSBoxShadow,
    '&:focus, &:hover, &.Mui-active': {
      boxShadow:
        '0 3px 1px rgba(0,0,0,0.1),0 4px 8px rgba(0,0,0,0.3),0 0 0 1px rgba(0,0,0,0.02)',
      '@media (hover: none)': {
        boxShadow: iOSBoxShadow,
      },
    },
  },
  '& .MuiSlider-valueLabel': {
    lineHeight: 1.2,
    fontSize: 12,
    background: 'unset',
    padding: 0,
    width: 32,
    height: 32,
    borderRadius: '50% 50% 50% 0',
    backgroundColor: '#C62828',
    transformOrigin: 'bottom left',
    transform: 'translate(50%, -100%) rotate(-45deg) scale(0)',
    '&::before': { display: 'none' },
    '&.MuiSlider-valueLabelOpen': {
      transform: 'translate(50%, -100%) rotate(-45deg) scale(1)',
    },
    '& > *': {
      transform: 'rotate(45deg)',
    },
  },
  '& .MuiSlider-track': {
    border: 'none',
  },
  '& .MuiSlider-rail': {
    opacity: 0.5,
    backgroundColor: '#bfbfbf',
  },
  '& .MuiSlider-mark': {
    backgroundColor: '#bfbfbf',
    height: 8,
    width: 1,
    '&.MuiSlider-markActive': {
      opacity: 1,
      backgroundColor: 'currentColor',
    },
  },
}));

export default function RestaurantMenu({params}) {

  const defaultFilters = {
    sliderValue: 100,
    category: {
      cafe: "",
      refresco: "",
      postre: "",
      vegana: "",
    },
    food: {
      nuggets: "",
      hamburguesa: "",
    },
  };
  
  const [restaurant, setData] = useState();
  const [restItems, setItems] = useState([]);
  const [sliderValue, setSliderValue] = useState(defaultFilters.sliderValue);
  const [category, setCategory] = useState(defaultFilters.category);
  const [food, setFood] = useState(defaultFilters.food);
  const [parameters, setParameters] = useState({
    restaurant: parseInt(params.RestaurantId),
    category:"",
    food: ""
  })

  //console.log(params);
    useEffect(() => {
      //console.log(params)
      const fetchData = async () => {
        try {
          // Hacer la solicitud GET o POST según sea necesario
          const response = await Apiservice.get(`Restaurants/${params.RestaurantId}`);
          
          setData(response);
          const response2 = await Apiservice.get(Items/AllItems,parameters);
          //sconsole.log(response2)
          //console.log('Respuesta:', response);  
          setItems(response2)
        
          // Puedes hacer más acciones según tus necesidades
         ;
        } catch (error) {
          console.error('Error al obtener datos:', error);
         // console.error("El error es",error);
        }
      };
  
      fetchData();
    }, [params.RestaurantId,parameters]);

  const openModal = (item) => {
    setProductInfo(item);
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
  };

  

  const Modal = ({ isOpen, onClose, ...props }) => {
    const handleContainerClick = (e) => {
      // Verificar si el clic se realizó fuera del contenido del modal
      if (e.target.classList.contains(styles.modalOverlay)) {
        onClose();
      }
    };

    return (
      <>
        {isOpen && (
          <div className={stylesModal.modalOverlay} onClick={handleContainerClick}>
            <div className={stylesModal.modal}>
              <button><CloseRoundedIcon onClick={onClose}/></button>
              <ProductView {...productInfo} onClose={onClose}/>
            </div>
          </div>
        )}
      </>
    );
  };

  const handlePriceChange = (event, newValue) => {
    setSliderValue(newValue); // Actualiza el estado del slider
  };

  const handleCategoryChange = (categoryName) => {
    setCategory((prevCategory) => ({
      ...prevCategory,
      [categoryName]: prevCategory[categoryName] === categoryName ? "" : categoryName,
    }));
  };

  const handleFoodChange = (foodName) => {
    setFood((prevFood) => ({
      ...prevFood,
      [foodName]: prevFood[foodName] === foodName ? "" : foodName,
    }));
  };

  const resetFilters = () => {
    setSliderValue(defaultFilters.sliderValue);
    setCategory(defaultFilters.category);
    setFood(defaultFilters.food);
  };

  //const restaurant = restaurantes.find(item => item.Id == params.RestaurantId);

  const searchParams = useSearchParams();
  const id = searchParams.get('item');
  let itemId;
  let itemObject;
  let modalState;
  let info = {};
  if (id !== null) {
    itemId = id;
    //Busca el primer objeto con id coincidente al traido desde el homePage
    itemObject = restItems.find(item => item.id == itemId);
    
    // Inicializacion de estados de haber query
    modalState = true;
    info = itemObject;
    
  } else {
    modalState = false;
    info = {};
  }
 console.log(info)
  const [isModalOpen, setIsModalOpen] = useState(modalState);

  const [productInfo, setProductInfo] = useState(info);

  const windowDimensions = WindowDimensions();
  if (!restaurant) {
    // Mientras se carga la data, puedes mostrar un indicador de carga o cualquier otra cosa
    return <LoadingPage/>;
  }
  return(
    <div className={styles.mainConteiner}>
      <Modal isOpen={isModalOpen} onClose={closeModal} />
          <Image 
            src={restaurant.background}
            width='100vw'
            height={400}
            objectFit='cover'
            fallbackSrc={`https://via.placeholder.com/${windowDimensions.width}x200`}
          />
          <div className={styles.tittle}>
            {restaurant ? (
              <>
                <Heading justifyContent={"flex-start"}>{restaurant.name}</Heading>
                <Box display='flex' flexDirection='row' alignItems='center'>
                  <StarRateRounded sx={{ color: "#ffc107" }} />
                  <Text py='2'>{restaurant.rating}</Text>
                </Box> 
              </>
            ):null}
          </div>
          <Box className={styles.bodyConteiner} flexDirection={{ base: 'column', sm: 'row' }}>
              <div className={styles.filter}>
                <Box display={'flex'} justifyContent={'flex-end'}>
                  <ThemeProvider theme={theme}>
                    {/Boton de reestablecer filtros/}
                    <Tooltip title="Reestablecer" placement='top' arrow>
                      <button onClick={resetFilters}>
                        <Replay sx={{ color: '#C62828' }} />
                      </button>
                    </Tooltip>
                  </ThemeProvider>
                </Box>
                <Heading as='h4' size='md'>Precios</Heading>
                  <div className={styles.slider}>
                    <ThemeProvider theme={theme}>
                      <IOSSlider
                        aria-label="ios slider"
                        defaultValue={100}
                        value={sliderValue}
                        onChange={handlePriceChange}
                        step={33.4}
                        marks={marks}
                        valueLabelDisplay="off"
                      />
                      {console.log(sliderValue)}
                    </ThemeProvider>
                  </div>
                <Heading as='h4' size='md'>Categorias</Heading>
                <ThemeProvider theme={theme}>
                  {/Aqui van las categorias de comida/}

                  <FormControlLabel 
                    control={<Checkbox  
                      onChange={() => handleCategoryChange('cafe')}
                      checked={category.cafe === 'cafe'}
                      sx={{
                      color: '#D81B60',
                      '&.Mui-checked': {
                        color: '#C62828',
                      },
                    }}/>} label="Cafe"/>
                    <FormControlLabel 
                    control={<Checkbox  
                      onChange={() => handleCategoryChange('refresco')}
                      checked={category.refresco === 'refresco'}
                      sx={{
                      color: '#D81B60',
                      '&.Mui-checked': {
                        color: '#C62828',
                      },
                    }}/>} label="Refresco"/>
                    <FormControlLabel 
                    control={<Checkbox  
                      onChange={() => handleCategoryChange('postre')}
                      checked={category.postre === 'postre'}
                      sx={{
                      color: '#D81B60',
                      '&.Mui-checked': {
                        color: '#C62828',
                      },
                    }}/>} label="Postre"/>
                  <FormControlLabel 
                  control={<Checkbox  
                    onChange={() => handleCategoryChange('vegana')}
                    checked={category.vegana === 'vegana'}
                    sx={{
                    color: '#D81B60',
                    '&.Mui-checked': {
                      color: '#C62828',
                    },
                  }}/>} label="Vegana"/>
                  </ThemeProvider>
                  {/Aqui van los tipos de comida/}
                  <Heading as='h4' size='md'>Tipos</Heading>
                  <ThemeProvider theme={theme}>
                  <FormControlLabel 
                  control={<Checkbox  
                    onChange={() => handleFoodChange('hamburguesa')}
                    checked={food.hamburguesa === 'hamburguesa'}
                    sx={{
                    color: '#D81B60',
                    '&.Mui-checked': {
                      color: '#C62828',
                    },
                  }}/>} label="Hamburguesa"/>
                  <FormControlLabel 
                  control={<Checkbox 
                    onChange={() => handleFoodChange('nuggets')}
                    checked={food.nuggets === 'nuggets'}
                    sx={{
                    color: '#D81B60',
                    '&.Mui-checked': {
                      color: '#C62828',
                    },
                  }}/>} label="Nuggets"/>
                  {console.log('comida:', food)}
                  {console.log('categoria:',category)}
                </ThemeProvider>
              </div>
              <div className={styles.menu}>
                  {restItems.map((item, index) => {
                    return(
                      <div key={index} onClick={() => openModal(item)}>
                        <Card 
                          maxW='sm' 
                          overflow='hidden' 
                          variant='elevated'
                          transition="box-shadow 0.3s ease-in-out"
                          _hover={{
                            boxShadow: 'lg', // Aumenta la sombra en el hover>
                          }}
                        >
                          <Box height={60}>
                      <Image src={item.image} alt={item.name} objectFit='contain' height="100%" width="100%"/>
                      </Box>
                          <Box p='4'>
                            <Box display='flex' alignItems='center'>
                                <Badge borderRadius='full' px='2' mr='2' colorScheme='teal'>
                                  {item.category}
                                </Badge>
                                <Heading as='h4' size='md' fontWeight='semibold' noOfLines={1}>{item.food}</Heading>
                            </Box>
                            <Box>
                              <Text fontSize='lg'>DOP${item.price}</Text>
                            </Box>
                          </Box>
                        </Card>
                      </div>
                    )
                  })}
              </div>
          </Box>
      </div>
  )
}