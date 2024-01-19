"use client"
import { useEffect,useState } from 'react'
import styles from './page.module.css'
import Carousel from '../components/Carousel/Carousel'
import MainCarousel from '../components/MainCarousel/MainCarousel'
import Apiservice from '@/Apiservice'

export default function Home() {
  const [combos,setCombos] = useState([])
  const [restaurants,setRestaurants] = useState([])
  const [items,setItems] = useState([])

  useEffect(() => {
    const fetchData = async () => {

      try {
        const responseOfferCarousel = await Apiservice.get(`Items/AllItems?price=0&page=${1}&combo=${0}&restaurant=0&rand=${1}&pageSize=${8}&marketinImg=1`,);
        setItems(responseOfferCarousel);
      
        const responseComboCarousel = await Apiservice.get(`Items/AllItems?price=0&page=0&combo=${1}&restaurant=0&rand=${0}&pageSize=${8}&marketinImg=1`,);
        setCombos(responseComboCarousel)
        
        // Hacer la solicitud GET o POST según sea necesario
        const responseRestaurantCarousel = await Apiservice.get('Restaurants');
        setRestaurants(responseRestaurantCarousel);
      } catch (error) {
      }
    };
    
    fetchData();
  }, []);

 
  return(
    <main>
      <div className={styles.homeConteiner}>
      
        <div className={styles.mainCarousel}>
          <MainCarousel />
        </div>

        <div className={styles.categoriesConteiner}>
          <div className={styles.category}>
              <div className={styles.categoryBottomSide}>
              
                <Carousel
                  titulo={'Restaurantes'}
                  objects={restaurants}
                />
              </div>
          </div>

          <div className={styles.category}>
              <div className={styles.categoryBottomSide}>
              
                <Carousel
                  titulo={'Ofertas de hoy'}
                  objects={items}
                />
              </div>
          </div>

          <div className={styles.category}>
              <div className={styles.categoryBottomSide}>
                <Carousel
                  titulo={'Combos especiales'}
                  objects={combos}
                />
              </div>
          </div>

          
        </div>
      </div>
    </main>
  )
}
