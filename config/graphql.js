import expressGraphQL from 'express-graphql';
import { GraphQLObjectType, GraphQLString, GraphQLID, GraphQLList, GraphQLNonNull, GraphQLSchema } from 'graphql';
import { UserModel, ArticleModel } from '../db/config/sequelize';
import { User } from './user-graphql';
import { Article } from './article-graphql';

const createUser = (email, password) => {
    return new Promise((resolve, reject) => {
        UserModel.create({
            email: email,
            password: password
        })
        .then(v => resolve(v))
        .catch(err => reject(err));
    });
};

const createArticle = (title, content, user) => {
    return new Promise((resolve, reject) => {
        ArticleModel.create({
            title: title,
            content: content,
            UserId: user
        })
        .then(v => resolve(v))
        .catch(err => reject(err)); 
    });
};

const findUserById = (id) => {
    return new Promise((resolve, reject) => {
        UserModel.findById(id)
            .then(u => resolve(u))
            .catch(err => reject(err));
    });
};

const findArticleById = (id) => {
    return new Promise((resolve, reject) => {
        ArticleModel.findById(id)
            .then(a => resolve(a))
            .catch(err => reject(err));
    });
};

const findAllUsers = () => {
    return new Promise((resolve, reject) => {
        UserModel.findAll({include: [ArticleModel]})
        .then(arr => resolve(arr))
        .catch(err => reject(err));
    });
};

const findAllArticles = () => {
    return new Promise((resolve, reject) => {
        ArticleModel.findAll({include: [UserModel]})
        .then(arr => resolve(arr))
        .catch(err => reject(err));
    });
};


const Query = new GraphQLObjectType({
    name: 'RootQuery',
    fields: {
        authorById: {
            type: new GraphQLNonNull(User),
            args: {
               id: {
                   type: new GraphQLNonNull(GraphQLID)
               } 
            },
            resolve: (_, args) => findUserById(args.id)
        },
        articleById: {
            type: new GraphQLNonNull(Article),
            args: {
                id: {
                    type: new GraphQLNonNull(GraphQLID)
                }
            },
            resolve: (_, args) => findArticleById(args.id)
        },
        users: {
            type: new GraphQLNonNull(new GraphQLList(User)),
            resolve: () => findAllUsers()
        },
        articles: {
            type: new GraphQLNonNull(new GraphQLList(Article)),
            resolve: () => findAllArticles()
        }
    }
});

const Mutation = new GraphQLObjectType({
    name: 'RootMutation',
    fields: {
        newUser: {
            type: new GraphQLNonNull(User),
            args: {
                email: {
                    type: new GraphQLNonNull(GraphQLString)
                },
                password: {
                    type: new GraphQLNonNull(GraphQLString)
                }
            },
            resolve: (_, args) => createUser(args.email, args.password)
        },
        newArticle: {
            type: new GraphQLNonNull(Article),
            args: {
                title: {
                    type: new GraphQLNonNull(GraphQLString)
                },
                content: {
                    type: new GraphQLNonNull(GraphQLString)
                },
                author: {
                    type: new GraphQLNonNull(GraphQLID)
                }
            },
            resolve: (_, args) => createArticle(args.title, args.content, args.author)
        }
    }
});

const schema = new GraphQLSchema({
    query: Query,
    mutation: Mutation
});

export function configGraphQL(app) {
    app.use('/graphQL', expressGraphQL({
        schema: schema,
        graphiql: true
    }));
}