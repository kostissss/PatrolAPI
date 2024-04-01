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
    throw new Error(error);
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
    throw new Error(error);
  }
}

async function createNotification(notificationData) {
  try {
    const newNotification = await db.Notification.create(notificationData);
    return newNotification;
  } catch (error) {
    throw new Error(error);
  }
}

async function updateNotification(id, newData) {
  try {
    const notification = await db.Notification.findByPk(id);
    if (!notification) {
      throw new Error(error);
    }
    await notification.update(newData);
    return notification;
  } catch (error) {
    throw new Error(error);
  }
}

async function deleteNotification(id) {
  try {
    const notification = await db.Notification.findByPk(id);
    if (!notification) {
      throw new Error(error);
    }
    await notification.destroy();
    return notification;
  } catch (error) {
    throw new Error(error);
  }
}

module.exports = {
  getAllNotifications,
  getNotificationById,
  createNotification,
  updateNotification,
  deleteNotification
};