module.exports = (sequelize, DataTypes) => {
    const area = sequelize.define(
        'area',
        {
            id: {
                type: DataTypes.INTEGER,
                primaryKey: true,
                autoIncrement: true
            },
            area_name: {
                type: DataTypes.STRING,
                defaultValue: ''
            }
        },
        {
            timestamps: false
        }
    )

    area.associate = function (models) {
        area.hasMany(models.question, {
            onDelete: 'CASCADE',
            foreignKey: 'area_id'
        })
    }
    return area
}
