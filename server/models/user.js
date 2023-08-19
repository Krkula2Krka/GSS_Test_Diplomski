module.exports = (sequelize, DataTypes) => {
    const user = sequelize.define('user', {
        id: {
            type: DataTypes.INTEGER,
            primaryKey: true,
            autoIncrement: true,
            allowNull: false
        },
        first_name: {
            type: DataTypes.STRING,
            allowNull: true
        },
        last_name: {
            type: DataTypes.STRING,
            allowNull: true
        },
        nickname: {
            type: DataTypes.STRING,
            allowNull: true
        },
        GSS_identification: {
            type: DataTypes.STRING,
            allowNull: true,
            unique: true
        },
        logged_in_for_testing: {
            type: DataTypes.BOOLEAN,
            allowNull: true,
            defaultValue: false
        }
    }, {
        timestamps: false
    })

    user.associate = function(models) {
        user.hasMany(models.result, {
            onDelete: 'RESTRICT',
            foreignKey: 'user_id'
        })
    }

    return user
}