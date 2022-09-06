import * as t from 'io-ts'
import { withMessage } from 'io-ts-types'

interface EmailBrand {
  readonly Email: unique symbol // use `unique symbol` here to ensure uniqueness across modules / packages
}

const isEmail = (value: string) => {
  return /^[a-zA-Z0-9.!#$%&’*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/.test(value)
}

const emailCodec = withMessage(t.brand(
  t.string,
  (value): value is t.Branded<string, EmailBrand> => isEmail(value),
  'Email', // the name must match the readonly field in the brand
), () => 'Invalid email')

type Email = t.TypeOf<typeof emailCodec>

export { emailCodec, Email }
