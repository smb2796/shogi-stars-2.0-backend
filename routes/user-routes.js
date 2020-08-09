const express = require('express');
const { check } = require('express-validator');

const scanControllers = require('../controllers/scan-controller');
const router = express.Router();
const checkAuth = require('../middleware/check-auth');

router.use(checkAuth);

router.get('/scans', scanControllers.getScans);

router.get('/scan/:scanId', scanControllers.getScansById);

router.post('/', 
    [
        check('scanName')
            .not()
            .isEmpty(),
        check('gtin').isLength({min: 5})
    ],
    scanControllers.createScan);

router.patch('/scan/:scanId', scanControllers.updateScanById);

module.exports = router;