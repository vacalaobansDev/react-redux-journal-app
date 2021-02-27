// import React from 'react';import { types } from '../types/types';
import { firebase, googleAuthProvider } from '../firebase/firebase-config';
import { types } from '../types/types';
import { finishLoading, startLoading } from './ui';
import Swal from 'sweetalert2';
// Function Async
export const startLoginEmailPassword = (email, password) => {
    return ( dispatch ) => {

        dispatch( startLoading() );

        firebase.auth().signInWithEmailAndPassword( email, password )
            .then( ({ user }) => {
                console.log(user);
                dispatch( login( user.uid ,user.displayName ) );
                dispatch( finishLoading() );

        } ).catch( (err) => {
            console.log(err)
            dispatch( finishLoading() );
            Swal.fire( 'Error', err.message, 'error'  );
        } );
        
    };
};

export const startRegisterWithEmailPasswordName = ( email, password, name ) => { // function que retorna un callback async por eso dispatch de thunk
    return (dispatch) => {
        firebase.auth().createUserWithEmailAndPassword( email, password )
            .then( async ({ user }) => {
                console.log(user);
                await user.updateProfile({displayName: name, });
                // console.log(user);
                dispatch( login( user.uid ,user.displayName ) );

            } ).catch( 
                (err) => (
                    // console.log(err)
                    Swal.fire( 'Error', err.message, 'error'  )
                ) 
            );
    };
};

export const startGoogleLogin = () => {
    return ( dispatch ) => { //thunk provee el dispatch

        firebase.auth().signInWithPopup( googleAuthProvider )
            .then( ({ user }) => {
                console.log(user);
                // dispatch( login( user.uid ,user.displayName ) );

            } ).catch( (err) => (
                    // console.log(err)
                    Swal.fire( 'Error', err.message, 'error'  )
                ) 
            );

    };
};

// Function Sync
export const login = (uid, displayName) => {

    return {
        type: types.login,
        payload: {
            uid,
            displayName,
        }
    };
};

export const startLogout = () => {
    return async ( dispatch ) => {
        await firebase.auth().signOut(); // se podria hacer then y catch
        dispatch( logout() );
    }
};

export const logout = () => ({
    type: types.logout,
});