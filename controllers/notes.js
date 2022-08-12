const router = require('express').Router()

const { Note } = require('../models')

router.get('/', async (req, res) => {
  // const notes = await sequelize.query("SELECT * FROM notes", { type: QueryTypes.SELECT })
  const notes = await Note.findAll()
  res.json(notes)
})

router.post('/', async (req, res) => {
  try {
    const note = await Note.create(req.body)
    res.json(note)
  } catch (error) {
    return res.status(400).json({ error })
  }
})

const noteFinder = async (req, res, next) => {
  req.note = await Note.findByPk(req.params.id)
}

router.get('/:id', noteFinder, async (req, res) => {
  // const note = await Note.findByPk(req.params.id)
  if (req.note) {
    console.log(req.note)
    res.json(req.note)
  } else {
    res.status(404).end()
  }
})

router.delete('/:id', noteFinder, async (req, res) => {
  // const note = await Note.findByPk(req.params.id)
  if (req.note) {
    console.log(req.note)
    await req.note.destroy()
  } else {
    res.status(204).end()
  }
})

router.put('/:id', noteFinder, async (req, res) => {
  // const note = await Note.findByPk(req.params.id)
  if (req.note) {
    req.note.important = req.body.important
    await req.note.note.save()
    res.json(req.note)
  } else {
    res.status(404).end()
  }
})

module.exports = router