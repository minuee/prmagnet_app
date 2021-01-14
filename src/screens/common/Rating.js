import React from 'react'
import {Rating} from 'react-native-ratings'

const imgRating = require('../../images/common/rating.png')

const CommonRating = props => {
  const {imageSize, readonly, startingValue, onFinishRating, style, ...rest} = props
  return (
    <Rating
      {...rest}
      type="custom"
      imageSize={imageSize}
      ratingImage={imgRating}
      ratingColor="#ffa300"
      ratingBackgroundColor="#d8d8d8"
      fractions={1}
      readonly={readonly}
      startingValue={startingValue}
      onFinishRating={onFinishRating}
      style={{padding: 0, margin: 0}}
    />
  )
}

export default CommonRating
