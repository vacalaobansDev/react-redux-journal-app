import React, { useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';
import {firebase} from '../firebase/firebase-config';
import { login } from '../actions/auth';
import { AuthRouter } from './AuthRouter';
import { JournalScreen } from '../components/journal/JournalScreen';

import {
    BrowserRouter as Router,
    Switch,
    Redirect,
  } from 'react-router-dom';

import { PrivateRoute } from './PrivateRoute';
import { PublicRoute } from './PublicRoute';


export const AppRouter = () => {

    const dispatch = useDispatch();
    const [ cheking, setCheking ] = useState(true);
    const [ isLoggedIn, setIsLoggedIn ] = useState(false);

    useEffect(() => {
        firebase.auth().onAuthStateChanged( ( user ) => { // cuando estoy autenticado esta funcion retorna un user
            // console.log(user);
            if( user?.uid ){
                dispatch( login( user.uid, user.displayName ) );
                setIsLoggedIn( true );
            }else{
                setIsLoggedIn( false );
            }
            // setIsLoggedIn( true ); // para hacer pruebas sin loggedIn
            setCheking(false);
        } );
        
    }, [ dispatch, setCheking, setIsLoggedIn ])


    if( cheking ){
        return (
            <h1>Espere, por favor...</h1> // seria bueno crear un Component
        );
    }

    

    return (
        <Router>
            <div>
                <Switch>

                    <PublicRoute 
                        path="/auth"
                        component={ AuthRouter }
                        isAuthenticated={ isLoggedIn }
                    />

                    <PrivateRoute 
                        exact
                        isAuthenticated={ isLoggedIn }
                        path="/"
                        component={ JournalScreen }
                    />

                    <Redirect to="/auth/login" />
                </Switch>
            </div>
        </Router>
    )
}
