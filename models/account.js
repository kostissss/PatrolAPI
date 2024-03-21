

module.exports = function(sequelize, DataTypes) {
    const Account = sequelize.define('Account', {
        // Model attributes are defined here
        name: {
            type: DataTypes.STRING,
            allowNull: false,
            validate: {
                notEmpty: true
            }
        },
        uname: {
            type: DataTypes.STRING,
            allowNull: false,
            validate: {
                notEmpty: true
            }
        },
        email: {
            type: DataTypes.STRING,
            allowNull: false,
            validate: {
                notEmpty: true
            }
        },
        password: {
            type: DataTypes.STRING,
            allowNull: false,
            validate: {
                notEmpty: true
            }
        },
        timeZone: {
            type: DataTypes.STRING,
            allowNull: false,
            validate: {
                notEmpty: true
            }
        },
        
        subscriptionFrequency: {

            type: DataTypes.STRING,
            allowNull: false,
            validate: {
                notEmpty: true
            }
        },
        expirationDate: {
            type: DataTypes.DATE,
            allowNull: false,
            validate: {
                notEmpty: true
            }
        },
        plan: {
            type: DataTypes.STRING,
            allowNull: false,
            validate: {
                notEmpty: true
            }
        },
        selectedOption :{
            type: DataTypes.STRING,
            allowNull: false,
            validate: {
                notEmpty: true
            }
        },



     
       
    });

    Account.associate = models => {
        Account.hasMany(models.Notification,{
            foreignKey: 'userId',
            onDelete : 'cascade'
        });
    }
    return Account;
}