
const { Deferrable } = require('sequelize');

module.exports = function(sequelize, DataTypes) {
    const Notification = sequelize.define('Notification', {
        // Model attributes are defined here
        
        userId: {
            type: DataTypes.INTEGER,
            allowNull: false,
           
            validate: {
                notEmpty: true
            }
        },
        
        notificationTitle: {
            type: DataTypes.STRING,
            allowNull: false,
            validate: {
                notEmpty: true
            }
        },
        notificationMessage: {
            type: DataTypes.STRING,
            allowNull: false,
            validate: {
                notEmpty: true
            }
        },
    });

    Notification.associate = models => {
        Notification.belongsTo(models.Account,{
            foreignKey: 'userId',
            allowNull: false,
            onDelete: 'CASCADE' 
        });
    }
    return Notification;
}
