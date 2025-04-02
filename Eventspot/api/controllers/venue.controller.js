import Venue from '../models/venue.model.js';

export const createVenue = async (req, res, next) => {
    try {
        const venue = await Venue.create({
            ...req.body,
            owner: req.user._id
        });

        res.status(201).json({
            success: true,
            data: venue
        });
    } catch (error) {
        next(error);
    }
};

export const getVenues = async (req, res, next) => {
    try {
        const venues = await Venue.find()
            .populate('owner', 'name')
            .populate('events', 'name date');

        res.status(200).json({
            success: true,
            data: venues
        });
    } catch (error) {
        next(error);
    }
};

export const getVenueById = async (req, res, next) => {
    try {
        const venue = await Venue.findById(req.params.id)
            .populate('owner', 'name')
            .populate('events', 'name date');

        if (!venue) {
            return res.status(404).json({
                success: false,
                message: 'Venue not found'
            });
        }

        res.status(200).json({
            success: true,
            data: venue
        });
    } catch (error) {
        next(error);
    }
};

export const updateVenue = async (req, res, next) => {
    try {
        const venue = await Venue.findByIdAndUpdate(
            req.params.id,
            req.body,
            { new: true, runValidators: true }
        );

        if (!venue) {
            return res.status(404).json({
                success: false,
                message: 'Venue not found'
            });
        }

        res.status(200).json({
            success: true,
            data: venue
        });
    } catch (error) {
        next(error);
    }
};