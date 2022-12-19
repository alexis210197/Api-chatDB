const router = require('express').Router()
const ownerValidate = require('../middlewares/ownerValidate.middleware')

const participantServices = require('./participants.services')
const passportJWT = require('../middlewares/auth.middleware')

router.route('/:conversation_id/participants')
    .post(participantServices.postParticipant)

router.route('/:conversation_id/participants/:participants_id')
    .delete(passportJWT.authenticate('jwt', {session: false}), ownerValidate, participantServices.deleteParticipant)

module.exports = router