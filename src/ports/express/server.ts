import express from 'express'
import bodyParser from 'body-parser'
import { registerUser } from '@/core/user/use-case/register-user'

const app = express()

app.use(bodyParser.json()) // for parsing application/json
app.use(bodyParser.urlencoded({ extended: true })) // for parsing application/x-www-form-urlencoded

app.post('/api/users', (req, res) => {

  console.log(req.body)
  //registerUser(()=>{})(raq.body.user)
  res.json({ ok: 'Hello World!' })
})


const start = () => {
  const port = 3000
  app.listen(port, () => {
    console.log(`Example app listening on port ${port}`)
  })
}

export { start }
