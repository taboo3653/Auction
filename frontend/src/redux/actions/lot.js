import { lotsApi, bidsApi } from '../../utils/api'
import { socket } from '../../core'


const setLot = (items) => ({
        type: "LOT:SET_LOT",
        payload: items
})

const setBids = (items) => {
        return ({
                type: "LOT:SET_BIDS",
                payload: items
        })
}

const setBidsLoading = (isLoading) => {
        return ({
                type: "LOT:SET_BIDS_LOADING",
                payload: isLoading
        })
}


export const fetchLotById = (id) => (dispatch) => {
        return lotsApi.getLotById(id)
                .then((responce) => dispatch(setLot(responce.data)));
}

export const fetchCreateLot = (postData, id) => (dispatch) => {
        if (id)
                return lotsApi.editLot(postData,id)          
        else 
                return lotsApi.createLot(postData)
}



export const removeLot = () => dispatch => {
        dispatch(setLot(null));
}

export const removeBids = () => dispatch => {
        socket.emit("LOT:LEAVE");
        dispatch(setBids(null));
}

export const fetchMakeBid = (postData) => (dispatch) => {
        dispatch(setBidsLoading(true));
        return bidsApi.createBid(postData)
                .catch((err)=> {
                        dispatch(setBidsLoading(false));
                        throw err;
                });
}

export const fetchBidsByLot = (lotId) => (dispatch) => {
        return bidsApi.getBidsByLot(lotId)
                .then((responce) => {
                        socket.emit("LOT:JOIN",lotId);
                        dispatch(setBidsLoading(false));
                        dispatch(setBids(responce.data)
                        )});
}
