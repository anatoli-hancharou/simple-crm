import request from "supertest";
import app from "../app.js";
import { describe, it, before } from "node:test";
import assert from "node:assert/strict";
import { sequelize } from "../db/db-connection.js";

describe("End-to-end tests", () => {
  before(async () => {
    await sequelize.sync();
    await request(app)
      .post("/auth/register")
      .send({ email: "test.user@gmail.com", password: "some_password" })
      .then(() => console.log("Added initial user."));
  });

  describe("Unauthenticated requests", () => {
    it("GET /Customers: Should return 403 if no token", async () => {
      const res = await request(app).get("/customers").expect(403);
      assert.strictEqual(res.text, "A token is required for authentication");
    });
  });

  describe("Authenticated requests", () => {
    let token;
    let customerId;
    before(async () => {
      const authRes = await request(app)
        .post("/auth/login")
        .send({ email: "test.user@gmail.com", password: "some_password" });
      token = authRes.body.token;
    });

    it("GET /Customers: Should return empty list", async (done) => {
      const res = await request(app)
        .get("/customers")
        .auth(token, { type: "bearer" })
        .expect(200, [], done);
    });

    it("POST /Customers: Should return 201 on add", async () => {
      await request(app)
        .post("/customers")
        .auth(token, { type: "bearer" })
        .send({
          address: "35273 Welch Drive, Schinnerport, 14889-7657",
          customerName: "Friesen, Jacobs and Gerlach",
          description: "Document Management Requirements",
          dueDate: "2023-10-26T19:30:14.240Z",
          phone: "(305) 497-9198",
          status: 3,
        })
        .expect(201);
    });

    it("GET /Customers: Should return one customer", async (done) => {
      const res = await request(app)
        .get("/customers")
        .auth(token, { type: "bearer" });
      assert.ok(Array.isArray(res.body), "Response body is not an array type.");
      assert.strictEqual(
        res.body.length,
        1,
        "Number of customers is not equal to 1."
      );
      const customer = res.body[0];
      customerId = customer.id;
      assert.strictEqual(customer.customerName, "Friesen, Jacobs and Gerlach");
      assert.strictEqual(
        customer.address,
        "35273 Welch Drive, Schinnerport, 14889-7657"
      );
      assert.strictEqual(
        customer.description,
        "Document Management Requirements"
      );
      assert.strictEqual(customer.dueDate, "2023-10-26T19:30:14.240Z");
      assert.strictEqual(customer.phone, "(305) 497-9198");
      assert.strictEqual(customer.status, 3);
    });

    it("GET /statistics/get-status-distribution without query params: Should return one item array", async () => {
      const res = await request(app)
        .get("/statistics/get-status-distribution")
        .auth(token, { type: "bearer" })
        .expect(200);
      assert.ok(Array.isArray(res.body), "Response body is not an array type.");
      assert.strictEqual(
        res.body.length,
        1,
        "Number of statuses is not equal to 1."
      );
      const statusStats = res.body[0];
      assert.strictEqual(statusStats.status, 3);
      assert.strictEqual(statusStats.count, 1);
    });

    it("GET /statistics/get-status-distribution within [now - 1h; now +1h] interval: Should return one item array", async () => {
      const from = new Date(new Date().setHours(new Date().getHours() - 1));
      const to = new Date(new Date().setHours(new Date().getHours() + 1));
      const res = await request(app)
        .get("/statistics/get-status-distribution")
        .query({ from: from.toUTCString(), to: to.toUTCString() })
        .auth(token, { type: "bearer" })
        .expect(200);
      assert.ok(Array.isArray(res.body), "Response body is not an array type.");
      assert.strictEqual(
        res.body.length,
        1,
        "Number of statuses is not equal to 1."
      );
      const statusStats = res.body[0];
      assert.strictEqual(statusStats.status, 3);
      assert.strictEqual(statusStats.count, 1);
    });

    it("GET /statistics/get-status-distribution within [now - 2h; now -1h] interval: Should return zero item array", async () => {
      const from = new Date(new Date().setHours(new Date().getHours() - 2));
      const to = new Date(new Date().setHours(new Date().getHours() + -1));
      const res = await request(app)
        .get("/statistics/get-status-distribution")
        .query({ from: from.toUTCString(), to: to.toUTCString() })
        .auth(token, { type: "bearer" })
        .expect(200);
      assert.ok(Array.isArray(res.body), "Response body is not an array type.");
      assert.strictEqual(
        res.body.length,
        0,
        "Number of statuses is not equal to 0."
      );
    });

    it("DELETE /Customer: Should delete one customer", async () => {
      const res = await request(app)
        .delete("/customers/" + customerId)
        .auth(token, { type: "bearer" })
        .expect(204);
    });

    it("GET /Customers: Should return zero customers after delete", async (done) => {
      const res = await request(app)
        .get("/customers")
        .auth(token, { type: "bearer" });
      assert.ok(Array.isArray(res.body), "Response body is not an array type.");
      assert.strictEqual(
        res.body.length,
        0,
        "Number of customers is not equal to 0."
      );
    });

    it("GET /statistics/get-status-distribution within [now - 1h; now +1h] interval: Should return zero items arfter delete", async () => {
      const from = new Date(new Date().setHours(new Date().getHours() - 1));
      const to = new Date(new Date().setHours(new Date().getHours() + 1));
      const res = await request(app)
        .get("/statistics/get-status-distribution")
        .query({ from: from.toUTCString(), to: to.toUTCString() })
        .auth(token, { type: "bearer" })
        .expect(200);
      assert.ok(Array.isArray(res.body), "Response body is not an array type.");
      assert.strictEqual(
        res.body.length,
        0,
        "Number of statuses is not equal to 0."
      );
    });
  });
});
