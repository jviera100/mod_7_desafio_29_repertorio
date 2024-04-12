import sequelize from '../config/db.js';
import { DataTypes } from 'sequelize';


const Project = sequelize.define('project', {
    id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true
    },
    name: {
        type: DataTypes.STRING
    },
    priority: {
        type: DataTypes.INTEGER
    },
    description: {
        type: DataTypes.STRING
    }
}, {
    timestamps: true
}
    
)

export default Project