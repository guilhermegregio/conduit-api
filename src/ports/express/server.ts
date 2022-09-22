import * as TE from 'fp-ts/TaskEither'
import express from 'express'
import { registerUser } from '@/core/user/use-case/register-user'
import { pipe } from 'fp-ts/lib/function'
import * as jose from 'jose'

const app = express()

app.use(express.json()) // for parsing application/json
app.use(express.urlencoded({ extended: true })) // for parsing application/x-www-form-urlencoded

const secret = Buffer.from('asdfasdfasdfasdfasfasdfsafasdfsadfasfsdfasfasdf')
const generateJWT = async (payload: any) => {
  return new jose.SignJWT(payload)
    .setProtectedHeader({ alg: 'HS256' })
    .setExpirationTime('2h')
    .sign(secret)
}

const verifyJWT = async (token: any) => {
  return jose.jwtVerify(token, secret)
}

app.post('/api/users', async (req, res) => {
  return pipe(
    req.body.user,
    registerUser<any>(async (user) => ({ ...user, id: Date.now() })),
    TE.map(async (result) => {
      const { id, ...response } = result
      const token = await generateJWT({ id })
      console.log(await verifyJWT(token))
      res.json({ user: { ...response, token } })
    }),
    TE.mapLeft((result) => res.json(result)),
  )()
})

const start = () => {
  const port = 3000
  app.listen(port, () => {
    console.log(`Example app listening on port ${port}`)
  })
}

export { start }
