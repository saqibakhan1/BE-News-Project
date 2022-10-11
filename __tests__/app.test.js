const db = require("../db/connection") // importing connection.js file
const seed = require("../db/seeds/seed") // importing seed file
const testData = require("../db/data/test-data/index") // importing all test data
const request = require("supertest") // supertest
const app = require("../app")

beforeEach(() => seed(testData))
afterAll(() => {
    db.end();
  });

describe("testing for an invalid URL path", () => {
    test("404 status and response message", () => {
        return request(app)
        .get("/undefined/route")
        .expect(404)
        .then(({ body }) => {
            expect(body.msg).toBe("invalid URL- path not found")
        })
    })
})

describe("GET /api/topics", () => {
    test("status 200, should respond with all the topics", () => {
        return request(app)
        .get("/api/topics")
        .expect(200)
        .then(({ body }) => {
            console.log(body.topics)
            // const expected = 3
            expect(body.topics).toHaveLength(3);
            body.topics.forEach((topic) => {
              expect(topic).toEqual(
                expect.objectContaining({
                  description: expect.any(String),
                  slug: expect.any(String),
                })
              );
            });
          });
      });
    });