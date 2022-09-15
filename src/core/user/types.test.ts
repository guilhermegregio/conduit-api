import * as E from 'fp-ts/Either'
import { pipe } from 'fp-ts/function'
import { createUserCodec, userCodec } from './types'

it('should valid user', () => {
  const user = userCodec.decode({
    email: 'xpto',
    token: '1',
    username: '',
    bio: '',
  })

  expect(E.isRight(user)).toBeTruthy()
})

it('should invalid user', () => {
  const user = userCodec.decode({
    email: 'xpto',
    token: '1',
    username: 1,
  })

  expect(E.isLeft(user)).toBeTruthy()
})

it('should valid create user', () => {
  const userValid = {
    username: 'jacob',
    email: 'jake@jake.jake',
    password: 'jakejake',
  }

  const assert = (value: any) => expect(value).toEqual(userValid)

  pipe(
    userValid,
    createUserCodec.decode,
    E.map(assert),
    E.mapLeft(assert),
  )
})

it('should invalidade create user with invalid slug', () => {
  const userValid = {
    username: '1invalid-user',
    email: 'jake@jake.jake',
    password: 'jakejake',
  }

  const assert = (errors: any) => expect(errors[0].message).toBe('Invalid slug')

  pipe(
    userValid,
    createUserCodec.decode,
    E.map(assert),
    E.mapLeft(assert),
  )
})

it('should invalidade create user with invalid email', () => {
  const userValid = {
    username: 'user-valid',
    email: 'jakejake.jake',
    password: 'jakejake',
  }

  const assert = (errors: any) => expect(errors[0].message).toBe('Invalid email')

  pipe(
    userValid,
    createUserCodec.decode,
    E.map(assert),
    E.mapLeft(assert),
  )
})

it('should invalidade create user with invalid password', () => {
  const userValid = {
    username: 'user-valid',
    email: 'jake@jake.jake',
    password: 'ja',
  }

  const assert = (errors: any) => expect(errors[0].message).toBe('Invalid Password')

  pipe(
    userValid,
    createUserCodec.decode,
    E.map(assert),
    E.mapLeft(assert),
  )
})
