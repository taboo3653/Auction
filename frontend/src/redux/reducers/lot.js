const initialState = {
    item : null,
    bids : {
        items: null,
        isLoading: false
    }
};

export default (state = initialState, action) => {

    switch(action.type)
    {
        case "LOT:SET_LOT" : 
        return {...state, 
            item : action.payload,
        } 

        case "LOT:SET_BIDS" : 
        return {...state, 
            bids : {...state.bids, 
                items: action.payload
            }
        } 

        case "LOT:SET_BIDS_LOADING" : 
        return {...state, 
            bids : {...state.bids, 
                isLoading: action.payload
            }
        } 



        default : 
        return state;
    }

}