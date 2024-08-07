import { DataTypes } from "sequelize";
import { sequelize } from "../base.sqllite";

const Task = sequelize.define(
    'task',
    {
        id: {
            type: DataTypes.CHAR(36),
            defaultValue: DataTypes.UUIDV1,
            primaryKey: true,
        },
        title: {
            type: DataTypes.STRING
        },
        description: {
            type: DataTypes.STRING,
        },
        created_at: {
			type: DataTypes.DATE,
			defaultValue: DataTypes.NOW,
			allowNull: false,
          },
          updated_at: {
			type: DataTypes.DATE,
			defaultValue: DataTypes.NOW,
			allowNull: false,
          },
          deleted_at: { type: 'TIMESTAMP' } 
    },
    {
        // Other model options go here
        underscored: true,
        createdAt: 'created_at',
        updatedAt: 'updated_at',
        deletedAt: 'deleted_at',
        timestamps: false,
		freezeTableName: true,
		paranoid: true,
    },
);

(async () => {
    await sequelize.sync({ force: true });
})();

export {
    Task
}