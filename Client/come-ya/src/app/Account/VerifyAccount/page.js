"use client"
import styles from './VerifyAccount.module.css'
import { Heading } from '@chakra-ui/react'
import { Formik, Form, Field, ErrorMessage } from 'formik'
import { useRouter } from 'next/navigation'
import Apiservice from '@/Apiservice'

const VerifyAccount = () => {

  const verifyUser = (code) => {
    const fetchData = async () => {
        try {
            // Hacer la solicitud GET o POST según sea necesario
            const response = await Apiservice.patch(`Users/ActivateUser`, code);
            // Aquí puedes hacer algo con la respuesta si es necesario
        } catch (error) {
          console.log(error)
            // Manejar errores si es necesario
        }
    };

    fetchData();
}
    const router = useRouter();

    return(
        <div className={styles.mainConteiner}>
            <div className={styles.tittle}>
                <Heading>Verificar Cuenta</Heading>
            </div>
            <div className={styles.contentConteiner}>
                <Formik
                    initialValues={{
                      code: '',
                    
                    }}
                    validate={(values) => {
                      let error = {};
                    
                      //Code Validation
                      if(!values.code){
                        error.code = 'Por favor ingrese su codigo de verificación'
                      } else if(!/^[a-zA-Z0-9_.+-]+$/.test(values.code)){
                        error.code = 'El codigo solo puede contener letras y numeros!'
                      }
                  
                  
                      return error;
                    }}

                    onSubmit={(values) => {
                      verifyUser(values.code)
                      router.push('/')

                    }}
                    >   
                    {( {errors } ) => (
                        <Form className={styles.formulario}>
                            <div>
                              <label htmlFor='code'>Codigo de verificación:</label>
                              <Field 
                                type="text" 
                                id='code' 
                                name="code" 
                                />
                                <ErrorMessage name='code' component={() => (
                                  <div className={styles.error}>{errors.code}</div>
                                )}/>
                            </div>
                            <button type="submit">Enviar</button>
                        </Form>
                    )}
                    </Formik>
            </div>
        </div>
    )
}

export default VerifyAccount