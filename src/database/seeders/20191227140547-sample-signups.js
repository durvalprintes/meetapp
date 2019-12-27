export default {
  async up(queryInterface) {
    await queryInterface.bulkInsert(
      'signups',
      [
        {
          user_id: 4,
          meetup_id: 1,
          created_at: new Date(),
          updated_at: new Date(),
        },
        {
          user_id: 4,
          meetup_id: 2,
          created_at: new Date(),
          updated_at: new Date(),
        },
        {
          user_id: 4,
          meetup_id: 4,
          created_at: new Date(),
          updated_at: new Date(),
        },
        {
          user_id: 5,
          meetup_id: 1,
          created_at: new Date(),
          updated_at: new Date(),
        },
        {
          user_id: 5,
          meetup_id: 5,
          created_at: new Date(),
          updated_at: new Date(),
        },
      ],
      {},
    );
  },

  async down(queryInterface) {
    await queryInterface.bulkDelete('signups', null, {});
  },
};
