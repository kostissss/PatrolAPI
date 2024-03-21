const db = require('../models');

async function getAllNotifications() {
  try {
    const notifications = await db.Notification.findAll();
    return notifications;
  } catch (error) {
    throw new Error('Error getting notifications');
  }
}

async function getNotificationById(id) {
  try {
    const notification = await db.Notification.findByPk(id);
    if (!notification) {
      throw new Error('Notification not found');
    }
    return notification;
  } catch (error) {
    throw new Error('Error getting notification by ID');
  }
}

async function createNotification(notificationData) {
  try {
    const newNotification = await db.Notification.create(notificationData);
    return newNotification;
  } catch (error) {
    throw new Error('Error creating notification');
  }
}

async function updateNotification(id, newData) {
  try {
    const notification = await db.Notification.findByPk(id);
    if (!notification) {
      throw new Error('Notification not found');
    }
    await notification.update(newData);
    return notification;
  } catch (error) {
    throw new Error('Error updating notification');
  }
}

async function deleteNotification(id) {
  try {
    const notification = await db.Notification.findByPk(id);
    if (!notification) {
      throw new Error('Notification not found');
    }
    await notification.destroy();
    return notification;
  } catch (error) {
    throw new Error('Error deleting notification');
  }
}

module.exports = {
  getAllNotifications,
  getNotificationById,
  createNotification,
  updateNotification,
  deleteNotification
};