import React from 'react'
import Error from '../components/common/Error';

const LocationError = ({move = 0}) => {
  return <Error message='위치 정보를 가져올 수 없었어요' move={move}/>
}

export default LocationError