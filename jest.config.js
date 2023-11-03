require('dotenv').config({ path: '.env.test' });

module.exports = {
    setupFilesAfterEnv: ['./jest.setup.js']
}