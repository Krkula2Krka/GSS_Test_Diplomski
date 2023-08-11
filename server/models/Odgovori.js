module.exports = function(sequelize, DataTypes) {
    const Odgovori = sequelize.define("Odgovor", {
        id: {
            type: DataTypes.INTEGER,
            primaryKey: true,
            autoIncrement: true,
            allowNull: false
        },
        odgovor: {
            type: DataTypes.STRING,
            allowNull: true
        },
        tacnost: {
            type: DataTypes.BOOLEAN,
            allowNull: true
        }, 
        id_pitanja: {
            type: DataTypes.INTEGER,
            allowNull: true
        }
    })
    return Odgovori
}