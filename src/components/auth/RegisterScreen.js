import React from 'react';
import { Link } from 'react-router-dom';
import { useForm } from '../../hooks/useForm';
import validator  from 'validator';
import {useDispatch, useSelector} from 'react-redux'
import { removeError, setError } from '../../actions/ui';
import { startRegisterWithEmailPasswordName } from '../../actions/auth';
import Swal from 'sweetalert2';

export const RegisterScreen = () => {

    const [ formValues, handleInputChange ] = useForm({
        name: 'Yeison',
        email: 'nando@gmail.com',
        password: '12345678',
        password2: '12345678',
    });

    const { name, email, password, password2 } = formValues;
    const dispatch = useDispatch();
    const {msgError} = useSelector(state => state.ui); // obtiene el estado tal cual como se encuentre en el momento {ui...}

    // console.log(msgError);

    const handleSubmit = (e) => {
        e.preventDefault();
        // console.log(name, email, password, password2);

        if( isFormValid() ){

            dispatch( startRegisterWithEmailPasswordName( email, password, name ) );
            // console.log("Formulario correcto!");
            // dispatch( startGoogleLogin() );
        }

    };

    const isFormValid = () => {

        if( name.trim().length === 0 ){
            // console.log("Name is required");
            dispatch( setError( "Name is required" ) );
            // Swal.fire( 'Error', "Name is required", 'error'  );
            return false;
        }else if( !validator.isEmail( email ) ){
            // console.log("Email is not valid");
            dispatch( setError( "Email is not valid" ) );
            // Swal.fire( 'Error', "Email is not valid", 'error'  );
        }else if( (password !== password2 ) || (password.length <= 5) ){
            // console.log("Password should be at lest 6 characters and match each others");
            dispatch( setError( "Password should be at lest 6 characters and match each others" ) );
            // Swal.fire( 'Error', "Password should be at lest 6 characters and match each others", 'error'  );
            return false;
        }
        
        dispatch( removeError() );

        return true;
    };

    return (
        <>
            <h3 className="auth__title">Register</h3>

            <form onSubmit={ handleSubmit }>

                {
                    ( msgError ) && (

                        <div className="auth__alert-error">
                            { Swal.fire( 'Error', msgError, 'error'  ) }
                        </div>
                    )
                }

                <input 
                    type="text"
                    placeholder="Name"
                    name="name"
                    className="auth__input"
                    autoComplete="off"
                    value={ name }
                    onChange={ handleInputChange }
                />

                <input 
                    type="text"
                    placeholder="Email"
                    name="email"
                    className="auth__input"
                    autoComplete="off"
                    value={ email }
                    onChange={ handleInputChange }
                />

                <input 
                    type="password"
                    placeholder="Password"
                    name="password"
                    className="auth__input"
                    value={ password }
                    onChange={ handleInputChange }
                />

                <input 
                    type="password"
                    placeholder="Confirm password"
                    name="password2"
                    className="auth__input"
                    value={ password2 }
                    onChange={ handleInputChange }
                />


                <button
                    type="submit"
                    className="btn btn-primary btn-block mb-5"
                >
                    Register
                </button>

               

                <Link 
                    to="/auth/login"
                    className="link"
                >
                    Already registered?
                </Link>

            </form>
        </>
    )
}
