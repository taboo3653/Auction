import { axios } from './../../core'

export default {
    getAllLots: () => axios.get('/lots'),
    getActiveLots: () => axios.get('/lots?active=true'),
    getCreatorLots: (creator) => axios.get('/lots?creator='+creator),

    getLotById: (id) => axios.get('/lots/'+id),
    createLot: (data) => axios.post('/lots', data),
    editLot: (data, lotId) => axios.put('/lots/'+lotId, data)
}