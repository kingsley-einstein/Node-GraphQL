import { GraphQLObjectType, GraphQLID, GraphQLString, GraphQLNonNull } from 'graphql';
import { User } from './user-graphql';

export const Article = new GraphQLObjectType({
    name: 'Article',
    fields: () => ({
        author: {
            type: User
        },
        id: {
            type: new GraphQLNonNull(GraphQLID)
        },
        title: {
            type: new GraphQLNonNull(GraphQLString)
        },
        content: {
            type: new GraphQLNonNull(GraphQLString)
        }
    })
});