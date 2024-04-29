

module.exports = function(sequelize, DataTypes) {
    const checkPoint = sequelize.define('checkPoint', {
        // Model attributes are defined here
        checkPointId: {
            type: DataTypes.INTEGER,
            primaryKey: true,
            autoIncrement: true
          },
        checkPointCode: {
            type: DataTypes.STRING,
            allowNull: false,
            validate: {
                notEmpty: true
            }
        },
        clientSiteCode: {
            type: DataTypes.STRING,
            allowNull: false,
            validate: {
                notEmpty: true
            }
            
        },
        checkPoint: {
            type: DataTypes.STRING,
            allowNull: false,
            
        },
        isLocked: {
            type: DataTypes.BOOLEAN,
            allowNull: false,
            validate: {
                notEmpty: true
            }
            
        },
        
        isDeleted: {

            type: DataTypes.BOOLEAN,
            allowNull: true,
            validate: {
                notEmpty: true
            }
            
        },
        deletedDate: {
            type: DataTypes.DATE,
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

    checkPoint.associate = models => {
        checkPoint.belongsTo(models.Account,{
            foreignKey: 'userId',
            
            allowNull: false,
            onDelete: 'CASCADE' 
        });
    }
    return checkPoint;
}