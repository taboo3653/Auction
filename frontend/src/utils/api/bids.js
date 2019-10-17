import { axios } from './../../core'

export default {
    createBid: (postData) => axios.post('/bids', postData),
    getBidsByLot: (lotId) => axios.get(`/bids?lotId=${lotId}`)
}