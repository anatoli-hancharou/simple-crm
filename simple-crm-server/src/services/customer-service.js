import Customer from "../db/models/Customer.js";
import { Op } from "sequelize";
import User from "../db/models/User.js";

export async function getCustomersToComplete(hours) {
  let currentDate = new Date();
  let notifyFromDate = new Date(
    currentDate.setHours(currentDate.getHours() + hours)
  );

  return await Customer.findAll({
    where: {
      dueDate: {
        [Op.lt]: notifyFromDate,
      },
      notified: false,
    },
    include: {
      model: User,
      attributes: ["email"],
    },
  });
}

export async function setCustomerAsNotified(id) {
  await Customer.update({ notified: true }, {
    where: {
      id: id
    }
  });
}
