import _ from 'lodash'

const awsUtils = {
  // 성공의 경우
  onSuccess: (data, response) => {
    if (typeof _.get(data, 'cbSuccess') === 'function') {
      data.cbSuccess(response)
    }
  },
  // 실패의 경우
  onFailure: (data, response) => {
    if (typeof _.get(data, 'cbFailure') === 'function') {
      data.cbFailure(response)
    }
  },
}

export default awsUtils
