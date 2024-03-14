const express = require('express');
const router = express.Router();
const Notification = require('../models/notification');
const db = require('../models');


router.get('/', async (req, res) => {
    try {
        const notifications = await db.Notification.findAll();
        res.status(200).json(notifications);
    } catch (error) {
        console.error('Error getting notifications:', error);
        res.status(500).send('Error getting notifications');
    }
});


router.get('/:id', async (req, res) => {
    try {
        const notification = await db.Notification.findByPk(req.params.id);
        if (!notification) {
            return res.status(404).send('Notification not found');
        }
        res.status(200).json(notification);
    } catch (error) {
        console.error('Error getting notification:', error);
        res.status(500).send('Error getting notification');
    }
});


router.post('/', async (req, res) => {
    try {
        const newNotification = await db.Notification.create(req.body);
        res.status(201).json(newNotification);
    } catch (error) {
        console.error('Error creating notification:', error);
        res.status(500).send('Error creating notification');
    }
});


router.put('/:id', async (req, res) => {
    try {
        const notification = await db.Notification.findByPk(req.params.id);
        if (!notification) {
            return res.status(404).send('Notification not found');
        }
        await notification.update(req.body);

        res.status(200).json(notification);
    } catch (error) {
        console.error('Error updating notification:', error);
        res.status(500).send('Error updating notification');
    }
});


router.delete('/:id', async (req, res) => {
    try {
        const notification = await db.Notification.findByPk(req.params.id);
        if (!notification) {
            return res.status(404).send('Notification not found');
        }

        await notification.destroy();
        res.status(200).json(notification);
    } catch (error) {
        console.error('Error deleting notification:', error);
        res.status(500).send('Error deleting notification');
    }
});

module.exports = router;


