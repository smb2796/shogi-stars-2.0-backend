
const HttpError = require('../models/http-error');
const { validationResult } = require('express-validator');

const exampleScans = [
    {
        scanId: 'ex1',
        scanName: 'medicine',
        gtin: '12346123571234',
        description: {
            qty: 1325,
            color: 'blue'
        }
    }
];

const getScansById = (req, res, next) => {
    const scanId = req.params.scanId;
    const scans = exampleScans.filter(foundScan => {
        return foundScan.scanId === scanId;
    });

    if(!scans || scans.length === 0) {
        
        return next(new HttpError('Could not find scans by this id', 404));
    }
    console.log('GET scan by scan id');
    res.json({scan: scan});
}

const getScans = (req, res, next) => {
    res.json({scans: exampleScans});
}

const createScan = (req, res, next) => {
    const errors = validationResult(req);
    if(!errors.isEmpty()) {
        throw new HttpError('Invalid inputs', 422);
    }
    const { scanId, scanName, gtin } = req.body;

    const createdScan = {
        scanId,
        scanName,
        gtin
    }

    exampleScans.push(createdScan);

    res.status(201).json({scan: createdScan});
}

const updateScanById = (req, res, next) => {
    const { scanName, gtin } = req.body;
    const scanId = req.params.scanId;

    const updatedScan = { ...exampleScans.find(scan => scan.scanId === scanId) };
    const scanIndex = exampleScans.findIndex(scan => scan.scanId === scanId);

    updatedScan.scanName = scanName;
    updatedScan.gtin = gtin;

    exampleScans[scanIndex] = updatedScan;
    res.status(200).json({scan: updatedScan});

};


exports.getScansById = getScansById;
exports.getScans = getScans;
exports.createScan = createScan;
exports.updateScanById = updateScanById;