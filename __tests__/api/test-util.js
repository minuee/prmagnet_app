import mUtils from '../../src/common/utils'

const defaultTestUser = 'test1000@ruu.kr'
const defaultTestPassword = 'test1000@ruu.kr'

export const loginData = (email = defaultTestUser, pw = defaultTestPassword) => ({email, pw})
export const delayFn = (delay = 3000) =>
  it(
    `테스트용시간지연${mUtils.getRandomString(5)}`,
    async () => {
      await new Promise(resolve => setTimeout(resolve, delay))
    },
    delay + 100
  )

it('', () => expect(true).toBe(true))
