const msgService = require('./msg.service.js')
const logger = require('../../services/logger.service')

module.exports = {
  getMsgs,
  addMsg,
  getChat,
  // deleteMsg,
}

async function getChat(req, res) {
  try {
    const topic = req.params
    console.log('back get chat topic:', topic);
    const chat = await msgService.query(topic)
    // console.log('back get chat:', chat);
    res.send(chat)
  } catch (err) {
    logger.error('Failed to get chat', err)
    res.status(500).send({ err: 'Failed to get chat' })
  }
}

async function getMsgs(req, res) {
  try {
    const filterBy = req.query
    const msgs = await msgService.query(filterBy)
    res.send(msgs)
  } catch (err) {
    logger.error('Failed to get msgs', err)
    res.status(500).send({ err: 'Failed to get msgs' })
  }
}

async function addMsg(req, res) {
  try {
    const msg = req.body
    console.log('msg crtl:',msg);
    const addedMsg = await msgService.addMsg(msg)
    res.send(addedMsg)
  } catch (err) {
    logger.error('Failed to add msg', err)
    res.status(500).send({ err: 'Failed to add msg' })
  }
}

// async function deleteMsg(req, res) {
//   try {
//     console.log('rev del ctrl', req.params._id);
//     await msgService.remove(req.params.id)
//     res.send({ msg: 'Deleted successfully' })
//   } catch (err) {
//     logger.error('Failed to delete msg', err)
//     res.status(500).send({ err: 'Failed to delete msg' })
//   }
// }
