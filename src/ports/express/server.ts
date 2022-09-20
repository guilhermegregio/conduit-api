import * as TE from 'fp-ts/TaskEither'
import express from 'express'
import bodyParser from 'body-parser'
import { registerUser } from '@/core/user/use-case/register-user'
import { pipe } from 'fp-ts/lib/function'

const app = express()

app.use(bodyParser.json()) // for parsing application/json
app.use(bodyParser.urlencoded({ extended: true })) // for parsing application/x-www-form-urlencoded

app.post('/api/users', (req, res) => {
  return pipe(
    req.body.user,
    registerUser<string>(async () => 'sucesso'),
    TE.map(result => res.json(result)),
    TE.mapLeft(result => res.json(result)),
  )()
})

const start = () => {
  const port = 3000
  app.listen(port, () => {
    console.log(`Example app listening on port ${port}`)
  })
}

export { start }
