import { describe, it, before } from "node:test";
import assert from "node:assert/strict";
import User from "../../db/models/User.js";
import { sequelize } from "../../db/db-connection.js";
import Customer from "../../db/models/Customer.js";
import StatisticsService from "./statistics.service.js";

describe("Statistics service tests", () => {
  let statisticsService;
  const defaultCustomer = {
    dueDate: new Date(),
    phone: "123122127",
    address: "City, street",
    userId: 0,
  };
  const customers = [
    {
      created: new Date("2023-10-26T10:30:14.240Z"),
      status: 0,
    },
    {
      created: new Date("2023-10-26T19:30:14.240Z"),
      status: 1,
    },
    {
      created: new Date("2023-10-22T17:30:14.240Z"),
      status: 1,
    },
    {
      created: new Date("2023-10-20T19:30:14.240Z"),
      status: 3,
    },
    {
      created: new Date("2023-10-21T00:30:14.240Z"),
      status: 3,
    },
    {
      created: new Date("2023-10-22T19:30:14.240Z"),
      status: 3,
    },
    {
      created: new Date("2023-10-23T19:30:14.240Z"),
      status: 5,
    },
  ];

  before(async () => {
    await sequelize.sync();
    await User.create({
      id: 0,
      email: "test.user@gmail.com",
      password: "some_password",
    });
    statisticsService = new StatisticsService();
    customers.forEach(async (customer, index) => {
      await Customer.create({
        ...defaultCustomer,
        customerName: `Customer ${index}`,
        status: customer.status,
        created: customer.created,
      });
    });
  });

  it("Statuses equality between (2023-10-20T20:30:14.240Z and 2023-10-27T19:30:14.240Z)", async () => {
    let statuses = await statisticsService.getStatuses(
      0,
      new Date("2023-10-20T20:30:14.240Z"),
      new Date("2023-10-27T19:30:14.240Z")
    );
    assert.deepStrictEqual(
      statuses.map((stat) => stat.dataValues),
      [
        { status: 0, count: 1 },
        { status: 1, count: 2 },
        { status: 3, count: 2 },
        { status: 5, count: 1 },
      ]
    );
  });

  it("Statuses equality between range without mathing customers", async () => {
    let statuses = await statisticsService.getStatuses(
      0,
      new Date("2010-10-20T20:30:14.240Z"),
      new Date("2010-10-27T19:30:14.240Z")
    );
    assert.deepStrictEqual(
      statuses.map((stat) => stat.dataValues),
      []
    );
  });

  it("Statuses equality by null range", async () => {
    let statuses = await statisticsService.getStatuses(0, null, null);
    assert.deepStrictEqual(
      statuses.map((stat) => stat.dataValues),
      [
        { status: 0, count: 1 },
        { status: 1, count: 2 },
        { status: 3, count: 3 },
        { status: 5, count: 1 },
      ]
    );
  });

  it("Statuses equality in case [from] is greaetr than [to]", async () => {
    let statuses = await statisticsService.getStatuses(
      0,
      new Date("2010-10-27T19:30:14.240Z"),
      new Date("2010-10-20T20:30:14.240Z")
    );
    assert.deepStrictEqual(
      statuses.map((stat) => stat.dataValues),
      []
    );
  });

  it("Statuses equality in case of not existing user id", async () => {
    let statuses = await statisticsService.getStatuses(
      10,
      new Date("2023-10-20T20:30:14.240Z"),
      new Date("2023-10-27T19:30:14.240Z")
    );
    assert.deepStrictEqual(
      statuses.map((stat) => stat.dataValues),
      []
    );
  });
});
