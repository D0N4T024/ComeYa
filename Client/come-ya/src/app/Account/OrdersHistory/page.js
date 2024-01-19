"use client"
import { Card, CardHeader, CardBody, Heading, Text, Stack, StackDivider, Box, Image } from '@chakra-ui/react'
import { useState, useEffect } from 'react'
import Apiservice from '@/Apiservice'
import styles from './OrdersHistory.module.css'
import Link from 'next/link'
import ReceiptLongOutlinedIcon from '@mui/icons-material/ReceiptLongOutlined';

const OrdersHistory = () => {

  const [orders,setOrders] = useState([]) 
  useEffect(() => {
    const fetchData = async () => {
      try {
        // Hacer la solicitud GET o POST según sea necesario
        const response = await Apiservice.get(`Orders/GetOrders`);
        setOrders(response);
        {console.log("longitud de orders:", orders.length)}
        // Puedes hacer más acciones según tus necesidades
       ;
      } catch (error) {
       // console.error("El error es",error);
      }
    };

    fetchData();
  }, []);
  return(
    <div className={styles.mainConteiner}>
      <div className={styles.tittle}>
        <Heading>Historial de ordenes</Heading>
      </div>
        { orders.length !== 0 ? (
          <div className={styles.historyConteiner}>
            {orders.map((order, index) => {
              return(
                <div key={index}>
                  <Card mb={4} variant={'elevated'}>
                    <CardHeader>
                      <div className={styles.headerInfo}>
                        <Box display={'flex'} flexDirection={'column'} justifyContent={'center'} alignItems={'flex-start'} gap={1}>
                          <Box>
                            <Heading size='md'>{order.code}</Heading>
                            <Text size='md' color='gray.500'>{order.date}</Text>
                          </Box>
                          <Text size='md' as='em' color={order.status === 'Entregado' ? 'green.500' : 'red.500'}>{order.status}</Text>
                          <button className={styles.viewReceipt}>
                            <Link target="_blank" rel="noopener noreferrer" href={order.receipt}>
                              Ver Recibo
                            </Link>
                          </button>
                        </Box>
                        <Box display={'flex'} flexDirection={'column'} justifyContent={'center'} alignItems={'flex-end'} gap={1}>
                          <Text size='sm' as='b'>Costos: ${order.amount}</Text>
                          <Text size='sm' as='b'>Impuestos: ${order.taxes}</Text>
                          <Text size='sm' as='b'>Total: ${(order.amount + order.taxes).toFixed(2)}</Text> 
                        </Box>
                      </div>
                    </CardHeader>
                    <CardBody backgroundColor={'rgba(0, 0, 0, 0.05)'}>
                      <Stack divider={<StackDivider/>} spacing='4'>
                        {order.items.map((item, index) => {
                          return(
                            <div key={index} className={styles.bodyInfo}>
                              <div className={styles.leftBodyInfo}>
                                <Image 
                                  src={item.image}
                                  width={85}
                                  height={85}
                                  borderRadius={'5%'}
                                  objectFit='cover'
                                  fallbackSrc={'https://via.placeholder.com/85x85'}
                                  />
                                <Heading size='xs' textTransform='uppercase'>{item.name}</Heading>
                              </div>
                              <Box display={'flex'} flexDirection={'column'} justifyContent={'center'} alignItems={'flex-end'}>
                                <Text pt='2' fontSize='sm'>x{item.quantity}</Text>
                                <Text pt='2' fontSize='sm'>Precio: ${item.price}</Text>
                                <Text pt='2' fontSize='sm'>Costo: ${item.amount}</Text>
                                <Text pt='2' fontSize='sm'>Tax: ${item.taxes}</Text>
                              </Box>
                            </div>
                          )
                        })}
                      </Stack>
                    </CardBody>
                  </Card>
                </div>
              )
            })}
          </div>
        ):(
          <Box display='flex' flexDirection='column' justifyContent='center' alignItems='center'>
            <ReceiptLongOutlinedIcon sx={{ fontSize: 200, color: '#BDBDBD' }} />
            <Text size='sm' my={4}>No haz hecho ninguna orden, haz click para <Link href={'/'} style={{textDecoration: 'underline'}}>continuar viendo</Link></Text>
          </Box>
        )}
    </div>
  )
}

export default OrdersHistory;