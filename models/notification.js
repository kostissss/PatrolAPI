<<<<<<< HEAD
// Notification model definition
=======

const { Deferrable } = require('sequelize');

>>>>>>> b98ab745721d555bcfb810681117c9e73bd60529
module.exports = function(sequelize, DataTypes) {
    const Notification = sequelize.define('Notification', {
        userId: {
            type: DataTypes.INTEGER,
            allowNull: false,
<<<<<<< HEAD
            unique: true, // Ensures UserID is unique
            references: {
                model: 'Account', // References the Account model
                key: 'id' // References the ID field in Account model
            }
        },
=======
           
            validate: {
                notEmpty: true
            }
        },
        
>>>>>>> b98ab745721d555bcfb810681117c9e73bd60529
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
        }
    });

<<<<<<< HEAD
=======
    Notification.associate = models => {
        Notification.belongsTo(models.Account,{
            foreignKey: 'userId',
            allowNull: false,
            onDelete: 'CASCADE' 
        });
    }
>>>>>>> b98ab745721d555bcfb810681117c9e73bd60529
    return Notification;
};
