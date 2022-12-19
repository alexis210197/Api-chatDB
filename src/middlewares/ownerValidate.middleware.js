const {findConversationById} = require('../conversations/conversations.controllers')

const ownerValidate = (req,res,next)=>{
    const conversationId = req.params.conversation_id
    const userId = req.user.id
    findConversationById(conversationId)
    .then(data=>{
        if (data.user.id == userId ) { //? el primero es el del token y el segundo el de la conversacion.
            next()
        }else{
            res.status(400).json({message: 'Only the owner can delete it'})
        }
    })
    .catch(err=> res.status(400).json({message: err.message}))
}

module.exports = ownerValidate