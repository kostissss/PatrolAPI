const db = require('../models');




async function getGuardById(id) {
  try {
    const guard = await db.G.findByPk(id, {
      attributes: { exclude: ['password'] }
      
    });
    console.log('guard:', guard);
    return guard;
  } catch (error) {
    throw new Error(error);
  }
}


async function getGuardsByField(field, value) {

  try {

    const guards = await db.Guard.findAll({

      where: { [field]: value },

      attributes: { exclude: ['password'] }

    });

    return guards;

  } catch (error) {

    throw new Error(error);

  }

}


async function getAllGuards() {
  try {
    const guards = await db.Guard.findAll({
      attributes: { exclude: ['password'] }
    });
    return guards;
  } catch (error) {
    throw new Error(error);
  }
}

async function createGuard(guardData) {
  try {

   
    
    
    
    
    const newGuard = await db.Guard.create(guardData);
    return newGuard;
  } catch (error) {
    throw new Error(error);
  }
}


async function updateGuard(id, newData) {
  try {
    const guard = await db.Guard.findByPk(id);
    if (!guard) {
      throw new Error(error);
    }
    
    
    await guard.update(newData);
    return guard;
  } catch (error) {
    throw new Error(error);
  }
}


async function deleteGuard(id) {
  try {
    const guard = await db.Guard.findByPk(id);
    if (!guard) {
      throw new Error(error);
    }
    await guard.destroy();
    return guard;
  } catch (error) {
    throw new Error(error);
  }
}


module.exports = {
  getGuardById,
  getAllGuards,
  createGuard,
  updateGuard,
 
  deleteGuard,
  getGuardsByField

};
