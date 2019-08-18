import bcrypt from 'bcryptjs';

export default {
  async up(queryInterface) {
    await queryInterface.bulkInsert(
      'users',
      [
        {
          name: 'Teste',
          email: 'teste@testando.com',
          password_hash: bcrypt.hashSync('123456', bcrypt.genSaltSync()),
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
