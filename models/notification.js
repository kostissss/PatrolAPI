// Notification model definition
module.exports = function(sequelize, DataTypes) {
    const Notification = sequelize.define('Notification', {
        userId: {
            type: DataTypes.INTEGER,
            allowNull: false,
            unique: true, // Ensures UserID is unique
            references: {
                model: 'Account', // References the Account model
                key: 'id' // References the ID field in Account model
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
        }
    });

    return Notification;
};
