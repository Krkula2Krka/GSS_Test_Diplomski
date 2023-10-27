module.exports = (sequelize, DataTypes) => {
    const user = sequelize.define(
        'user',
        {
            GSS_identification: {
                type: DataTypes.INTEGER,
                primaryKey: true,
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
            logged_in_for_testing: {
                type: DataTypes.BOOLEAN,
                allowNull: true,
                defaultValue: false
            },
            user_type: {
                type: DataTypes.ENUM('user', 'admin', 'superadmin'),
                allowNull: true
            }
        },
        {
            timestamps: false
        }
    )

    user.associate = function (models) {
        user.hasMany(models.result, {
            onDelete: 'RESTRICT',
            foreignKey: 'user_id'
        })
    }
    return user
}
