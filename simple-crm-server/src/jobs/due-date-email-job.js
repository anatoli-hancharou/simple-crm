import { Job } from "node-schedule";
import {
  getCustomersToComplete,
  setCustomerAsNotified,
} from "../services/customer-service.js";
import { sendMail } from "../services/email-service.js";

const dueDateEmailJob = new Job("*/5 * * * *", async function () {
  const hoursBeforeDueDate = 12;
  let customers = await getCustomersToComplete(hoursBeforeDueDate);
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
