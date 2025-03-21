const express = require('express')
const router = express.Router()
const commonController = require('../Controller/commonController')

router.post('/login',commonController.adminLogin)
router.post('/search',commonController.dataCollection)
router.get('/fetchdata',commonController.fetchData  )

module.exports = router