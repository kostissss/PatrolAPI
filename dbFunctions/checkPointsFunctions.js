const db = require('../models');

async function getAllCheckPoints() {
  try {
    const checkPoints = await db.checkPoint.findAll(({
      include: [{
        model: db.Account,
        attributes: { exclude: ['password'] }
      }]
    }));
    return checkPoints;
  } catch (error) {
    throw new Error(error);
  }
}

async function getCheckPointById(id) {
  try {
    const checkPoint = await db.checkPoint.findByPk(id,{
      include: [{
        model: db.Account,
        attributes: { exclude: ['password'] } 
      }]
    });
    if (!checkPoint) {
      throw new Error(error);
    }
    return checkPoint;
  } catch (error) {
    throw new Error(error);
  }
}

async function createCheckPoint(checkPointData) {
  try {
    const newCheckPoint = await db.checkPoint.create(checkPointData);
    return newCheckPoint;
  } catch (error) {
    throw new Error(error);
  }
}

async function updateCheckPoint(id, newData) {
  try {
    const checkPoint = await db.checkPoint.findByPk(id);
    if (!checkPoint) {
      throw new Error(error);
    }
    await checkPoint.update(newData);
    return checkPoint;
  } catch (error) {
    throw new Error(error);
  }
}

async function deleteCheckPoint(id) {
  try {
    const checkPoint = await db.checkPoint.findByPk(id);
    if (!checkPoint) {
      throw new Error(error);
    }
    await checkPoint.destroy();
    return checkPoint;
  } catch (error) {
    throw new Error(error);
  }
}



async function getCheckPointsByField(field, value) {

    try {
  
      const checkPoint = await db.checkPoint.findAll({
  
        where: { [field]: value },
  
        attributes: { exclude: ['password'] }
  
      });
  
      return checkPoint;
  
    } catch (error) {
  
      throw new Error(error);
  
    }
  
  }


  async function updateMultipleCheckPoints(checkPointsData) {
    try {
      const checkPoints = await db.checkPoint.findAll({
        where: { checkPointId: checkPointsData.map(checkPoint => checkPoint.checkPointId) }
      });
      if (!checkPoints) {
        throw new Error(error);
      }
      checkPointsData.forEach(async (checkPointData) => {
        const checkPoint = checkPoints.find(checkPoint => checkPoint.checkPointId === checkPointData.checkPointId);
        await checkPoint.update(checkPointData);
      });
      return checkPoints;
    } catch (error) {
      throw new Error(error);
    }
  }

  async function bulkCreateCheckPoints(checkPointsData) {
    try {
      const newCheckPoints = await db.checkPoint.bulkCreate(checkPointsData);
      return newCheckPoints;
    } catch (error) {
      throw new Error(error);
    }
  }

module.exports = {
  getAllCheckPoints,
  getCheckPointById,
  createCheckPoint,
  updateCheckPoint,
  deleteCheckPoint,
  getCheckPointsByField,
    updateMultipleCheckPoints,
    bulkCreateCheckPoints
};