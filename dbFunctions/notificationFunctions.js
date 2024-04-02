const db = require('../models');

async function getAllNotifications() {
  try {
    const notifications = await db.Notification.findAll(({
      include: [{
        model: db.Account,
        attributes: { exclude: ['password'] }
      }]
    }));
    return notifications;
  } catch (error) {
<<<<<<< HEAD
    console.error('Error getting notifications:', error);
    throw new Error('Failed to retrieve notifications');
=======
    throw new Error(error);
>>>>>>> b98ab745721d555bcfb810681117c9e73bd60529
  }
}

async function getNotificationById(id) {
  try {
    const notification = await db.Notification.findByPk(id,{
      include: [{
        model: db.Account,
        attributes: { exclude: ['password'] } 
      }]
    });
    if (!notification) {
      throw new Error(error);
    }
    return notification;
  } catch (error) {
<<<<<<< HEAD
    console.error('Error getting notification by ID:', error);
    throw new Error('Failed to retrieve notification');
=======
    throw new Error(error);
>>>>>>> b98ab745721d555bcfb810681117c9e73bd60529
  }
}

async function createNotification(notificationData) {
  try {
    const newNotification = await db.Notification.create(notificationData);
    console.log('Notification created:', newNotification);
    return newNotification;
  } catch (error) {
<<<<<<< HEAD
    console.error('Error creating notification:', error);
    throw new Error('Failed to create notification');
=======
    throw new Error(error);
>>>>>>> b98ab745721d555bcfb810681117c9e73bd60529
  }
}

async function updateNotification(id, newData) {
  try {
    const notification = await db.Notification.findByPk(id);
    if (!notification) {
      throw new Error(error);
    }
    await notification.update(newData);
    console.log('Notification updated:', notification);
    return notification;
  } catch (error) {
<<<<<<< HEAD
    console.error('Error updating notification:', error);
    throw new Error('Failed to update notification');
=======
    throw new Error(error);
>>>>>>> b98ab745721d555bcfb810681117c9e73bd60529
  }
}

async function deleteNotification(id) {
  try {
    const notification = await db.Notification.findByPk(id);
    if (!notification) {
      throw new Error(error);
    }
    await notification.destroy();
    console.log('Notification deleted:', notification);
    return notification;
  } catch (error) {
<<<<<<< HEAD
    console.error('Error deleting notification:', error);
    throw new Error('Failed to delete notification');
=======
    throw new Error(error);
>>>>>>> b98ab745721d555bcfb810681117c9e73bd60529
  }
}

module.exports = {
  getAllNotifications,
  getNotificationById,
  createNotification,
  updateNotification,
  deleteNotification
};
