

module.exports = function(sequelize, DataTypes) {
    const Account = sequelize.define('Account', {
        // Model attributes are defined here
        name: {
            type: DataTypes.STRING,
            allowNull: true,
            
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
            
        },
        timeZone: {
            type: DataTypes.STRING,
            allowNull: false,
            
        },
        
        subscriptionFrequency: {

            type: DataTypes.STRING,
            allowNull: true,
            
        },
        expirationDate: {
            type: DataTypes.DATE,
            allowNull: true,
            
        },
        plan: {
            type: DataTypes.STRING,
            allowNull: true,
            
        },
        selectedOption :{
            type: DataTypes.STRING,
            allowNull: true,
            
        },
        role :{
            type: DataTypes.STRING,
            enum: ['admin', 'partner', 'member'],
            allowNull: false,
            validate: {
                notEmpty: false
            }
        },
        
        language: {
            type: DataTypes.STRING,
            allowNull: true,
            
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