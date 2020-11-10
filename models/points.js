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
<<<<<<< HEAD
            type: DataTypes.INTEGER
=======
            type: DataTypes.INTEGER,
>>>>>>> c54a50ebcefd9e848e9f343f52a343f472cde52e
        }

    })
    return Log;
}