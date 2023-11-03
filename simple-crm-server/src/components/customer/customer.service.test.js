import { describe, it, before } from "node:test";
import assert from "node:assert/strict";
import User from "../../db/models/User.js";
import { sequelize } from "../../db/db-connection.js";
import CustomerService from "./customer.service.js";

describe("Customer service tests", () => {
  let customerService;
  const customer = {
    customerName: "Customer name",
    dueDate: new Date(),
    created: new Date(),
    status: 0,
    phone: "123122127",
    address: "City, street",
  };
  before(async () => {
    await sequelize.sync();
    await User.create({
      id: 0,
      email: "test.user@gmail.com",
      password: "some_password",
    });
    customerService = new CustomerService();
  });

  it("Initial number of customers should be 0", async () => {
    let customers = await customerService.getAllCustomers(0);
    assert.strictEqual(customers.length, 0);
  });

  it("Throws on addCstomer if userId is not provided", async () => {
    await assert.rejects(async () => {
      await customerService.addCustomer(customer);
    }, Error);
  });

  it("Throws on addCstomer if userId doesn't exist", async () => {
    await assert.rejects(async () => {
      await customerService.addCustomer({ ...customer, userId: 1 });
    }, Error);
  });

  describe("Adding one customer", () => {
    before(async () => {
      await customerService.addCustomer({ ...customer, userId: 0 });
    });

    it("Number of customers should be equal to 1", async () => {
      let customers = await customerService.getAllCustomers(0);
      assert.strictEqual(customers.length, 1);
    });
  });

  describe("Updating customer", () => {
    before(async () => {
      await customerService.updateCustomer(1, { customerName: "New name" });
    });

    it("Customer should be updated", async () => {
      let customers = await customerService.getAllCustomers(0);
      assert.strictEqual(customers[0].customerName, "New name");
    });
  });

  describe("Deleting customer", () => {
    before(async () => {
      await customerService.deleteCustomer(1);
    });

    it("Number of customers should be equal to 0", async () => {
      let customers = await customerService.getAllCustomers(0);
      assert.strictEqual(customers.length, 0);
    });
  });
});
