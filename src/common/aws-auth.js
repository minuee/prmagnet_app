import {Auth, AuthType} from '@psyrenpark/auth'

// 비동기 방식
export const isLoggedIn = async props => {
  try {
    var auth = await Auth.currentSession()
    // 로그인 상태
    return true
  } catch (error) {
    // 로그아웃 상태
    return false
  }
}
// 콜백 방식
export const login = async formData => {
  Auth.signInProcess(
    {
      email: 'test1000@ruu.kr', //formData.userEmail, // TODO 임시로 하드코딩
      password: 'test1000@ruu.kr', //formData.userPassword, // TODO 임시로 하드코딩
      authType: AuthType.EMAIL,
    },
    async data => {
      // 성공처리 및 로그인 된 상태
      // 서버에서 유저 정보 필요시 여기서 비동기로 가져올것
      // 서버로 자기 정보 가져오는 api를 호출해야한다.
    },
    async data => {
      // 회원가입은 되었으나 인증을 안했을경우
      // 인증 안하고 강제 종료 했거나 화면 나갔을경우 타는 함수
      // 인증 화면으로 이동필요
      // 자동으로 인증 메일 재발송됨
    },
    error => {
      // 실패처리,
    }
    // loadingFunction
  )
}

export const logout = async () => {
  Auth.signOutProcess(
    {
      authType: AuthType.EMAIL,
    },
    async data => {
      // 성공처리 및 로그아웃
      // 리덕스나, context의 저장된 정보 초기화 필요
      // 그후 로그인 화면으로 이동
    },
    error => {
      // 실패처리,
    }
    // loadingFunction
  )
}
