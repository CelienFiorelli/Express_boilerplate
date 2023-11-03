
const sequelize = require('./models/index');

afterAll(async () => {
    await sequelize.sync({force: true});
    await sequelize.close();
})