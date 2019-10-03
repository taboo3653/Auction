import { axios } from './../../core'

export default {
    getAll: () => axios.get('/lot'),
    getLotById: (id) => axios.get('lot/'+id)
}