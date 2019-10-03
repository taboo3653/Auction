import { lotsApi } from '../../utils/api'


const setLot = (items) => ({
    type: "LOT:SET_LOT",
    payload: items
})

export const fetchLotById =  (id) => async dispatch => {
        const data = await lotsApi.getLotById(id);
        dispatch(setLot(data));
      
}

export const removeLot =  () => async dispatch => {
        dispatch(setLot(null));
}
