require('dotenv').config()
// const { Sequelize, QueryTypes } = require('sequelize')
const { Sequelize, Model, DataTypes } = require('sequelize')
const express = require('express')
const app = express()
app.use(express.json())

const sequelize = new Sequelize(process.env.DATABASE_URL, {
  dialectOptions: {
    ssl: {
      require: true,
      rejectUnauthorized: false
    }
  },
})

class Note extends Model {}
Note.init({
  id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true
  },
  content: {
    type: DataTypes.TEXT,
    allowNull: false
  },
  important: {
    type: DataTypes.BOOLEAN
  },
  date: {
    type: DataTypes.DATE
  }
}, {
  sequelize,
  underscored: true,
  timestamps: false,
  modelName: 'note'
})

app.get('/api/notes', async (req, res) => {
  // const notes = await sequelize.query("SELECT * FROM notes", { type: QueryTypes.SELECT })
  const notes = await Note.findAll()
  res.json(notes)
})


app.post('/api/notes', async (req, res) => {
  console.log(req.body)
  const note = await Note.create(req.body)
  res.json(note)
})

const PORT = process.env.PORT || 3001
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`)
})



// const main = async () => {
//   try {
//     await sequelize.authenticate()
//     // console.log('Connection has been established successfully.')
//     const notes = await sequelize.query("SELECT * FROM notes", { type: QueryTypes.SELECT })
//     console.log(notes)
//     sequelize.close()
//   } catch (error) {
//     console.error('Unable to connect to the database:', error)
//   }
// }

// main()

// const express = require('express')
// const path = require('path')
// const PORT = process.env.PORT || 5000

// express()
//   .use(express.static(path.join(__dirname, 'public')))
//   .set('views', path.join(__dirname, 'views'))
//   .set('view engine', 'ejs')
//   .get('/', (req, res) => res.render('pages/index'))
//   .listen(PORT, () => console.log(`Listening on ${ PORT }`))