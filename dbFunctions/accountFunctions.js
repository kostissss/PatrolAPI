const db = require('../models');
const bcrypt = require('bcryptjs');

async function getAccountById(id) {
  try {
    const account = await db.Account.findByPk(id, {
      attributes: { exclude: ['password'] }
    });
    return account;
  } catch (error) {
    throw new Error('Error getting account by ID');
  }
}

async function getAllAccounts() {
  try {
    const accounts = await db.Account.findAll({
      attributes: { exclude: ['password'] }
    });
    return accounts;
  } catch (error) {
    throw new Error('Error getting all accounts');
  }
}

async function createAccount(accountData) {
  try {
    const hashedPassword = await bcrypt.hash(accountData.password, 10);
    accountData.password = hashedPassword;
    const newAccount = await db.Account.create(accountData);
    return newAccount;
  } catch (error) {
    throw new Error('Error creating account');
  }
}

async function updateAccount(id, newData) {
  try {
    const account = await db.Account.findByPk(id);
    if (!account) {
      throw new Error('Account not found');
    }
    const hashedPassword = await bcrypt.hash(newData.password, 10);
    newData.password = hashedPassword;
    await account.update(newData);
    return account;
  } catch (error) {
    throw new Error('Error updating account');
  }
}

async function resetPassword(id, newPassword) {
  try {
    const account = await db.Account.findByPk(id);
    if (!account) {
      throw new Error('Account not found');
    }
    const hashedPassword = await bcrypt.hash(newPassword, 10);
    await account.update({ password: hashedPassword });
    return account;
  } catch (error) {
    throw new Error('Error resetting password');
  }
}

async function deleteAccount(id) {
  try {
    const account = await db.Account.findByPk(id);
    if (!account) {
      throw new Error('Account not found');
    }
    await account.destroy();
    return account;
  } catch (error) {
    throw new Error('Error deleting account');
  }
}

module.exports = {
  getAccountById,
  getAllAccounts,
  createAccount,
  updateAccount,
  resetPassword,
  deleteAccount
};
