const regformModel = require('../models/Regform');
const Event = require("../models/event");

exports.regformCreate = async (req, res) => {
    try {
        // Get data from request body
        const { name, email, college, branch, semester, phoneno, eventID } = req.body;

        // Validate required fields
        if (!name || !email || !college || !branch || !semester || !phoneno || !eventID) {
            return res.status(400).json({ 
                success: false,
                message: 'All fields are required.' 
            });
        }

        // Check if the event exists
        const event = await Event.findById(eventID);
        if (!event) {
            return res.status(404).json({
                success: false,
                message: "Event not found.",
            });
        }

        // Check if the user already registered for the event
        const existingUser = await regformModel.findOne({ email, event: eventID });
        if (existingUser) {
            return res.status(409).json({
                success: false,
                message: 'User is already registered for this event.',
            });
        }

        // Create a new registration entry
        const newRegistration = await regformModel.create({
            name,
            email,
            college,
            branch,
            semester,
            phoneno,
            event: event._id,
        });

        // Add the user ID to the event's user array
        event.user.push(newRegistration._id);
        await event.save();

        // Send a success response
        res.status(201).json({
            success: true,
            message: 'Registration created successfully.',
            registration: newRegistration,
        });
    } catch (error) {
        console.error("Error during registration form creation:", error.message);

        // Handle database or server errors
        res.status(500).json({
            success: false,
            message: error.message || "Internal server error.",
        });
    }
};
