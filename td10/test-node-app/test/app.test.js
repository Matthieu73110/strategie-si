const app = require("../index");
const request = require("supertest");

test("GET /ping", async () => {
  const res = await request(app).get("/ping");
  expect(res.statusCode).toBe(200);
  expect(res.text).toBe("pong");
});
