class CustomerController {
  constructor(customerService) {
    this.customerService = customerService;
  }

  createCustomer = async (req, res) => {
    const customer = {
      customerName: req.body.customerName,
      dueDate: new Date(req.body.dueDate),
      created: new Date(),
      status: req.body.status,
      description: req.body.description,
      phone: req.body.phone,
      address: req.body.address,
      userId: req.user.user_id
    };

    const createdCustomer = await this.customerService.addCustomer(customer);
    return res.status(201).send(createdCustomer);
  };

  updateCustomer = async (req, res) => {
    const id = req.params.id;
    const customer = {
      customerName: req.body.customerName,
      dueDate: new Date(req.body.dueDate),
      status: req.body.status,
      description: req.body.description,
      phone: req.body.phone,
      address: req.body.address,
    };

    await this.customerService.updateCustomer(id, customer);
    return res.status(204).send();
  }

  deleteCustomer = async (req, res) => {
    const id = req.params.id;
    await this.customerService.deleteCustomer(id);
    return res.status(204).send();
  }

  getAllCustomers = async (req, res) => {
    const customers = await this.customerService.getAllCustomers(req.user.user_id);
    return res.status(200).send(customers);
  }
}

export default CustomerController;