const express = require('express')
const router = express.Router()

const fruitsRouter = require('./fruits')
router.use('/fruits', fruitsRouter)

const paychecksRouter = require('./paychecks')
router.use('/paychecks', paychecksRouter)

const usersRouter = require('./users')
router.use('/users', usersRouter)

module.exports = router
