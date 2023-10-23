import { Sequelize } from 'sequelize';
import { sequelize } from '../db-connection.js';
import User from './User.js';

const Customer = sequelize.define('Customer', {
  id: {
    type: Sequelize.INTEGER,
    primaryKey: true,
    autoIncrement: true
  },
  customerName: {
    type: Sequelize.STRING,
    allowNull: false
  },
  dueDate: {
    type: Sequelize.DATE,
    allowNull: false
  },
  created: {
    type: Sequelize.DATE,
    allowNull: false
  },
  status: {
    type: Sequelize.TINYINT,
    allowNull: false
  },
  description: {
    type: Sequelize.TEXT,
    allowNull: true
  },
  phone: {
    type: Sequelize.STRING,
    allowNull: false
  },
  address: {
    type: Sequelize.STRING,
    allowNull: true
  },
  notified: {
    type: Sequelize.BOOLEAN,
    defaultValue: false,
    allowNull: false,
  },
  userId: {
    type: Sequelize.INTEGER,
    references: {
      model: User,
      key: 'id',
    }
  },
}, {
  timestamps: false
});

User.hasMany(Customer, {
  foreignKey: 'userId',
  onDelete: 'CASCADE',
});
Customer.belongsTo(User);

export default Customer;