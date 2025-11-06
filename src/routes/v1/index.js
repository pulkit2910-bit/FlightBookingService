const express = require('express');
const BookingController = require('../../controllers/booking-controller');

const router = express.Router();

router.post('/book', BookingController.createBooking);

module.exports = router;