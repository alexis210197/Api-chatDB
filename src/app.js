//? Dependencies
const express = require('express')
const cors = require('cors')

//? Files
const config = require('../config')
const db = require('./utils/database')
const initModels = require('./models/initModels')
const userRouter = require('./users/users.router')
const authRouter = require('./auth/auth.router')
const conversationsRouter = require('./conversations/conversations.router')
const messageRouter = require('./messages/messages.router')
const participantRouter = require('./participants/participants.router')

//? Initial Configs

const app = express()
//? Enable incoming JSON data
app.use(express.json())
//? Enable CORS 
app.use(cors())

//? Authenticate DB
db.authenticate()
    .then(() => console.log('Database Authenticated'))
    .catch((err) => console.log(err))
//? Sync DataBase Models
db.sync()
    .then(() => console.log('Database Synced'))
    .catch(err => console.log(err))

//? Initialize my models relations
initModels()

//? Routes v1
app.get('/', (req, res) => {
    res.status(200).json({
        status: 200,
        message: 'Ok!',
        routes: {
            user: "/api/v1/users",
            users: "/api/v1/users/:id",
            myUser: "/api/v1/users/me",
            login: "/api/v1/auth/login",
            conversations: "/api/v1/conversations",
            conversation: "/api/v1/conversations/:conversation_id",
            messages: "/api/v1/conversations/:conversation_id/messages",
            message: "/api/v1/conversations/:conversation_id/messages/:message_id",
            participants: "/api/v1/conversations/:conversation_id/participants",
            participant: "/api/v1/conversations/:conversation_id/participants/:participants_id",
        }
    })
})

app.use('/api/v1/users', userRouter)
app.use('/api/v1/auth', authRouter)
app.use('/api/v1/conversations', conversationsRouter)
app.use('/api/v1/conversations', messageRouter)
app.use('/api/v1/conversations', participantRouter)


app.listen(config.api.port, () => {
    console.log(`Server started on ${config.api.host}`)
})
