const db = require('../models');
const bcrypt = require('bcryptjs');

const jwtUtils =require( '../jwt/jwtUtils');

async function getAccountById(id) {
  try {
    const account = await db.Account.findByPk(id, {
      attributes: { exclude: ['password'] }
      
    });
    console.log('account:', account);
    return account;
  } catch (error) {
    throw new Error(error);
  }
}

async function getAllAccounts() {
  try {
    const accounts = await db.Account.findAll({
      attributes: { exclude: ['password'] }
    });
    return accounts;
  } catch (error) {
    throw new Error(error);
  }
}

async function createAccount(accountData) {
  try {

    let user = await db.Account.findOne({ where: { email: accountData.email  } });
    console.log('user:', user);
        if (user)
            throw new Error ( "User with given email already exist" );

    user = await db.Account.findOne({ where: { uname: accountData.uname  } });
    console.log('user:', user);
        if (user)
            return ({ error: true, message: "User with given username already exist" });
    const hashedPassword = await bcrypt.hash(accountData.password, 10);

    accountData.password = hashedPassword;
    const newAccount = await db.Account.create(accountData);
    return newAccount;
  } catch (error) {
    throw new Error(error);
  }
}

async function findAccountByEmail(accountData) {
  return await db.Account.findOne({ where: { email: accountData.email } });
}
async function findAccountByUsername(accountData) {
  return await db.Account.findOne({ where: { uname: accountData.uname } });
}

async function updateAccount(id, newData) {
  try {
    const account = await db.Account.findByPk(id);
    if (!account) {
      throw new Error(error);
    }
    const hashedPassword = await bcrypt.hash(newData.password, 10);
    newData.password = hashedPassword;
    await account.update(newData);
    return account;
  } catch (error) {
    throw new Error(error);
  }
}

async function resetPassword(id, newPassword) {
  try {
    const account = await db.Account.findByPk(id);
    if (!account) {
      throw new Error(error);
    }
    const hashedPassword = await bcrypt.hash(newPassword, 10);
    await account.update({ password: hashedPassword });
    return account;
  } catch (error) {
    throw new Error(error);
  }
}

async function deleteAccount(id) {
  try {
    const account = await db.Account.findByPk(id);
    if (!account) {
      throw new Error(error);
    }
    await account.destroy();
    return account;
  } catch (error) {
    throw new Error(error);
  }
}

async function loginAccount(id, password) {
  try {
    const account = await db.Account.findByPk(id);
    if (!account) {
      throw new Error(error);
    }
    const passwordMatch = await bcrypt.compare(password, account.password);
    if (!passwordMatch) {
      throw new Error(error);
    }
    const authToken = await jwtUtils.generateAuthToken(account.id);
    return { account, authToken };
    
  } catch (error) {
    throw new Error(error);
  }
}

module.exports = {
  getAccountById,
  getAllAccounts,
  createAccount,
  updateAccount,
  resetPassword,
  deleteAccount,
  loginAccount,
  findAccountByEmail,
  findAccountByUsername

};
