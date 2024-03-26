"use strict";

const shipItApi = require("../shipItApi")
shipItApi.shipProduct = jest.fn();

const request = require("supertest");
const app = require("../app");


describe("POST /", function () {

  test("valid", async function () {

    shipItApi.shipProduct.mockReturnValue(45);

    const resp = await request(app).post("/shipments").send({
      productId: 1000,
      name: "Test Tester",
      addr: "100 Test St",
      zip: "12345-6789",
    });
// TODO: change expect any
    expect(resp.body).toEqual({ shipped: expect.any(Number) });
  });

  test("throws error if empty request body", async function () {

    const resp = await request(app)
      .post("/shipments")
      .send();
    expect(resp.statusCode).toEqual(400);
  });

  test("non-empty invalid input", async function () {
    const resp = await request(app).post("/shipments").send({
      "productId": "should be a number",
      "name": 45,
      "addr": 45
    });

    expect(resp.body).toEqual({
      "error": {
        "message": [
          "instance.productId is not of a type(s) integer",
          "instance.name is not of a type(s) string",
          "instance.addr is not of a type(s) string",
          "instance requires property \"zip\""
        ],
        "status": 400
      }
    });
  });
});
