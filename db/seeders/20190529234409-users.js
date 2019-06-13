const jenny = {
  name: 'Jenny Xu',
  location: 'Block A',
  phone_no: '07790727425',
  username: 'jenny',
  password: '$2b$12$UE.JXo9/jd.9bvIb.Aa.9.N6o8LpVW8nqsGQiBcD5sDvUktdfW5ze', // "password"
  is_staff: false,
  createdAt: new Date(),
  updatedAt: new Date(),
};

const bob = {
  name: 'Bob Bulmer',
  location: 'Block B',
  phone_no: '07831946183',
  username: 'bob',
  password: '$2b$12$UE.JXo9/jd.9bvIb.Aa.9.N6o8LpVW8nqsGQiBcD5sDvUktdfW5ze', // "password"
  is_staff: true,
  createdAt: new Date(),
  updatedAt: new Date(),
};

const charlie = {
  name: 'Charlie Cramer',
  location: 'Block C',
  phone_no: '07780372947',
  username: 'charlie',
  password: '$2b$12$UE.JXo9/jd.9bvIb.Aa.9.N6o8LpVW8nqsGQiBcD5sDvUktdfW5ze', // "password"
  is_staff: false,
  createdAt: new Date(),
  updatedAt: new Date(),
};

const daniel = {
  name: 'Daniel Doberman',
  location: 'Block D',
  phone_no: '07680134830',
  username: 'daniel',
  password: '$2b$12$UE.JXo9/jd.9bvIb.Aa.9.N6o8LpVW8nqsGQiBcD5sDvUktdfW5ze', // "password"
  is_staff: false,
  createdAt: new Date(),
  updatedAt: new Date(),
};

const ellie = {
  name: 'Ellie Enfield',
  location: 'Block E',
  phone_no: '07281715492',
  username: 'elie',
  password: '$2b$12$UE.JXo9/jd.9bvIb.Aa.9.N6o8LpVW8nqsGQiBcD5sDvUktdfW5ze', // "password"
  is_staff: false,
  createdAt: new Date(),
  updatedAt: new Date(),
};

module.exports = {
  up: queryInterface => queryInterface
    .bulkInsert('Users', [jenny, bob, charlie, daniel, ellie], {}),

  down: queryInterface => queryInterface
    .bulkDelete('Users', null, {}),

};

