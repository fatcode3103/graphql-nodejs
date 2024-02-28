import { ApolloServer } from "@apollo/server";
import { startStandaloneServer } from "@apollo/server/standalone";

import { typeDefs } from "./schema.js";
import db from "./db.js";

const resolvers = {
    Query: {
        games() {
            return db.games;
        },
        game(_, args) {
            return db.games.find((item) => item.id == args.id);
        },
        reviews() {
            return db.reviews;
        },
        review(_, args) {
            return db.reviews.find((item) => item.id == args.id);
        },
        authors() {
            return db.authors;
        },
    },
    // get review by game id
    Game: {
        reviews(parent) {
            return db.reviews.filter((item) => item.game_id == parent.id);
        },
    },
    Review: {
        game(parent) {
            return db.games.find((item) => item.id == parent.game_id);
        },
        author(parent) {
            return db.authors.find((item) => item.id == parent.author_id);
        },
    },
    Mutation: {
        deleteGame(_, args) {
            return db.games.filter((item) => item.id != args.id);
        },
    },
};

const app = new ApolloServer({
    // typeDefs
    typeDefs,
    // resolvers - func query
    resolvers,
});

const { url } = await startStandaloneServer(app, {
    listen: { port: 4000 },
});

console.log("Server on port: ", 4000);
