const express = require('express')
const cors = require('cors')
const bodyParser = require('body-parser')
const movementsData = require('./data/movements.json')
const usersData = require('./data/users.json')
const getPagedItems = require('./pagination')

const app = express.Router()
app.use(cors({ origin: true, exposedHeaders: 'Authorization' }))
app.use(bodyParser.urlencoded({ extended: false }))
app.use(bodyParser.json())

const getUserMovements = uid => {
  return movementsData.filter(movement => movement.account === uid)
}

exports.get = (req, res) => {
  const userMovements = getUserMovements(req.params.uid)
  res.json(getPagedItems(userMovements, req.query))
}

exports.myMovements = (req, res) => {
  const userMovements = getUserMovements(req.userData.uid)
  res.json(getPagedItems(userMovements, req.query))
}

const parseDate = (dateString, sum1Day = false) => {
  const protoDate = dateString.split('-').map((value, index) => {
    const val = parseInt(value, 10)
    if (index === 1) return val - 1
    if (index === 2 && sum1Day) return val + 1
    return val
  })
  const date = new Date(...protoDate)
  date.setMinutes(date.getMinutes() - date.getTimezoneOffset())
  return date
}

app.get('/:start/:end', (req, res) => {
  const { start, end } = req.params
  const records = JSON.parse(JSON.stringify(movementsData))
  records.sort((a, b) => {
    if (a.created_at > b.created_at) return 1
    if (a.created_at < b.created_at) return -1
    return 0
  })
  const sD = parseDate(start)
  const eD = parseDate(end, true)
  const retval = records.filter(record => {
    const rca = new Date(record.created_at).getTime()
    return rca >= sD.getTime() && rca <= eD.getTime()
  })
  if (retval.length > 50) return res.status(406).send('Hay más de 50 elementos')
  res.json(retval)
})

const getResume = records => {
  let credit = []
  let debit = []
  records.forEach(record => {
    if (record.type === 'credit') return credit.push(record.amount)
    debit.push(record.amount)
  })
  credit = credit.reduce((prev, current) => prev + current)
  debit = debit.reduce((prev, current) => prev + current, 0)
  return { credit, debit }
}

const resumen = () => {
  const records = JSON.parse(JSON.stringify(movementsData))
  const totalResume = getResume(records)
  const byUser = usersData.map(user => {
    const movements = records.filter(movement => {
      return movement.account === user.uid
    })
    const userResume = getResume(movements)
    const name = [
      user.nombre,
      user.segundo_nombre,
      user.apellido,
      user.segundo_apellido
    ]
      .filter(itm => itm !== '')
      .join(' ')
    return {
      name,
      uid: user.uid,
      records: movements.length,
      resumen: {
        credit: userResume.credit,
        debit: userResume.debit,
        balance: userResume.credit - userResume.debit
      }
    }
  })
  return {
    records, totalResume, byUser
  }
}

exports.resumen = resumen

app.get('/resumen', (_req, res) => {
  const { records, totalResume, byUser } = resumen()
  res.json({
    totalRecords: records.length,
    totalCredit: totalResume.credit,
    totalDebit: totalResume.debit,
    balance: totalResume.credit - totalResume.debit,
    byUser: byUser
  })
})

exports.routes = app
