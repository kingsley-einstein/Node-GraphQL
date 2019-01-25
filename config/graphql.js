import expressGraphQL from 'express-graphql';
import { buildSchema } from 'graphql';

const schema = buildSchema(
    `type Query {
        message: String
    }`
);

const root = {
    message: () => 'Hello world'
};

export function configGraphQL(app) {
    app.use('/graphQL', expressGraphQL({
        rootValue: root,
        schema: schema,
        graphiql: true
    }));
}