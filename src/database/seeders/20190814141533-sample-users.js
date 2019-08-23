import bcrypt from 'bcryptjs';

export default {
  async up(queryInterface) {
    await queryInterface.bulkInsert(
      'users',
      [
        {
          name: 'Organizador 1',
          email: 'oganizador1@meetapp.com',
          password_hash: bcrypt.hashSync('111111', bcrypt.genSaltSync()),
          created_at: new Date(),
          updated_at: new Date(),
        },
        {
          name: 'Organizador 2',
          email: 'oganizador2@meetapp.com',
          password_hash: bcrypt.hashSync('222222', bcrypt.genSaltSync()),
          created_at: new Date(),
          updated_at: new Date(),
        },
        {
          name: 'Inscrito 1',
          email: 'inscrito1@meetapp.com',
          password_hash: bcrypt.hashSync('333333', bcrypt.genSaltSync()),
          created_at: new Date(),
          updated_at: new Date(),
        },
        {
          name: 'Inscrito 2',
          email: 'inscrito2@testando.com',
          password_hash: bcrypt.hashSync('444444', bcrypt.genSaltSync()),
          created_at: new Date(),
          updated_at: new Date(),
        },
        {
          name: 'Inscrito 3',
          email: 'inscrito3@meetapp.com',
          password_hash: bcrypt.hashSync('555555', bcrypt.genSaltSync()),
          created_at: new Date(),
          updated_at: new Date(),
        },
        {
          name: 'Inscrito 4',
          email: 'inscrito4@meetapp.com',
          password_hash: bcrypt.hashSync('666666', bcrypt.genSaltSync()),
          created_at: new Date(),
          updated_at: new Date(),
        },
      ],
      {},
    );
  },

  async down(queryInterface) {
    await queryInterface.bulkDelete('users', null, {});
  },
};
