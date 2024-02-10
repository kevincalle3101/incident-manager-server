const { DataTypes } = require("sequelize");

module.exports = (sequelize) => {
    sequelize.define(
        "Incidence",
        {
            id: {
                type: DataTypes.INTEGER,
                primaryKey: true,
                autoIncrement: true,
            },
            subject: {
                type: DataTypes.STRING,
                allowNull: false,
            },
            type: {
                type: DataTypes.STRING,
                allowNull: false,
            },
            description: {
                type: DataTypes.TEXT,
                allowNull: false,
            },
            image_secure_url: {
                type: DataTypes.STRING,
                allowNull: true,
                validate: {
                    isUrl: true,
                }
            },
            image_public_id: {
                type: DataTypes.STRING,
                allowNull: true,
            },
            location: {
                type: DataTypes.STRING,
                allowNull: false,
            },
            isResolved: {
                type: DataTypes.BOOLEAN,
                defaultValue: false,
                allowNull: false,
            },
        },
        {
            timestamps: true,
        }
    );
};