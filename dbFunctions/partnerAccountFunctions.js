const db = require('../models');
const bcrypt = require('bcryptjs');


async function getPartnerAccountById(id) {
  try {
    const partnerAccount = await db.PartnerAccount.findByPk(id, {
      attributes: { exclude: ['password'] }
    });
    return partnerAccount;
  } catch (error) {
    throw new Error(error);
  }
}

async function getAllPartnerAccounts() {
  try {
    const partnerAccounts = await db.PartnerAccount.findAll({
      attributes: { exclude: ['password'] }
    });
    return partnerAccounts;
  } catch (error) {
    throw new Error(error);
  }
}

async function createPartnerAccount(accountData) {
  try {
    const hashedPassword = await bcrypt.hash(accountData.password, 10);
    accountData.password = hashedPassword;
    const newAccount = await db.PartnerAccount.create(accountData);
    return newAccount;
  } catch (error) {
    throw new Error(error);
  }
}

async function updatePartnerAccount(id, newData) {
  try {
    const partnerAccount = await db.PartnerAccount.findByPk(id);
    if (!partnerAccount) {
      throw new Error(error);
    }
    const hashedPassword = await bcrypt.hash(newData.password, 10);
    newData.password = hashedPassword;
    await partnerAccount.update(newData);
    return partnerAccount;
  } catch (error) {
    throw new Error(error);
  }
}

async function resetPassword(id, newPassword) {
  try {
    const partnerAccount = await db.PartnerAccount.findByPk(id);
    if (!partnerAccount) {
      throw new Error(error);
    }
    const hashedPassword = await bcrypt.hash(newPassword, 10);
    await partnerAccount.update({ password: hashedPassword });
    return partnerAccount;
  } catch (error) {
    throw new Error(error);
  }
}

async function deletePartnerAccount(id) {
  try {
    const partnerAccount = await db.PartnerAccount.findByPk(id);
    if (!partnerAccount) {
      throw new Error(error);
    }
    await partnerAccount.destroy();
    return partnerAccount;
  } catch (error) {
    throw new Error(error);
  }
}

async function findPartnerAccountByEmail(accountData) {
  return await db.PartnerAccount.findOne({ where: { email: accountData.email } });
}
async function findPartnerAccountByUsername(accountData) {
  return await db.PartnerAccount.findOne({ where: { uname: accountData.uname } });
}

module.exports = {
  getPartnerAccountById,
  getAllPartnerAccounts,
  createPartnerAccount,
  updatePartnerAccount,
  resetPassword,
  deletePartnerAccount,
  findPartnerAccountByEmail,
  findPartnerAccountByUsername
};
