
const School = require('../models/schoolModel');
const getDistance = require('../utils/distance');

const addSchool = async (req, res) => {
    try {
        const { name, address, latitude, longitude } = req.body;
        console.log("Request body received:", name, address, latitude, longitude);
       
        if (!name || !address || latitude === undefined || longitude === undefined) {
            return res.status(400).json({ message: 'All fields are required' });
        }
        if (isNaN(latitude) || isNaN(longitude)) {
            return res.status(400).json({ message: 'Latitude and longitude must be numbers' });
        }

        await School.add(name, address, parseFloat(latitude), parseFloat(longitude));
        res.status(201).json({ message: 'School added successfully' });

    } catch (error) {
        res.status(500).json({ message: 'Error adding school', error: error.message });
    }
};

const listSchools = async (req, res) => {
    try {
        const { latitude, longitude } = req.query;

        if (!latitude || !longitude || isNaN(latitude) || isNaN(longitude)) {
            return res.status(400).json({ message: 'Latitude and longitude are required and must be numbers' });
        }

        const schools = await School.getAll();
        const userLat = parseFloat(latitude);
        const userLon = parseFloat(longitude);

        const sortedSchools = schools.map(school => ({
            ...school,
            distance: getDistance(userLat, userLon, school.latitude, school.longitude)
        })).sort((a, b) => a.distance - b.distance);

        res.json(sortedSchools);

    } catch (error) {
        res.status(500).json({ message: 'Error listing schools', error: error.message });
    }
};
module.exports = {
    addSchool,
    listSchools
};