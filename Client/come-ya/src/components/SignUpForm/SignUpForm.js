"use client"
import { useState } from 'react';
import { Formik, Form, Field, ErrorMessage } from 'formik';
import styles from './SignUpForm.module.css'
import { Button } from '@mui/material';
import { useToast } from '@chakra-ui/react'
import Apiservice from '@/Apiservice';

const SignUpForm = ({ onClose }) => {

  const[ChangeOnSubmit, setChangeOnSubmit] = useState(false);
  const toast = useToast()

  const Register = async (email,password,passwordConfirmed,name,lname,phone,genre) => {
    let Phone = phone.toString()
    let userDTO= {email,password,passwordConfirmed,name,lname,Phone,genre}

    try {
      // Hacer la solicitud POST para el registro
      const response = await Apiservice.post('Users/Register', userDTO);
      
      return response; // Devolver la respuesta para manejarla fuera de la función
    } catch (error) {
      console.log(error)
       // Propagar el error para que se pueda manejar en onSubmit
    }
	}
 

  
  return (
    <Formik
      initialValues={{
        name: "",
        lname: "",
        phone: "",
        genre: "",
        email: "",
        password: "",
        passwordConfirmed: "",

      }}
      validate={(values) => {
        let error = {};

        //Name Validation
        if(!values.name){
          error.name = 'Por favor ingresa un nombre'
        } else if(!/^[a-zA-ZÀ-ÿ\s]{1,40}$/.test(values.name)){
          error.name = 'El nombre solo puede contener letras y espacios!'
        }

        //lname Validation
        if(!values.lname){
          error.lname = 'Por favor ingresa un apellido'
        } else if(!/^[a-zA-ZÀ-ÿ\s]{1,40}$/.test(values.lname)){
          error.lname = 'El apellido solo puede contener letras y espacios!'
        }

        //Phone Validation
        if(!values.phone){
          error.phone = 'Por favor ingresa un télefono'
        } else if (!/^[0-9]{10}$/.test(values.phone)) {
          error.phone = 'El télefono no tiene la cantidad de digitos correcta!'
        }

        //Phone Validation
        if(!values.genre){
          error.genre = 'Por favor seleccionar un opción'
        }

        //Email Validation
        if(!values.email){
          error.email = 'Por favor ingresa un correo electronico'
        } else if(!/^[a-zA-Z0-9_.+-]+@[a-zA-Z0-9-]+\.[a-zA-Z0-9-.]+$/.test(values.email)){
          error.email = 'El email solo puede contener letras y espacios!'
        }

        //Password Validation
        if(!values.password){
          error.password = 'Por favor ingresa una contraseña'
        } else if (
        !/(?=.*[a-z])/.test(values.password) || // al menos una letra minúscula
        !/(?=.*[A-Z])/.test(values.password) || // al menos una letra mayúscula
        !/(?=.*\d)/.test(values.password) ||    // al menos un número
        !/(?=.[@$!%?&])/.test(values.password) // al menos un símbolo
        ) {
          error.password = 'La contraseña debe contener al menos una letra mayúscula, una letra minúscula, un número y un símbolo.';

        } else if (values.password.length < 6) {
          error.password = 'La contraseña debe tener al menos 6 caracteres.';
        }

        //passwordConfirmed Validation
        if(!values.passwordConfirmed){
          error.passwordConfirmed = 'Por favor confirme la contraseña'
        } else if (values.passwordConfirmed !== values.password) {
          error.passwordConfirmed = 'Las contraseñas no coinciden.';
        }

        return error;
      }}

      onSubmit={(values, { setSubmitting }) => {
        
         let message = Register(values.email,values.password,values.passwordConfirmed,values.name,values.lname,values.phone,values.genre)
          
          setSubmitting(false);
          setChangeOnSubmit(true);
          setTimeout(() => setChangeOnSubmit(false), 5000);
        
        toast({
          title: 'Mensaje.',
          description: message,
          status: 'success',
          variant: "subtle",
          position: "top-right",
          duration: 8000,
        })
       // onClose();
      }}
    >   
      {( {errors } ) => (
        <Form className={styles.formulario}>
          <div>
            <label htmlFor='name'>Nombre:</label>
            <Field 
              type="text" 
              id='name' 
              name="name" 
              placeholder='Juan'
              />
              <ErrorMessage name='name' component={() => (
                <div className={styles.error}>{errors.name}</div>
              )}/>
          </div>
          <div>
            <label htmlFor='lname'>Apellido:</label>
            <Field 
              type="text" 
              id='lname' 
              name="lname" 
              placeholder='Perez'
              />
              <ErrorMessage name='lname' component={() => (
                <div className={styles.error}>{errors.lname}</div>
              )}/>
          </div>
          <div>
            <label htmlFor='phone'>Télefono:</label>
            <Field 
              type="number" 
              id='phone' 
              name="phone" 
              />
              <ErrorMessage name='phone' component={() => (
                <div className={styles.error}>{errors.phone}</div>
              )}/>
          </div>
          <div>
            <label htmlFor='genre'>Cuál es tu género?</label>
              <Field 
                type="radio" 
                name="genre" 
                value="Masculino" 
                label='Hombre'/>
                Masculino<br />
              <Field 
                type="radio" 
                name="genre" 
                value="Femenino" />
              Femenino<br />
              <Field 
                type="radio" 
                name="genre" 
                value="Otro" />
                Otro
              {/*<Field as="select" name="genre">
             <option value="male">Hombre</option>
             <option value="female">Mujer</option>
             <option value="other">Otro</option>
              </Field>*/}
              <ErrorMessage name='genre' component={() => (
                <div className={styles.error}>{errors.genre}</div>
              )}/>
          </div>
          <div>
            <label htmlFor='email'>Correo electrónico:</label>
            <Field 
              type="email" 
              id='email' 
              name="email" 
              placeholder='juan@gmail.com'
              />
              <ErrorMessage name='email' component={() => (
                <div className={styles.error}>{errors.email}</div>
              )}/>
          </div>
          <div>
            <label htmlFor='password'>Contraseña:</label>
            <Field 
              type="password" 
              id='password' 
              name="password" 
              />
              <ErrorMessage name='password' component={() => (
                <div className={styles.error}>{errors.password}</div>
              )}/>
          </div>
          <div>
            <label htmlFor='passwordConfirmed'>Confirmar contraseña:</label>
            <Field 
              type="password" 
              id='passwordConfirmed' 
              name="passwordConfirmed" 
              />
              <ErrorMessage name='passwordConfirmed' component={() => (
                <div className={styles.error}>{errors.passwordConfirmed}</div>
              )}/>
          </div>
          <Button type="submit">Enviar</Button>
          {/*ChangeOnSubmit && <p className={styles.exito}>Formulario enviado con exito!</p>*/}
        </Form>
      )}
    </Formik>
  )
};

export default SignUpForm;