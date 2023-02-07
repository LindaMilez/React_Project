import { Model, Server, Response } from "miragejs";
import db from "./db.json";
import bcryptjs from "bcryptjs";
import jwt from "jsonwebtoken";

const jwtPrivateKey = process.env.PRIVATE_KEY || "ChocolateDoughnuts";
const lsKey = "TinyThoughts_DataPersistence";

const sign = (obj) =>
  new Promise((resolve, reject) => {
    jwt.sign(obj, jwtPrivateKey, (error, token) => {
      if (error) return reject(error);

      return resolve(token);
    });
  });

const verify = (token) =>
  new Promise((resolve, reject) => {
    jwt.verify(token, jwtPrivateKey, (error) => {
      if (error) return reject();
      return resolve({ success: true });
    });
  });

const protectedRoute = async (schema, request, cb) => {
  const headers = request.requestHeaders;

  if (!headers.authorization) {
    return new Response(
      401,
      { "content-type": "application/json" },
      { error: "Missing authorization header in request" }
    );
  }

  const token = headers.authorization.split(" ")[1];
  const vrf = await verify(token);

  if (!vrf) {
    return new Response(
      401,
      { "content-type": "application/json" },
      { error: "Unauthorized" }
    );
  }

  return cb(schema, request);
};

const persist = (contents) => {
  window.localStorage.setItem(
    lsKey,
    JSON.stringify({ db: contents, timestamp: new Date().getTime() })
  );
};

const loadData = (tte) => {
  if (!window.localStorage[lsKey]) {
    return { db };
  }

  let ttd = JSON.parse(window.localStorage.getItem(lsKey));
  let diff = (new Date().getTime() - ttd.timestamp) / 60000;

  if (diff > tte) {
    window.localStorage.removeItem(lsKey);
    return {
      db,
    };
  }

  return ttd;
};

export default (opt = { tte: 20 }) =>
  new Server({
    seeds(server) {
      server.db.loadData(loadData(opt.tte).db);
    },
    models: {
      posts: Model.extend(),
      author: Model.extend(),
      categories: Model.extend(),
    },
    routes() {
      this.namespace = "api";
      this.get("/categories", (schema, request) => schema.db.categories);
      this.get("/posts", (schema, request) => {
        return schema.db.posts
          .sort((a, b) => Number(b.id) - Number(a.id))
          .map((post) => {
            return {
              ...post,
              author: schema.db.authors.filter(
                (i) => Number(i.id) === Number(post.authorId)
              )[0],
              categories: schema.db.categories.filter(
                (i) => Number(i.id) === Number(post.categoriesId)
              )[0],
            };
          });
      });

      this.get("/posts/:id", (schema, request) => {
        const id = request.params.id;
        const getPost = schema.db.posts.filter(
          (p) => Number(p.id) === Number(id)
        )[0];
        return {
          ...getPost,
          author: schema.db.authors.filter(
            (i) => Number(i.id) === Number(getPost.authorId)
          )[0],
          categories: schema.db.categories.filter(
            (i) => Number(i.id) === Number(getPost.categoriesId)
          )[0],
        };
      });

      this.get("/posts/category/:id", (schema, request) => {
        const id = request.params.id;

        return schema.db.posts.where({ categoriesId: id }).map((post) => {
          return {
            ...post,
            author: schema.db.authors.filter(
              (i) => Number(i.id) === Number(post.authorId)
            )[0],
            categories: schema.db.categories.filter(
              (i) => Number(i.id) === Number(post.categoriesId)
            )[0],
          };
        });
      });

      this.get("/posts/author/:id", (schema, request) => {
        const id = request.params.id;
        return schema.db.posts.where({ authorId: id }).map((post) => {
          return {
            ...post,
            author: schema.db.authors.filter(
              (i) => Number(i.id) === Number(post.authorId)
            )[0],
            categories: schema.db.categories.filter(
              (i) => Number(i.id) === Number(post.categoriesId)
            )[0],
          };
        });
      });

      this.post("/posts", (schema, request) =>
        protectedRoute(schema, request, async (schema, request) => {
          const newPost = JSON.parse(request.requestBody);
          const newlyCreatedPost = schema.db.posts.insert(newPost);
          persist(schema.db.dump());
          return {
            id: newlyCreatedPost.id,
          };
        })
      );

      this.delete("/posts/:id", (schema, request) =>
        protectedRoute(schema, request, (schema, request) => {
          const id = request.params.id;
          schema.db.posts.remove({ id });
          persist(schema.db.dump());
          return { message: true };
        })
      );

      this.post("/verify", async (schema, request) => {
        const { token } = JSON.parse(request.requestBody);
        const user = jwt.decode(token);
        const fetchUser = await schema.db.authors.findBy({ email: user.email });

        if (!fetchUser) {
          return new Response(
            401,
            { "content-type": "application/json" },
            { error: "Unauthorized" }
          );
        }
        return await verify(token);
      });

      this.post("/signup", async (schema, request) => {
        if (
          JSON.stringify(Object.keys(JSON.parse(request.requestBody))) !==
          JSON.stringify(["name", "email", "password", "dateJoined"])
        ) {
          return new Response(
            401,
            { "content-type": "application/json" },
            { error: "Data missing in request" }
          );
        }

        const { email, password, ...user } = JSON.parse(request.requestBody);
        const fetchUser = schema.db.authors.findBy({ email });

        if (fetchUser) {
          return new Response(
            401,
            { "content-type": "application/json" },
            { error: "User already exists" }
          );
        }

        const hashedPwd = bcryptjs.hashSync(password, 10);
        const newUser = {
          password: hashedPwd,
          email,
          ...user,
        };

        const nUser = schema.db.authors.insert(newUser);
        persist(schema.db.dump());
        const signed = await sign({
          id: nUser.id,
          name: nUser.name,
          email: nUser.email,
        });

        return { token: signed, user: { id: nUser.id, name: nUser.name } };
      });

      this.post("/signin", async (schema, request) => {
        const body = JSON.parse(request.requestBody);

        if (body.email && body.password) {
          const fetchUser = schema.db.authors.findBy({ email: body.email });
          if (fetchUser) {
            const compPass = await bcryptjs.compare(
              body.password,
              fetchUser.password
            );
            if (!compPass) {
              return new Response(
                401,
                { "content-type": "application/json" },
                { error: "Incorrect password" }
              );
            }

            const token = await sign({
              id: fetchUser.id,
              name: fetchUser.name,
              email: fetchUser.email,
              dateJoined: fetchUser.dateJoined,
            });

            return { token, user: { id: fetchUser.id, name: fetchUser.name } };
          } else {
            return new Response(
              401,
              { "content-type": "application/json" },
              { error: "Incorrect password" }
            );
          }
        }
      });
    },
  });
