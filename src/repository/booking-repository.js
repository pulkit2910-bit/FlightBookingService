const { StatusCodes } = require('http-status-codes');
const {Booking} = require('../models/index');
const AppError = require('../utils/errors/app-error');
const ValidationError = require('../utils/errors/validation-error');

class BookingRepository {
    async create(data) {
        try {
            const response = await Booking.create(data);
            return response;
        } catch (error) {
            if(error.name == 'SequelizeValidationError') {
                throw new ValidationError(error);
            }
            throw new AppError(
                'RepositoryError', 
                'Cannot create Booking', 
                'There was some issue creating the booking, please try again later',
                StatusCodes.INTERNAL_SERVER_ERROR);
        }
    }

    async update(bookingId, data) {
        try {
            await Booking.update(data, {
                where: {
                    id: bookingId
                }
            });
            const booking = await Booking.findByPk(bookingId);
            // console.log(booking);
            
            return booking;
        } catch (error) {
            throw new AppError(
                'RepositoryError', 
                'Cannot update Booking', 
                'There was some issue updating the booking, please try again later',
                StatusCodes.INTERNAL_SERVER_ERROR);
        }
    }
}

module.exports = BookingRepository;