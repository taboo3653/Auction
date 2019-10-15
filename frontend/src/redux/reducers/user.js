const initialState = {
    data: null,
    token: window.localStorage.token,
};

export default (state = initialState, action) => {

    switch(action.type)
    {
        case "USER:SET_USER_DATA" : 
        return {...state, 
            data : action.payload,
            token: window.localStorage.token
        } 

        default : 
        return state;
    }

}