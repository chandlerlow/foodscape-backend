const jenny = {
  name: 'Jenny Xu',
  location: 'Block A',
  phone_no: '07790727425',
  username: 'jenny',
  password: '$2b$12$UE.JXo9/jd.9bvIb.Aa.9.N6o8LpVW8nqsGQiBcD5sDvUktdfW5ze', // "password"
  createdAt: new Date(),
  updatedAt: new Date(),
};

const bob = {
  name: 'Bob Pintos',
  location: 'Block C',
  phone_no: '07831946183',
  username: 'bob',
  password: '$2b$12$UE.JXo9/jd.9bvIb.Aa.9.N6o8LpVW8nqsGQiBcD5sDvUktdfW5ze', // "password"
  createdAt: new Date(),
  updatedAt: new Date(),
};

module.exports = {
  up: queryInterface => queryInterface
    .bulkInsert('Users', [jenny, bob], {}),

  down: queryInterface => queryInterface
    .bulkDelete('Users', null, {}),

};
