import Customer from "../../db/models/Customer.js";
import { sequelize } from "../../db/db-connection.js";
import { Op } from "sequelize";

class StatisticsService {
  constructor() {}

  // addCustomer = async (customer) => {
  //   const newCustomer = await Customer.create(customer);
  //   return newCustomer;
  // };

  // updateCustomer = async (id, customer) => {
  //   await Customer.update(customer, {
  //     where: {
  //       id: id
  //     }
  //   });
  // }

  getStatuses = async (userId, from, to) => {
    return await Customer.findAll({
      attributes: [
        "status",
        [sequelize.fn("COUNT", sequelize.col("id")), "count"],
      ],
      where: {
        userId: userId,
        ...(!!(from && to)
          ? {
              created: {
                [Op.gt]: from,
                [Op.lt]: to,
              },
            }
          : {}),
      },
      group: [["status"]],
    });
  };
}

export default StatisticsService;
