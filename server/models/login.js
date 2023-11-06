module.exports = function (sequelize, DataTypes) {
    const login = sequelize.define(
        'login',
        {
            id: {
                type: DataTypes.INTEGER,
                primaryKey: true,
                autoIncrement: true
            },
            admin_password: {
                type: DataTypes.STRING
            },
            logged_in_db: {
                type: DataTypes.BOOLEAN,
                defaultValue: false
            },
            save_results: {
                type: DataTypes.BOOLEAN,
                defaultValue: false
            }
        },
        {
            timestamps: false
        }
    )
    return login
}
