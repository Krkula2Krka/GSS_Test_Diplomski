module.exports = function(sequelize, DataTypes) {
    const Pitanja = sequelize.define("Pitanja", {
        id: {
            type: DataTypes.INTEGER,
            primaryKey: true,
            autoIncrement: true,
            allowNull: false
        },
        pitanje: {
            type: DataTypes.STRING,
            allowNull: true
        },
        oblast: {
            type: DataTypes.INTEGER,
            allowNull: true
        },
        tezina: {
            type: DataTypes.ENUM('lako', 'srednje', 'tesko'),
            allowNull: true
        }
    })
    return Pitanje
}