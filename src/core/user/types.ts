import * as t from 'io-ts'
import { emailCodec } from '../types/email'
import { passwordCodec } from '../types/password'
import { slugCodec } from '../types/slug'

const userCodecRequired = t.type({
  email: t.string,
  token: t.string,
  username: t.string,
  bio: t.string,
})

const userCodecPartial = t.partial({
  image: t.string,
})

const userCodec = t.intersection([userCodecRequired, userCodecPartial])

type User = t.TypeOf<typeof userCodec>

const createUserCodec = t.type({
  username: slugCodec,
  email: emailCodec,
  password: passwordCodec,
})

type CreateUser = t.TypeOf<typeof createUserCodec>

export { userCodec, User, createUserCodec, CreateUser }
