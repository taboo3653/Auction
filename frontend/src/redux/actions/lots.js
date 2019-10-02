import { lotsApi } from '../../utils/api'

export const LOTS_SET_ITEMS  = "LOTS_SET_ITEMS";

const setLots = (items) => ({
    type: LOTS_SET_ITEMS,
    payload: items
})

export const fetchAllLots = () => dispatch => {
        lotsApi.getAll().then(({ data }) => {
          dispatch(setLots(data));
        });
      
}