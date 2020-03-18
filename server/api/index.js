const router = require('express').Router()
module.exports = router

router.use('/Users', require('./Users'))
router.use('/Games', require('./products'))
router.use('/Rounds', require('./Rounds'))
router.use('/Words', require('./Words'))

router.use((req, res, next) => {
  const error = new Error('Not Found')
  error.status = 404
  next(error)
})
