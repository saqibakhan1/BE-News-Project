const db = require("../db/connection")
const seed = require("../db/seeds/seed")
const testData = require("../db/data/test-data/index")
const request = require("supertest")
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

describe("GET /api/articles/:article_id", () => {
  test("status 200, when given a valid ID, returns relevant article", () => {
    return request(app)
      .get(`/api/articles/3`)
      .expect(200)
      .then((res) => {
        expect(res.body.article).toEqual(
          expect.objectContaining({

            author: expect.any(String),
            title: expect.any(String),
            article_id: 3,
            body: expect.any(String), 
            topic: "mitch",
            created_at: expect.any(String),
            votes: expect.any(Number)

          })
        );
      });
  });
})    