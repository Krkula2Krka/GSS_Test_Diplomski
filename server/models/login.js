const bcrypt = require('bcrypt')

module.exports = (sequelize, DataTypes) => {
    const login = sequelize.define(
        'login',
        {
            id: {
                type: DataTypes.INTEGER,
                primaryKey: true,
                autoIncrement: true,
                allowNull: true
            },
            admin_logged_in: {
                type: DataTypes.BOOLEAN,
                allowNull: true,
                defaultValue: false
            },
            save_results: {
                type: DataTypes.BOOLEAN,
                allowNull: true,
                defaultValue: false
            },
            password: {
                type: DataTypes.STRING,
                allowNull: true
            }
        },
        {
            timestamps: false
        }
    )

    login.beforeCreate((login) => {
        return bcrypt
            .hash(login.password, 10)
            .then((hash) => {
                login.password = hash
            })
            .catch(() => {
                throw new Error()
            })
    })

    return login
}
