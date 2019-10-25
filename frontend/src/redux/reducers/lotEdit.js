const initialState = {
    item : null,
};

export default (state = initialState, action) => {

    switch(action.type)
    {
        case "LOT-EDIT:SET_LOT" : 
        return {...state, 
            item : action.payload,
        } 

        default : 
        return state;
    }

}