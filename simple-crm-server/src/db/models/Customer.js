import { Sequelize } from 'sequelize';
import { sequelize } from '../db-connection.js';

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
  status: {
    type: Sequelize.TINYINT,
    allowNull: false
  },
  description: {
    type: Sequelize.STRING,
    allowNull: false
  },
  phone: {
    type: Sequelize.STRING,
    allowNull: false
  },
  address: {
    type: Sequelize.STRING,
    allowNull: false
  }
}, {
  timestamps: false
});

export default Customer;