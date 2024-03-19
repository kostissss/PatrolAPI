const db = require('../models');
const bcrypt = require('bcryptjs');

async function getPartnerAccountById(id) {
  try {
    const partnerAccount = await db.PartnerAccount.findByPk(id, {
      attributes: { exclude: ['password'] }
    });
    return partnerAccount;
  } catch (error) {
    throw new Error('Error getting partnerAccount by ID');
  }
}

async function getAllPartnerAccounts() {
  try {
    const partnerAccounts = await db.PartnerAccount.findAll({
      attributes: { exclude: ['password'] }
    });
    return partnerAccounts;
  } catch (error) {
    throw new Error('Error getting all partnerAccounts');
  }
}

async function createPartnerAccount(accountData) {
  try {
    const hashedPassword = await bcrypt.hash(accountData.password, 10);
    accountData.password = hashedPassword;
    const newAccount = await db.PartnerAccount.create(accountData);
    return newAccount;
  } catch (error) {
    throw new Error('Error creating partnerAccount');
  }
}

async function updatePartnerAccount(id, newData) {
  try {
    const partnerAccount = await db.PartnerAccount.findByPk(id);
    if (!partnerAccount) {
      throw new Error('PartnerAccount not found');
    }
    const hashedPassword = await bcrypt.hash(newData.password, 10);
    newData.password = hashedPassword;
    await partnerAccount.update(newData);
    return partnerAccount;
  } catch (error) {
    throw new Error('Error updating partnerAccount');
  }
}

async function resetPassword(id, newPassword) {
  try {
    const partnerAccount = await db.PartnerAccount.findByPk(id);
    if (!partnerAccount) {
      throw new Error('PartnerAccount not found');
    }
    const hashedPassword = await bcrypt.hash(newPassword, 10);
    await partnerAccount.update({ password: hashedPassword });
    return partnerAccount;
  } catch (error) {
    throw new Error('Error resetting password');
  }
}

async function deletePartnerAccount(id) {
  try {
    const partnerAccount = await db.PartnerAccount.findByPk(id);
    if (!partnerAccount) {
      throw new Error('PartnerAccount not found');
    }
    await partnerAccount.destroy();
    return partnerAccount;
  } catch (error) {
    throw new Error('Error deleting partnerAccount');
  }
}

module.exports = {
  getPartnerAccountById,
  getAllPartnerAccounts,
  createPartnerAccount,
  updatePartnerAccount,
  resetPassword,
  deletePartnerAccount
};
