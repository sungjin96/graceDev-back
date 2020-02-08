import "reflect-metadata";
import Express from "express";
import helmat from "helmet";
import cors from "cors";
import http from "http";
import { createConnection } from "typeorm";
import { ApolloServer } from "apollo-server-express";
import { createSchema } from "./utils/createSchema";
import connectRedis from "connect-redis";
import { redis } from "./redis";
import session from "express-session";

class Server extends http.Server {
  private RedisStore: connectRedis.RedisStore;
  private app: Express.Express;
  private apolloServer: ApolloServer;

  constructor() {
    super();

    this.app = Express();
    this.createFunction();
    this.middleware();
  }

  async createFunction() {
    await createConnection();
    const schema = await createSchema();
    this.RedisStore = await connectRedis(session);
    this.apolloServer = await new ApolloServer({
      schema,
      context: ({ req, res }: any) => ({ req, res })
    });
  }

  async middleware() {
    this.app.use(helmat());
    this.app.use(helmat.xssFilter());
    this.app.use(helmat.frameguard());
    this.app.use(
      cors({
        credentials: true,
        origin: "http://localhost:3000"
      })
    );
    this.app.use(
      session({
        store: new this.RedisStore({
          client: redis as any
        }),
        name: "qid",
        secret: "wkdtjdwls",
        resave: false,
        saveUninitialized: false,
        cookie: {
          httpOnly: true,
          secure: process.env.NODE_ENV === "production",
          maxAge: 1000 * 60 * 60 * 24 * 7 * 365
        }
      })
    );

    await this.apolloServer.applyMiddleware({ app: this.app });
  }
}

export const init = async () => {
  const server = await new Server();
  return server;
}

export default Server;
