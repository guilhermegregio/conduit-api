import { isRight, isLeft } from 'fp-ts/Either'
import { userCodec } from './types'

it('should valid user', () => {
  const user = userCodec.decode({
    email: 'xpto',
    token: '1',
    username: '',
    bio: '',
  })

  expect(isRight(user)).toBeTruthy()
})

it('should invalid user', () => {
  const user = userCodec.decode({
    email: 'xpto',
    token: '1',
    username: 1,
  })

  expect(isLeft(user)).toBeTruthy()
})
