const express = require('express')
const router = express.Router()
const { Paycheck } = require('../../../../models')
const { auth } = require('../../../../middlewares/auth')

router.get('/', auth, async function (req, res, next) {
  const paychecks = await Paycheck.findAll()

  res.send(paychecks)
})

router.get('/:id', auth, async function (req, res, next) {
  const { id } = req.params
  const paycheck = await Paycheck.findOne({ where: { id } })

  res.send(paycheck)
})

router.post('/', auth, async function (req, res, next) {
  const paycheck = await Paycheck.build({
    ...req.body,
  }).save()

  res.status(201)
  res.send(paycheck)
})

router.delete('/:id', auth, async function (req, res, next) {
  const { id } = req.params
  await Paycheck.destroy({ where: { id } })

  res.status(204)
  res.send()
})

router.put('/:id', auth, async function (req, res, next) {
  const { id } = req.params
  const paycheck = await Paycheck.findOne({ where: { id } })

  paycheck.name = req.body.name

  paycheck.capacity = req.body.capacity

  paycheck.save()

  res.send(paycheck)
})

module.exports = router
