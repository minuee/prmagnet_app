import mUtils from '../../src/common/utils'

const defaultTestUser = '011-1111-1111'
const defaultTestPassword = '6b86b273ff34fce19d6b804eff5a3f5747ada4eaa22f1d49c01e52ddb7875b4b'

export const userData = (mobileNo, userPass, userType, userNm, regNo, companyNm, userEmail) => ({
  mobile_no: mobileNo,
  user_pass: userPass || defaultTestPassword,
  signup_cd_id: userType !== 'user' ? 'SIGNUP_TP_PARTNER' : 'SIGNUP_TP_USER',
  user_nm: userNm,
  reg_no: regNo,
  company_nm: companyNm,
  user_email: userEmail,
})

export const loginData = (mobileNo, userPass, userType = 'host') => ({
  mobile_no: mobileNo || defaultTestUser,
  user_pass: userPass || defaultTestPassword,
  signup_cd_id: userType !== 'user' ? 'SIGNUP_TP_PARTNER' : 'SIGNUP_TP_USER',
})

export const getPass = () => defaultTestPassword

export const delayFn = (delay = 3000) =>
  it(
    `테스트용시간지연${mUtils.getRandomString(5)}`,
    async () => {
      await new Promise(resolve => setTimeout(resolve, delay))
    },
    delay + 100
  )

it('', () => expect(true).toBe(true))
