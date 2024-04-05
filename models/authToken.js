

module.exports = function(sequelize, DataTypes) {
    const authToken = sequelize.define('authToken', {
        // Model attributes are defined here
        sessionId: {
            type: DataTypes.INTEGER,
            primaryKey: true, 
            autoIncrement: true // Important: Disable auto-increment
          },
        userId: {
            type: DataTypes.INTEGER,
            allowNull: false,
           
            validate: {
                notEmpty: true
            }
        },
        
        token: {
            type: DataTypes.STRING,
            allowNull: false,
            validate: {
                notEmpty: true
            }
        },
        expiryDate: {
            type: DataTypes.DATE,
            allowNull: false,
            validate: {
                notEmpty: true
            }
        },
        
        
    });

    authToken.associate = models => {
        authToken.belongsTo(models.Account,{
            foreignKey: 'userId',
            
            allowNull: false,
            onDelete: 'CASCADE' 
        });
    }
    return authToken;
}
