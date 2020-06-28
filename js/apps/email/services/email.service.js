import { utils } from '../../../services/utils.service.js'
export const emailService = {
  getEmails,
  getStaredMessages,
  setMsgStarById,
  deleteMsgById,
  getEmailById,
  sendEmail,
  addMsgToDraft,
  openEnvelope,
  setStarClass,
  getUnreadMails,
  getEmailsByListType,
  sortBySubject,
  sortByDate,
  sortByType
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
      subject: 'Checking up',
      body: 'yo man hows it hanging!!!!yo man hows it hanging!!!!yo man hows it hanging!!!!yo man hows it hanging!!!!',
      isRead: false,
      sentAt: 2121121212,
      isStared: false,
      isDraft: false,
      senderEmail: 'shai@gmail.com',
      toEmail: 'asaf@gmail.com',
      envelopeClass: 'fa fa-envelope',
      starClass: 'fa fa-star-o',
      isSent: false,
    },
    {
      id: 'csdcdsd3',
      sender: 'yotam',
      subject: 'lunch?',
      body: 'Let go and have something to eat, and then get another something to eat later',
      isRead: false,
      sentAt: 2124321212,
      isStared: false,
      isDraft: false,
      senderEmail: 'yotam@gmail.com',
      toEmail: 'benel@gmail.com',
      envelopeClass: 'fa fa-envelope',
      starClass: 'fa fa-star-o',
      isSent: false,
    },
    {
      id: utils.getRandomId(),
      sender: 'rotem',
      subject: 'Movie Night',
      body: 'Hi Guys I want to invite you next week to our house for movie night. decline at your own risk',
      isRead: false,
      sentAt: 344333,
      isStared: false,
      isDraft: false,
      senderEmail: 'rotem@gmail.com',
      toEmail: 'avi@gmail.com',
      envelopeClass: 'fa fa-envelope',
      starClass: 'fa fa-star-o',
      isSent: false,
    },
    {
      id: utils.getRandomId(),
      sender: 'shmuel',
      subject: 'to Rotem',
      body: 'Hi rotem hows it handing its been a long time since we last spke',
      isRead: false,
      sentAt: 6556656576778,
      isStared: false,
      isDraft: false,
      senderEmail: 'shmuel@gmail.com',
      toEmail: 'rotem@gmail.com',
      envelopeClass: 'fa fa-envelope',
      starClass: 'fa fa-star-o',
      isSent: false,
    },
    {
      id: utils.getRandomId(),
      sender: 'diana',
      subject: 'Project Rework',
      body: 'About the new project, it failed please do a complete rework',
      isRead: false,
      sentAt: 454544588978,
      isStared: false,
      isDraft: false,
      senderEmail: 'diana@gmail.com',
      toEmail: 'ron@gmail.com',
      envelopeClass: 'fa fa-envelope',
      starClass: 'fa fa-star-o',
      isSent: true,
    },
    {
      id: utils.getRandomId(),
      sender: 'sharon',
      subject: 'Immidiate rescue',
      body: 'sos help us!!!! we are in the middle of the sea',
      isRead: false,
      sentAt: 545454878987,
      isStared: false,
      isDraft: false,
      senderEmail: 'xxxxx@gmail.com',
      toEmail: 'ggggg@gmail.com',
      envelopeClass: 'fa fa-envelope',
      starClass: 'fa fa-star-o',
      isSent: false,
    },
  ]
  return emails
}

function sortBySubject(){
  gEmails.sort((firstEmail, secondEmail) => {
    var subjA = firstEmail.subject.toUpperCase(); // ignore upper and lowercase
    var subjB = secondEmail.subject.toUpperCase(); // ignore upper and lowercase
    if (subjA < subjB) return -1;
    if (subjA > subjB) return 1;
    // names must be equal
    return 0;
  });
}

function sortByType(sortType){
  if (sortType === 'title') sortBySubject()
  else sortByDate()
}

function sortByDate(){
  gEmails.sort((firstEmail, secondEmail) => {
    return new Date(firstEmail.sentAt) - new Date(secondEmail.sentAt);
  });
}

function getEmailsByListType(listType) {
  let emails
  switch (listType) {
    case 'starred':
      emails = getStaredMessages()
      break
    case 'sent':
      emails = getSentEmails()
      break
    case 'draft':
      emails = getDraftEmails()
      break
    case 'deleted':
      emails = getDelMsgs()
      break
    case 'list':
      emails = getEmails()
      break
  }
  return Promise.resolve(emails)
}

function getSentEmails() {
  return gEmails.filter((email) => email.isSent)
}

function openEnvelope(msgId) {
  let msg = getEmailById(msgId)
  msg.isRead = true
  msg.envelopeClass = 'fa fa-envelope-open'
}

function getUnreadMails() {
  return gEmails.filter((email) => !email.isRead)
}

function sendEmail(email) {
  email.id = utils.getRandomId()
  gEmails.push(email)
}

function getDraftEmails() {
  return gEmails.filter((email) => email.isDraft)
}

function addMsgToDraft(email) {
  email.id = utils.getRandomId()
  email.isDraft = true
  email.starClass = 'fa fa-star-o',
  email.envelopeClass = 'fa fa-envelope'
  gEmails.push(email)
}

function setMsgStarById(msgId, isStarred) {
  let msg = getEmailById(msgId)
  msg.isStared = isStarred
}

function setStarClass(msgId, isStarred) {
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
  return gDelMsgs
}

function getEmailById(msgId) {
  return gEmails.find((email) => email.id === msgId)
}

function getStaredMessages() {
  return gEmails.filter((email) => email.isStared)
}
