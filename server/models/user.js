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
        GSS_number: {
            type: DataTypes.INTEGER,
            allowNull: true,
            unique: true
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