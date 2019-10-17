import { axios } from './../../core'

export default {
    getAllLots: () => axios.get('/lots'),
    getActiveLots: () => axios.get('/lots?active=true'),
    getLotById: (id) => axios.get('/lots/'+id)
}