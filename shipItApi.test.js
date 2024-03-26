"use strict";

const { SHIPIT_API_KEY, SHIPIT_SHIP_URL } = require("./shipItApi")
const fetchMock = require("fetch-mock");


const {
  shipProduct,
} = require("./shipItApi");


test("shipProduct", async function () {
  fetchMock.post(SHIPIT_SHIP_URL, {
   body: {
    "receipt": {
      "itemId": 1234,
      "name": "started ",
      "addr": "1234 street",
      "zip": "1234",
      "shipId": 7875
   }},
   status: 201
  })


  const shipId = await shipProduct({
    productId: 1000,
    name: "Test Tester",
    addr: "100 Test St",
    zip: "12345-6789",
  });


  expect(shipId).toEqual(7875);
});
