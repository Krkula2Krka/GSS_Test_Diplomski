module.exports = (sequelize, DataTypes) => {
    const Korisnici = sequelize.define('Korisnici', {
        id: {
            type: DataTypes.INTEGER,
            primaryKey: true,
            autoIncrement: true,
            allowNull: false
        }
    })
}