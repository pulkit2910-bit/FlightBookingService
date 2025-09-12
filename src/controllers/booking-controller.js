const { BookingService } = require('../services/index');

const bookingService = new BookingService();

const createBooking = async (req, res) => {
    try {
        const bookingData = req.body;
        console.log(bookingData);
        
        const response = await bookingService.createBooking(bookingData);
        res.status(201).json({
            data : response,
            success : true,
            message : "Booking created successfully",
            err : {}
        });
    } catch (error) {
        res.status(500).json({
            data : {},
            success : false,
            message : "Error creating booking",
            err : error
        });
    }
};

module.exports = {
    createBooking
};