import React, {useState, useEffect} from 'react'
import {  PersonalLots } from '../../components'
import { PersonalInfo } from '../../containers'
import { Loader} from '../../../../components'
import { connect } from 'react-redux'
import {fetchCreatorLots, removePersonalLots} from '../../../../redux/actions'


import './index.scss'

const Personal = ({creatorLots, fetchCreatorLots, removePersonalLots,userId}) => {

    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
      const fetchData = () => {
        setIsLoading(true);
        fetchCreatorLots(userId).finally(() => setIsLoading(false))
      }
  
      fetchData();
      
      return () => {
          removePersonalLots();
      }
  
    }, [fetchCreatorLots, removePersonalLots,userId]);
  
    
    return (
        (isLoading)?
        <Loader />:
        <div className = "personal container">
            <div className ="row justify-content-center">
                <div className = "personal__item info-block col-12 col-lg-6"><PersonalInfo /></div>
            </div>
            <div className = "personal__item"><PersonalLots creatorLots={creatorLots} /></div>
        </div>
    );
}


export default connect(({personal, user})=>({
    userId: user.data && user.data._id,
    creatorLots: personal.creatorLots,
}),{fetchCreatorLots, removePersonalLots})(Personal);