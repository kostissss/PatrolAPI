const express = require('express');
const router = express.Router();
const Notification = require('../models/notification');
const dbFunctions = require('../dbFunctions/notificationFunctions');


router.get('/', async (req, res) => {
    try {
        const notifications = dbFunctions.getAllNotifications();
        res.status(200).json(notifications);
    } catch (error) {
        console.error('Error getting notifications:', error);
        res.status(500).send('Error getting notifications');
    }
});


router.get('/:id', async (req, res) => {
    try {
        const notification = dbFunctions.getNotificationById(req.params.id);
        res.status(200).json(notification);
    } catch (error) {
        console.error('Error getting notification:', error);
        res.status(500).send('Error getting notification');
    }
});


router.post('/', async (req, res) => {
    try {
        const newNotification = dbFunctions.createNotification(req.body);
        res.status(201).json(newNotification);
    } catch (error) {
        console.error('Error creating notification:', error);
        res.status(500).send('Error creating notification');
    }
});


router.put('/:id', async (req, res) => {
    try {
        const updatedNotification = dbFunctions.updateNotification(req.params.id, req.body);

        res.status(200).json(updatedNotification);
    } catch (error) {
        console.error('Error updating notification:', error);
        res.status(500).send('Error updating notification');
    }
});


router.delete('/:id', async (req, res) => {
    try {
        const deletedNotification = dbFunctions.deleteNotification(req.params.id);
        res.status(200).json(deletedNotification);
    } catch (error) {
        console.error('Error deleting notification:', error);
        res.status(500).send('Error deleting notification');
    }
});

module.exports = router;


