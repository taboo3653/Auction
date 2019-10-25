import { lotsApi } from '../../utils/api'


const setLotEdit = (items) => ({
        type: "LOT-EDIT:SET_LOT",
        payload: items
})


export const fetchLotEditById = (id) => (dispatch) => {
        return lotsApi.getLotById(id)
                .then((responce) => dispatch(setLotEdit(responce.data)));
}

export const fetchCreateLot = (postData, id) => (dispatch) => {
        if (id)
                return lotsApi.editLot(postData,id)          
        else 
                return lotsApi.createLot(postData)
}



export const removeLotEdit = () => dispatch => {
        dispatch(setLotEdit(null));
}

