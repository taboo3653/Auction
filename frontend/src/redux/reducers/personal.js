const initialState = {
    creatorLots : [],
    participantLots : []
};

export default (state = initialState, action) => {

    switch(action.type)
    {
        case "PERSONAL:SET_CREATOR_LOTS" : 
        return {...state, 
            creatorLots : action.payload
        } 

        case "PERSONAL:SET_PARTICIPANT_LOTS" : 
        return {...state, 
            participantLots : action.payload
        } 

        default : 
        return state;
    }

}