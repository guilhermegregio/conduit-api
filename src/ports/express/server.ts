import * as TE from 'fp-ts/TaskEither'
import express from 'express'
import { registerUser } from '@/core/user/use-case/register-user'
import { pipe } from 'fp-ts/lib/function'

const app = express()

app.use(express.json()) // for parsing application/json
app.use(express.urlencoded({ extended: true })) // for parsing application/x-www-form-urlencoded

app.post('/api/users', (req, res) => {
  return pipe(
    req.body.user,
    registerUser<any>(async (user) => ({ ...user, id: Date.now() })),
    TE.map((result) => {
      const { id, ...response } = result
      res.json({ user: { ...response, token: 'jwt.token' } })
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
