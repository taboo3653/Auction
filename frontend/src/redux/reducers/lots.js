import { LOTS_SET_ITEMS } from '../actions/lots'
const initialState = {
    items : [],
};

export default (state = initialState, action) => {

    switch(action.type)
    {
        case LOTS_SET_ITEMS : 
        return {...state, 
            items : action.payload
        } 

        default : 
        return state;
    }

}