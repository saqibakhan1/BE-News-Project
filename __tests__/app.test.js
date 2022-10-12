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
  test("status 404, responds with a message if article ID does not exist", () => {
    return request(app)
    .get("/api/articles/999")
    .expect(404)
    .then((res) => {
      expect(res.body).toEqual({msg: "Article number does not exist :("})
    })
  })
  test("status 400, responds with a message if article ID is not valid", () => {
    return request(app)
    .get("/api/articles/1a")
    .expect(400)
    .then((res) => {
      expect(res.body).toEqual({msg: "Article number is not valid :("})
    })
})

})
describe("GET /api/users", () => {
  test("status 200, responds with a list of users", () => {
    return request(app)
      .get("/api/users")
      .expect(200)
      .then((res) => {
        expect(res.body.users).toHaveLength(4);
           res.body.users.forEach((user) => {
            expect(user).toEqual(
            expect.objectContaining({
              username: expect.any(String),
              name: expect.any(String),
              avatar_url: expect.any(String),
            })
          );
        });
      });
  });
});


