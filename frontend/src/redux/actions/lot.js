import { lotsApi } from '../../utils/api'


const setLot = (items) => ({
        type: "LOT:SET_LOT",
        payload: items
})

export const fetchLotById = (id) => (dispatch) => {
        return lotsApi.getLotById(id)
                .then((data) => dispatch(setLot(data)));
}


export const removeLot = () => dispatch => {
        dispatch(setLot(null));
}
