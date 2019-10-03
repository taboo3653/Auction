import { lotsApi } from '../../utils/api'


const setMarketLots = (items) => ({
    type: "MARKET:SET_LOTS",
    payload: items
})

export const fetchAllLots = () => dispatch => {
        lotsApi.getAll().then(({ data }) => {
          dispatch(setMarketLots(data));
        });
      
}