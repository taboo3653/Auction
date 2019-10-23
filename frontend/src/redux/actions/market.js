import { lotsApi } from '../../utils/api'


const setMarketLots = (items) => ({
  type: "MARKET:SET_LOTS",
  payload: items
})

export const fetchAllLots = () => dispatch => {
  return lotsApi.getAllLots()
    .then(({ data }) => {
      dispatch(setMarketLots(data));
    });
}

export const removeLots = () => dispatch => {
    dispatch(setMarketLots([]));
}