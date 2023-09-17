class CustomerController {
  constructor(customerService) {
    this.customerService = customerService;
  }

  createCustomer = async (req, res) => {
    const customer = {
      customerName: req.body.customerName,
      dueDate: new Date(req.body.dueDate),
      status: req.body.status,
      description: req.body.description,
      phone: req.body.phone,
      address: req.body.address,
      userId: req.user.user_id
    };

    const createdCustomer = await this.customerService.addCustomer(customer);
    return res.status(201).send(createdCustomer);
  };

  getAllCustomers = async (req, res) => {
    return res.status(200).send(await this.customerService.getAllCustomers());
  }
}

export default CustomerController;