import Customer from '../../db/models/Customer.js';

class CustomerService {
  constructor() {
  }

  addCustomer = async (customer) => {
    console.log(customer);
    const newCustomer = await Customer.create(customer);
    return newCustomer;
  };

  getAllCustomers = async () => await Customer.findAll();

  // getUser = (id) => {
  //   const user = this.users.find((u) => u.id === id);
  //   return user;
  // };
}

export default CustomerService;