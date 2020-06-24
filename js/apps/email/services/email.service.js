export const emailService = {
  getEmails,
  getStaredMessages,
  setMsgStarById,
  deleteMsgById,
  getEmailById
}

var gEmails = _createEmails()

function getEmails() {
  return Promise.resolve(gEmails)
}

function _createEmails() {
  let emails = [
    {
      id: 'csdcdds4',
      sender: 'shai',
      subject: 'hi dan how are you?',
      body: 'yo man hows it hanging!!!!',
      isRead: false,
      sentAt: 2121121212,
      isStared: false,
    },
    {
      id: 'csdcdsd3',
      sender: 'yotam',
      subject: 'he',
      body: 'perhaps later!!!!',
      isRead: false,
      sentAt: 2124321212,
      isStared: false,
    },
    {
      id: 'cdscss2',
      sender: 'rotem',
      subject: 'hi avi how are you?',
      body: 'just the twov of us!!!!',
      isRead: false,
      sentAt: 344333,
      isStared: false,
    },
    {
      id: 'dcscdssd3',
      sender: 'shmuel',
      subject: 'hi ron how are you?',
      body: 'sos help them!!!!',
      isRead: false,
      sentAt: 65566565,
      isStared: false,
    },
    {
      id: 'cscsdcds67',
      sender: 'diana',
      subject: 'hi dani how are you?',
      body: 'sos help you!!!!',
      isRead: false,
      sentAt: 4545445,
      isStared: false,
    },
    {
      id: 'cdcdscd56',
      sender: 'sharon',
      subject: 'hi chen how are you?',
      body: 'sos help us!!!!',
      isRead: false,
      sentAt: 545454,
      isStared: false,
    },
  ]
  return emails
}

function createEmail() {
  console.log('created')
}

function sendEmail(email) {
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
  gEmails.splice(msgIdx, 1)
}

function getEmailById(msgId) {
  return gEmails.find((email) => {
    return email.id === msgId
  })
}

function getStaredMessages() {
  return (staredMsgs = gEmails.filter((email) => email.isStared))
}
