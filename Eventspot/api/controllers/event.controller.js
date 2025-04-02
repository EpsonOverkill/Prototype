import Event from '../models/event.model.js';
import Venue from '../models/venue.model.js';
import Booking from '../models/booking.model.js';

export const createEvent = async (req, res, next) => {
    try {
        const event = await Event.create({
            ...req.body,
            creator: req.user._id
        });

        // Update venue's event count
        if (req.body.venueId) {
            await Venue.findByIdAndUpdate(req.body.venueId, {
                $inc: { eventCount: 1 }
            });
        }

        res.status(201).json({
            success: true,
            data: event
        });
    } catch (error) {
        next(error);
    }
};

export const getEvents = async (req, res, next) => {
    try {
        const events = await Event.find()
            .populate('venueId', 'name location')
            .populate('creator', 'name');

        res.status(200).json({
            success: true,
            data: events
        });
    } catch (error) {
        next(error);
    }
};

export const getEventById = async (req, res, next) => {
    try {
        const event = await Event.findById(req.params.id)
            .populate('venueId', 'name location')
            .populate('creator', 'name');

        if (!event) {
            return res.status(404).json({
                success: false,
                message: 'Event not found'
            });
        }

        res.status(200).json({
            success: true,
            data: event
        });
    } catch (error) {
        next(error);
    }
};

export const updateEvent = async (req, res, next) => {
    try {
        const event = await Event.findByIdAndUpdate(
            req.params.id,
            req.body,
            { new: true, runValidators: true }
        );

        if (!event) {
            return res.status(404).json({
                success: false,
                message: 'Event not found'
            });
        }

        res.status(200).json({
            success: true,
            data: event
        });
    } catch (error) {
        next(error);
    }
};

export const deleteEvent = async (req, res, next) => {
    try {
        const event = await Event.findById(req.params.id);

        if (!event) {
            return res.status(404).json({
                success: false,
                message: 'Event not found'
            });
        }

        // Delete associated bookings
        await Booking.deleteMany({ eventId: event._id });

        // Update venue's event count
        if (event.venueId) {
            await Venue.findByIdAndUpdate(event.venueId, {
                $inc: { eventCount: -1 }
            });
        }

        await event.deleteOne();

        res.status(200).json({
            success: true,
            message: 'Event deleted successfully'
        });
    } catch (error) {
        next(error);
    }
};