import dueDateEmailJob from "./due-date-email-job.js";
import 'dotenv/config'

export default function scheduleJobs() {
  if (process.env.ENABLE_NOTIFICATIONS === "true") {
    dueDateEmailJob.schedule();
  }
}