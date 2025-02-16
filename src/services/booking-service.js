const { FLIGHT_SEARCH_SERVICE_URL } = require('../config/serverConfig');
const {BookingRepository} = require('../repository/index');
const axios = require("axios");
const ServiceError = require('../utils/errors/service-error');

class BookingService {
    constructor() {
        this.bookingRepository = new BookingRepository();
    }

    async createBooking(data) {
        try {
            const flightId = data.flightId;
            const FlightRequestURL = `${FLIGHT_SEARCH_SERVICE_URL}/v1/flight/${flightId}`;
            
            const response = await axios.get(FlightRequestURL);
            const flightData = response.data.data;
            let priceOfTheFlight = flightData.price;
            if(data.noOfSeats > flightData.total_seats) {
                throw new ServiceError('Something went wrong in the booking process', 'Insufficient seats in the flight');
            }

            const totalCost = priceOfTheFlight * data.noOfSeats;
            const bookingPayload = {...data, bookingAmount: totalCost};
            const booking = await this.bookingRepository.create(bookingPayload);

            // console.log(updateFlightRequestURL);
            await axios.patch(FlightRequestURL, {total_seats: flightData.total_seats - booking.noOfSeats});
            const finalBooking = await this.bookingRepository.update(booking.id, {status: "APPROVED"});
            return finalBooking;           

        } catch (error) {
            console.log(error);
            if(error.name == 'RepositoryError' || error.name == 'ValidationError') {
                throw error;
            }
            throw new ServiceError();
        }
    }
}

module.exports = BookingService;