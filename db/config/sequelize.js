import Sequelize from 'sequelize';
import { User, Article, Associator } from '../models';

const sequelize = new Sequelize('nodegraphql', 'root', '', {
    host: 'localhost',
    port: 3306,
    dialect: 'mysql',
    pool: {
        idle: 10000,
        max: 10,
        min: 3
    }
});

const UserModel = User(sequelize, Sequelize);
const ArticleModel = Article(sequelize, Sequelize);
const AssociatorModel = Associator(sequelize);

ArticleModel.belongsTo(UserModel, {through: AssociatorModel});
UserModel.belongsToMany(ArticleModel, {through: AssociatorModel});

function syncDb() {
    return sequelize.sync({
        force: true
    });
}

export {
    UserModel,
    ArticleModel,
    syncDb
}