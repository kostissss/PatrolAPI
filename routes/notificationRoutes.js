const express = require('express');
const router = express.Router();
const dbFunctions = require('../dbFunctions/notificationFunctions');

// Retrieve all notifications
router.get('/', async (req, res) => {
    try {
        const notifications = await dbFunctions.getAllNotifications();
        res.status(200).json(notifications);
    } catch (error) {
        console.error('Error getting notifications:', error);
        res.status(500).json({ error: 'Error getting notifications' });
    }
});

// Retrieve a notification by ID
router.get('/:id', async (req, res) => {
    try {
        const notification = await dbFunctions.getNotificationById(req.params.id);
        res.status(200).json(notification);
    } catch (error) {
        console.error('Error getting notification:', error);
        res.status(500).json({ error: 'Error getting notification' });
    }
});

// Create a new notification
router.post('/', async (req, res) => {
    try {
        const newNotification = await dbFunctions.createNotification(req.body);
        res.status(201).json(newNotification);
    } catch (error) {
        console.error('Error creating notification:', error);
        res.status(500).json({ error: 'Error creating notification' });
    }
});

// Update a notification by ID
router.put('/:id', async (req, res) => {
    try {
        const updatedNotification = await dbFunctions.updateNotification(req.params.id, req.body);
        res.status(200).json(updatedNotification);
    } catch (error) {
        console.error('Error updating notification:', error);
        res.status(500).json({ error: 'Error updating notification' });
    }
});

// Delete a notification by ID
router.delete('/:id', async (req, res) => {
    try {
        const deletedNotification = await dbFunctions.deleteNotification(req.params.id);
        res.status(200).json(deletedNotification);
    } catch (error) {
        console.error('Error deleting notification:', error);
        res.status(500).json({ error: 'Error deleting notification' });
    }
});

module.exports = router;
