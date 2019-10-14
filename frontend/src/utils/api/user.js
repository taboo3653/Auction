import { axios } from './../../core'

export default {
    signUp: (postData) => axios.post('/users/signup', postData),
    signIn: (postData) => axios.post('/users/signin', postData),
    getMe: () => axios.get('/users/me')

    
}