import { GraphQLObjectType, GraphQLID, GraphQLNonNull, GraphQLString, GraphQLList } from 'graphql'
import { Article } from './article-graphql';

export const User = new GraphQLObjectType({
    name: 'User',
    fields: () => ({
        id: {
            type: new GraphQLNonNull(GraphQLID)
        },
        email: {
            type: new GraphQLNonNull(GraphQLString)
        },
        password: {
            type: new GraphQLNonNull(GraphQLString)
        },
        articles: {
            type: new GraphQLList(Article)
        }
     }) 
 });
