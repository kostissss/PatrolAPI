const db = require('../models');
const { v4: uuidv4 } = require("uuid");
async function createRefreshToken(userId) {
    try {
        let token = uuidv4();
        let expiryDate = new Date();
        expiryDate.setDate(expiryDate.getDate() + 7);
        
        
        const refreshToken = await db.authToken.create({
            token: token,
            userId: userId,
            expiryDate: expiryDate.getTime(),
          });
        return refreshToken;
    } catch (error) {
      throw new Error(error);
    }



  }

async function verifyExpiration(refreshToken){
    try {
        if (refreshToken.expiryDate < new Date().getTime()) {
            throw new Error('Token expired');
          }
          
          return refreshToken;
    } catch (error) {
        throw new Error(error);
    }
}
async function deleteRefreshToken(token){
    try {
        const refreshToken = await findRefreshToken(token);
        await refreshToken.destroy();
        return refreshToken;
      } catch (error) {
        throw new Error(error);
      }
}
async function findRefreshToken(token){
    try {
      
        const refreshToken = await db.authToken.findOne({ where: { token: token } });
        if (!refreshToken) {
          throw new Error('Token not found');
        }
        return refreshToken;
      } catch (error) {
        throw new Error(error);
      }
}

async function revokeToken(token){
    try {
        const tokenToUpdate = await findRefreshToken(token);
        const updatedToken = await tokenToUpdate.update({ expiryDate: Date.now() });
        console.log('Token attribute updated successfully:', updatedToken);
        return updatedToken;
        
      } catch (error) {
        throw new Error(error);
      }
}


async function refreshToken(token){
    try {
      
        const refreshToken = await findRefreshToken(token);
        console.log('Refresh token found:', refreshToken);
        const updatedToken = await updateRefreshToken(refreshToken);
        console.log('Token attribute updated successfully:', updatedToken);
        return updatedToken;
        
      } catch (error) {
        throw new Error(error);
      }
}

async function updateRefreshToken(refreshToken){
    try {
      
      let token = uuidv4();
      let expiryDate = new Date();
      expiryDate.setDate(expiryDate.getDate() + 7);
      
      const updatedToken = await refreshToken.update({ expiryDate:expiryDate ,token:token });
      console.log('Token attribute updated successfully:', updatedToken);
      
      return updatedToken;
        
        
        
        
      } catch (error) {
        throw new Error(error);
      }
}





module.exports = {
    createRefreshToken,
    verifyExpiration,
    deleteRefreshToken,
    findRefreshToken,
    revokeToken,
    refreshToken
  };
  