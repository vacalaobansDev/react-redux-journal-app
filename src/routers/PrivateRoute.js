import React, { Component } from 'react'
import { Redirect, Route } from 'react-router-dom'

import PropTypes from 'prop-types'

export const PrivateRoute = ({
    isAuthenticated,
    component: Component,
    ...rest
}) => {

    // localStorage.setItem('lastPath', rest.location.pathname); // Crear variable local para redirigir a la ultima pagina visitada.

    console.log(isAuthenticated);

    return (
        <Route { ...rest }
            component={ ( props ) => (
                (isAuthenticated) 
                    ? (<Component { ...props } />) 
                    : ( <Redirect to="/auth/login" /> )
            ) }
        
        />
    )
}

PrivateRoute.prototypes = {
    isAuthenticated: PropTypes.bool.isRequired,
    component: PropTypes.func.isRequired,

};