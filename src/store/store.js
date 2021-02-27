import { createStore, combineReducers, applyMiddleware, compose } from 'redux';
import thunk from 'redux-thunk' // no changes here

import { authReducer } from '../reducers/authReducer';
import { uiReducer } from '../reducers/uiReducer';
const composeEnhancers = (typeof window !== 'undefined' && window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__) || compose; //soportar varios midleware

// Ahora bien, como combinar e usar varios midlewares en mi store...?
const reducers = combineReducers ({
    auth: authReducer,
    ui: uiReducer,
});

export const store = createStore( 
    reducers,
    // window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__(), // se elimina para implentar varios midleware con composeEnhancers
    composeEnhancers(
        applyMiddleware( thunk ), // Con esto puedo trabajar acciones asyncronas en mi midleware
        
    )

);




