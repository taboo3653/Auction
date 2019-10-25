import { lotsApi } from '../../utils/api'


const setCreatorLots = (items) => ({
  type: "PERSONAL:SET_CREATOR_LOTS",
  payload: items
})

const setParticipantLots = (items) => ({
    type: "PERSONAL:SET_PARTICIPANT_LOTS",
    payload: items
  })

export const fetchCreatorLots = (creatorId) => dispatch => {
  return lotsApi.getCreatorLots(creatorId)
    .then(({ data }) => {
      dispatch(setCreatorLots(data));
    });
}

export const fetchParticipantLots = () => dispatch => {
    /*return lotsApi.getAllLots()
      .then(({ data }) => {
         dispatch(setParticipantLots(data));
      });*/
  }

export const removePersonalLots = () => dispatch => {
    dispatch(setCreatorLots([]));
    dispatch(setParticipantLots([]));

}