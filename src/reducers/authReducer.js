// import React from 'react';
import { types } from '../types/types';

/* 

    {
        uid:    fdsasdagsdag,
        name:   'Yeison',
    }

*/

/* const initialState = {
    uid: 'fdafsfdsaf',
    name: 'Yeison',
    dir: {
        mz: 'MZ 32',
        cs: '#33',
        barrio: '2500L'
    },
}; */

export const authReducer = ( state = {}, action ) => {
    switch (action.type) {
        case types.login:
            
            return {
                uid: action.payload.uid,
                name: action.payload.displayName,
            };

        case types.logout:
            
            return {};
    
        default:
            return state;
    }
}
