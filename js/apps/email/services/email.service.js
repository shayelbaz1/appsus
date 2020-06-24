import {utils} from '../../../services/utils.service.js'
export const emailService = {
  getEmails,
  getStaredMessages,
  setMsgStarById,
  deleteMsgById,
  getEmailById,
  sendEmail,
  addMsgToDraft,
  getDelMsgs
}

var gEmails = _createEmails()
var gDelMsgs = []

function getEmails() {
  return Promise.resolve(gEmails)
}

function _createEmails() {
  let emails = [
    {
      id: utils.getRandomId(),
      sender: 'shai',
      subject: 'hi dan how are you?',
      body: 'yo man hows it hanging!!!!',
      isRead: false,
      sentAt: 2121121212,
      isStared: false,
      isDraft: false,
      senderEmail: 'xxxxx@gmail.com',
      toEmail: 'ggggg@gmail.com'
    },
    {
      id: 'csdcdsd3',
      sender: 'yotam',
      subject: 'he',
      body: 'perhaps later!!!!',
      isRead: false,
      sentAt: 2124321212,
      isStared: false,
      isDraft: false,
      senderEmail: 'xxxxx@gmail.com',
      toEmail: 'ggggg@gmail.com'
    },
    {
      id: utils.getRandomId(),
      sender: 'rotem',
      subject: 'hi avi how are you?',
      body: 'just the twov of us!!!!',
      isRead: false,
      sentAt: 344333,
      isStared: false,
      isDraft: false,
      senderEmail: 'xxxxx@gmail.com',
      toEmail: 'ggggg@gmail.com'
    },
    {
      id: utils.getRandomId(),
      sender: 'shmuel',
      subject: 'hi ron how are you?',
      body: 'sos help them!!!!',
      isRead: false,
      sentAt: 65566565,
      isStared: false,
      isDraft: false,
      senderEmail: 'xxxxx@gmail.com',
      toEmail: 'ggggg@gmail.com'
    },
    {
      id: utils.getRandomId(),
      sender: 'diana',
      subject: 'hi dani how are you?',
      body: 'sos help you!!!!',
      isRead: false,
      sentAt: 4545445,
      isStared: false,
      isDraft: false,
      senderEmail: 'xxxxx@gmail.com',
      toEmail: 'ggggg@gmail.com'
    },
    {
      id: utils.getRandomId(),
      sender: 'sharon',
      subject: 'hi chen how are you?',
      body: 'sos help us!!!!',
      isRead: true,
      sentAt: 545454,
      isStared: false,
      isDraft: false,
      senderEmail: 'xxxxx@gmail.com',
      toEmail: 'ggggg@gmail.com'
    },
  ]
  return emails
}

function createEmail() {
  console.log('created')
}

function sendEmail(email) {
  email.id = utils.getRandomId()
  gEmails.push(email)
}

function addMsgToDraft(email){
  email.id = utils.getRandomId()
  email.isDraft = true
  gEmails.push(email)
}

function setMsgStarById(msgId) {
  let msg = gEmails.find((email) => {
    return email.id === msgId
  })
  msg.isStared = true
}

function deleteMsgById(msgId) {
  let msgIdx = gEmails.findIndex((email) => {
    return email.id === msgId
  })
  let deletedMsg = gEmails.splice(msgIdx, 1)
  gDelMsgs.push(deletedMsg)
}

function getDelMsgs() {
  return Promise.resolve(gDelMsgs)
}

function getEmailById(msgId) {
  return gEmails.find((email) => {
    return email.id === msgId
  })
}

function getStaredMessages() {
  return gEmails.filter((email) => email.isStared)
}
