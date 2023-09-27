import Customer from '../../db/models/Customer.js';

class CustomerService {
  constructor() {
  }

  addCustomer = async (customer) => {
    const newCustomer = await Customer.create(customer);
    return newCustomer;
  };

  updateCustomer = async (id, customer) => {
    await Customer.update(customer, {
      where: {
        id: id
      }
    });
  }

  getAllCustomers = async (userId) => {
    return await Customer.findAll({
      where: {
        userId: userId
      }
    });
  }
}

export default CustomerService;