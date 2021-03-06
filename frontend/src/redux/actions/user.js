import { usersApi } from '../../utils/api'


const setUserData = (data) => ({
    type: "USER:SET_USER_DATA",
    payload: data
})


export const exitUser = () => dispatch => {
      delete window.localStorage.token;
      dispatch(setUserData(null));
}

export const fetchUserData = () => dispatch => {
    usersApi
      .getMe()
      .then(({ data }) => {
        dispatch(setUserData(data));
      })
      .catch(err => {
        if(!err.response)
          throw err;
        if (err.response.status === 404) {
          dispatch(exitUser());
        }
      });
}

export const fetchUserSignUp = (postData) => (dispatch) => {
    return usersApi.signUp(postData).then(
        () => {
            dispatch(fetchUserSignIn({
                email : postData.email,
                password : postData.password
            }));
        }
    );      
}

export const fetchUserSignIn = (postData) => (dispatch) => {
    return usersApi
    .signIn(postData)
    .then(({ data }) => {

      const { token } = data;
      window.axios.defaults.headers.common['Authorization'] = "Bearer "+ token;
      window.localStorage['token'] = token;
      dispatch(fetchUserData());
    });

}

