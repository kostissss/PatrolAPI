module.exports = function(sequelize, DataTypes) {
    const Guard = sequelize.define('Guard', {
        // Model attributes are defined here
        GuardId: {
            type: DataTypes.INTEGER,
            primaryKey: true,
            autoIncrement: true
          },
        name: {
            type: DataTypes.STRING,
            allowNull: false,
            validate: {
                notEmpty: true
            }
        },
        arcGuardId: {
            type: DataTypes.INTEGER,
            allowNull: false,
            validate: {
                notEmpty: true
            }
          },
        pin: {
            type: DataTypes.INTEGER,
            allowNull: false,
            validate: {
                notEmpty: true
            }
          },
          isQrPatrol: {
            type: DataTypes.BOOLEAN,
            allowNull: false,
            
        },
        
        isPTT: {
            type: DataTypes.BOOLEAN,
            allowNull: false,
            
        },
        lastLatitude: {
            type: DataTypes.FLOAT,
            allowNull: true,
            
        },
        lastLongitude: {
            type: DataTypes.FLOAT,
            allowNull: true,
            
        },
        lastAccuracy: {
            type: DataTypes.FLOAT,
            allowNull: true,
            
        },
        lastContact: {
            type: DataTypes.DATE,
            allowNull: true,
            
        },
        
        language: {
            type: DataTypes.STRING,
            allowNull: true,
            
        },
        userId: {
            type: DataTypes.INTEGER,
            allowNull: false,
           
            validate: {
                notEmpty: true
            }
        },



     
       
    });

    Guard.associate = models => {
        Guard.belongsTo(models.Account,{
            foreignKey: 'userId',
            
            allowNull: false,
            onDelete: 'CASCADE' 
        });
    }
    return Guard;
}