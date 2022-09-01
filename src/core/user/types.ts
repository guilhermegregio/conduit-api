import * as t from 'io-ts'

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

export { userCodec, User }
