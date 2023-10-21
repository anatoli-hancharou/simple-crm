import { scheduleJob } from "node-schedule";
import {
  getCustomersToComplete,
  setCustomerAsNotified,
} from "../services/customer-service.js";
import { sendMail } from "../services/email-service.js";

const dueDateEmailJob = scheduleJob("*/5 * * * *", async function () {
  let customers = await getCustomersToComplete(12);
  for (const customer of customers) {
    const to = customer.User.email;
    await sendMail(
      to,
      {
        subject: "The deadline for your customer is just around the corner!",
        text: `Just a reminder that your task deadline for customer ${customer.customerName} is approaching.`,
        html: `<h3>Just a reminder that your task deadline for customer <b>${customer.customerName}</b> is approaching.</h3>`,
      },
      async () => await setCustomerAsNotified(customer.id)
    );
  }
});

export default dueDateEmailJob;
