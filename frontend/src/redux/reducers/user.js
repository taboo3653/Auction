const initialState = {
    data: null,
    token: window.localStorage.token,
  //  isAuth: false
};

export default (state = initialState, action) => {

    switch(action.type)
    {
        case "USER:SET_USER_DATA" : 
        return {...state, 
            data : action.payload,
           // isAuth: true,
            token: window.localStorage.token
        } 
/*
        case "USER:SET_IS_AUTH" : 
        return {...state, 
            isAuth : action.payload,
        } 
*/
        default : 
        return state;
    }

}