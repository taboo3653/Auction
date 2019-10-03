const initialState = {
    items : [],
};

export default (state = initialState, action) => {

    switch(action.type)
    {
        case "MARKET:SET_LOTS" : 
        return {...state, 
            items : action.payload
        } 

        default : 
        return state;
    }

}