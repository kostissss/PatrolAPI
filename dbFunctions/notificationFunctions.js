const db = require('../models');

async function getAllNotifications() {
  try {
    const notifications = await db.Notification.findAll();
    return notifications;
  } catch (error) {
    console.error('Error getting notifications:', error);
    throw new Error('Failed to retrieve notifications');
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
    console.error('Error getting notification by ID:', error);
    throw new Error('Failed to retrieve notification');
  }
}

async function createNotification(notificationData) {
  try {
    const newNotification = await db.Notification.create(notificationData);
    console.log('Notification created:', newNotification);
    return newNotification;
  } catch (error) {
    console.error('Error creating notification:', error);
    throw new Error('Failed to create notification');
  }
}

async function updateNotification(id, newData) {
  try {
    const notification = await db.Notification.findByPk(id);
    if (!notification) {
      throw new Error('Notification not found');
    }
    await notification.update(newData);
    console.log('Notification updated:', notification);
    return notification;
  } catch (error) {
    console.error('Error updating notification:', error);
    throw new Error('Failed to update notification');
  }
}

async function deleteNotification(id) {
  try {
    const notification = await db.Notification.findByPk(id);
    if (!notification) {
      throw new Error('Notification not found');
    }
    await notification.destroy();
    console.log('Notification deleted:', notification);
    return notification;
  } catch (error) {
    console.error('Error deleting notification:', error);
    throw new Error('Failed to delete notification');
  }
}

module.exports = {
  getAllNotifications,
  getNotificationById,
  createNotification,
  updateNotification,
  deleteNotification
};
