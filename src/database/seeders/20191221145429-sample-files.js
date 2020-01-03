export default {
  async up(queryInterface) {
    await queryInterface.bulkInsert(
      'files',
      [
        {
          name: 'rocketseat',
          path: '0a1f775735d81c20997163918fc7eb3a.png',
          created_at: new Date(),
          updated_at: new Date(),
        },
        {
          name: 'nodejs',
          path: 'b4ea0560b3bb98fd6b726d535039d98b.png',
          created_at: new Date(),
          updated_at: new Date(),
        },
        {
          name: 'reactjs',
          path: '04f046b5fe1e3768ebcc68c0d9dfc1b8.png',
          created_at: new Date(),
          updated_at: new Date(),
        },
        {
          name: 'nativejs',
          path: '853a8239d2ff1e7538ba091225232f77.png',
          created_at: new Date(),
          updated_at: new Date(),
        },
      ],
      {},
    );
  },

  async down(queryInterface) {
    await queryInterface.bulkDelete('files', null, {});
  },
};
