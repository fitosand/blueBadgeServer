module.exports = (sequelize, DataTypes) => {
    const Log = sequelize.define('log', {
        typeOfPoint: {
            type: DataTypes.STRING,
            allowNull: false
        },
        numberOfPoints: {
            type: DataTypes.INTEGER,
        },
        owner: {
            type: DataTypes.INTEGER,
        }

    })
    return Log;
}