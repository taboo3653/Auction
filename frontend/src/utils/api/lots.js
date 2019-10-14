import { axios } from './../../core'

export default {
    getAll: () => axios.get('/lots'),
    getLotById: (id) => axios.get('lots/'+id)
}