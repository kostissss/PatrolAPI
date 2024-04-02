<<<<<<< HEAD
// Account model definition
module.exports = function(sequelize, DataTypes) {
    const Account = sequelize.define('Account', {
        id: {
            type: DataTypes.INTEGER,
            primaryKey: true,
            autoIncrement: true,
            allowNull: false,
            unique: true // Ensures ID is unique
=======


module.exports = function(sequelize, DataTypes) {
    const Account = sequelize.define('Account', {
        // Model attributes are defined here
        name: {
            type: DataTypes.STRING,
            allowNull: true,
            
>>>>>>> b98ab745721d555bcfb810681117c9e73bd60529
        },
        name: {
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
                notEmpty: true,
                isEmail: true
            }
            
        },
<<<<<<< HEAD
        // Other attributes...
    });

=======
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
>>>>>>> b98ab745721d555bcfb810681117c9e73bd60529
    return Account;
};

