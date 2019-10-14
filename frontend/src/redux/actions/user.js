import { userApi } from '../../utils/api'


const setUserData = (data) => ({
    type: "USER:SET_USER_DATA",
    payload: data
})


export const exitUser = () => dispatch => {
    dispatch(setUserData(null));
    delete window.localStorage.token;
}

export const fetchUserData = () => dispatch => {
    userApi
      .getMe()
      .then(({ data }) => {
        dispatch(setUserData(data));
      })
      .catch(err => {
        if (err.response.status === 401) {
          dispatch(exitUser);
        }
      });
}

export const fetchUserSignUp = (postData) => (dispatch) => {
    return userApi.signUp(postData).then(
        () => {
            dispatch(fetchUserSignIn({
                email : postData.email,
                password : postData.password
            }));
        }
    );      
}

export const fetchUserSignIn = (postData) => (dispatch) => {
    return userApi
    .signIn(postData)
    .then(({ data }) => {

      const { token } = data;
      window.axios.defaults.headers.common['Authorization'] = "Bearer "+ token;
      window.localStorage['token'] = token;
      dispatch(fetchUserData());
      return data;
    });

}

