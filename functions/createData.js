const faker = require('faker')

const guid = () => {
  const s4 = () => {
    return Math.floor((1 + Math.random()) * 0x10000)
      .toString(16)
      .substring(1)
  }
  return s4() + s4() + '-' + s4() + '-' + s4() + '-' + s4() + '-' + s4() + s4() + s4()
}

const randomDate = (start, end) => {
  return new Date(
    start.getTime() + Math.random() * (end.getTime() - start.getTime())
  )
}

const users = [...new Array(115)]
  .map(() => {
    return {
      nombre: faker.name.firstName(),
      apellido: faker.name.lastName(),
      segundo_nombre: [faker.name.firstName(), ''][Math.round(Math.random() * 1)],
      segundo_apellido: [faker.name.lastName(), ''][Math.round(Math.random() * 1)],
      uid: guid(),
      email: faker.internet.email(),
      password: '69003f795bb35f550f41ded5348c82a1',
      active: [true, false][Math.round(Math.random())],
      created_at: randomDate(new Date(2017, 0, 1), new Date(2017, 11, 31))
    }
  })

const getRandomDesc = type => {
  const descs = {
    credit: ['Depósito a cuenta', 'Transferencia', 'Reenbolso', 'Cancelación'],
    debit: ['Compra Oxxo', 'Disposición de efectivo', 'Manejo de cuenta', 'Comisión de servicio']
  }[type]
  return descs[Math.floor(Math.random() * descs.length)]
}

const userMovements = users
  .map(user => {
    const maxMoney = Math.round(Math.random() * 2000 + 1000)
    const count = Math.round(Math.random() * 15) + 5
    return [...new Array(count)].map((_item, key) => {
      const random = Math.round(Math.random())
      let type = ['debit', 'credit'][random]
      let amount = Math.round(Math.random() * (maxMoney / count) * 100)
      if (key === 0) {
        type = 'credit'
        amount = maxMoney * 100
      }
      return {
        uid: guid(),
        account: user.uid,
        amount,
        type,
        description: getRandomDesc(type),
        created_at: randomDate(new Date(2018, 0, 1), new Date())
      }
    })
  })
  .reduce((prev, current) => {
    return prev.concat(current)
  })

require('fs').writeFileSync('./data/users.json', JSON.stringify(users, false, 2), { encoding: 'utf8' })
require('fs').writeFileSync('./data/movements.json', JSON.stringify(userMovements, false, 2), { encoding: 'utf8' })
