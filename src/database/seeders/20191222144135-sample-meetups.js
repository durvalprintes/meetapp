export default {
  async up(queryInterface) {
    await queryInterface.bulkInsert(
      'meetups',
      [
        {
          title: 'Evento 1',
          description: 'Rocketseat',
          location: 'CINBESA',
          date: new Date(new Date().setDate(new Date().getDate() - 10)),
          file_id: 1,
          user_id: 1,
          created_at: new Date(),
          updated_at: new Date(),
        },
        {
          title: 'Evento 2',
          description: 'NodeJS',
          location: 'PRODEPA',
          date: new Date(new Date().setDate(new Date().getDate() + 10)),
          file_id: 2,
          user_id: 1,
          created_at: new Date(),
          updated_at: new Date(),
        },
        {
          title: 'Evento 3',
          description: 'ReactJS',
          location: 'SERPRO',
          date: new Date(
            new Date(new Date().setDate(new Date().getDate() + 10)).setHours(
              new Date().getHours() + 5,
            ),
          ),
          file_id: 3,
          user_id: 1,
          created_at: new Date(),
          updated_at: new Date(),
        },
        {
          title: 'Evento 4',
          description: 'NativeJS',
          location: 'CINBESA',
          date: new Date(new Date().setDate(new Date().getDate() + 20)),
          file_id: 4,
          user_id: 1,
          created_at: new Date(),
          updated_at: new Date(),
        },
        {
          title: 'Evento 5',
          description: 'ReactJS',
          location: 'CINBESA',
          date: new Date(
            new Date(new Date().setDate(new Date().getDate() + 10)).setHours(
              new Date().getHours() + 5,
            ),
          ),
          file_id: 3,
          user_id: 2,
          created_at: new Date(),
          updated_at: new Date(),
        },
      ],
      {},
    );
  },

  async down(queryInterface) {
    await queryInterface.bulkDelete('meetups', null, {});
  },
};
