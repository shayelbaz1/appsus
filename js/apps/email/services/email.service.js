import {utils} from '../../../services/utils.service.js'
export const emailService = {
  getEmails,
  getStaredMessages,
  setMsgStarById,
  deleteMsgById,
  getEmailById,
  sendEmail,
  addMsgToDraft,
  getDelMsgs,
  openEnvelope,
  setStarClass,
  getDraftEmails,
  getSentEmails,
  getUnreadMails
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
      toEmail: 'ggggg@gmail.com',
      envelopeClass: 'fa fa-envelope',
      starClass: 'fa fa-star-o',
      isSent: false
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
      toEmail: 'ggggg@gmail.com',
      envelopeClass: 'fa fa-envelope',
      starClass: 'fa fa-star-o',
      isSent: false
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
      toEmail: 'ggggg@gmail.com',
      envelopeClass: 'fa fa-envelope',
      starClass: 'fa fa-star-o',
      isSent: false
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
      toEmail: 'ggggg@gmail.com',
      envelopeClass: 'fa fa-envelope',
      starClass: 'fa fa-star-o',
      isSent: false
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
      toEmail: 'ggggg@gmail.com',
      envelopeClass: 'fa fa-envelope',
      starClass: 'fa fa-star-o',
      isSent: true
    },
    {
      id: utils.getRandomId(),
      sender: 'sharon',
      subject: 'hi chen how are you?',
      body: 'sos help us!!!!',
      isRead: false,
      sentAt: 545454,
      isStared: false,
      isDraft: false,
      senderEmail: 'xxxxx@gmail.com',
      toEmail: 'ggggg@gmail.com',
      envelopeClass: 'fa fa-envelope',
      starClass: 'fa fa-star-o',
      isSent: false
    },
  ]
  return emails
}

// function createEmail() {
//   console.log('created')
// }

function getSentEmails(){
  return gEmails.filter((email) => email.isSent)
}

function openEnvelope(msgId){
  let msg = getEmailById(msgId)
  msg.isRead = true
  msg.envelopeClass = 'fa fa-envelope-open'
}

function getUnreadMails(){
  return gEmails.filter((email) => !email.isRead)
}

function sendEmail(email) {
  email.id = utils.getRandomId()
  email.isSent = true
  gEmails.push(email)
}

function getDraftEmails(){
  return gEmails.filter((email) => email.isDraft)
}

function addMsgToDraft(email){
  email.id = utils.getRandomId()
  email.isDraft = true
  gEmails.push(email)
}

function setMsgStarById(msgId, isStarred) {
  let msg = getEmailById(msgId)
  msg.isStared = isStarred
}

function setStarClass(msgId, isStarred){
  let msg = getEmailById(msgId)
  msg.starClass = isStarred ? 'fa fa-star' : 'fa fa-star-o'
}

function deleteMsgById(msgId) {
  let msgIdx = gEmails.findIndex((email) => {
    return email.id === msgId
  })
  let deletedMsg = gEmails.splice(msgIdx, 1)
  gDelMsgs.push(deletedMsg[0])
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
