const graphql = require('graphql');
const { GraphQLObjectType } = graphql;
const { addUser, editUser, deleteUser } = require('./User');

const Mutation = new GraphQLObjectType({
  name: 'Mutation',
  fields: {
    addUser,
    editUser,
    deleteUser
  }
});

module.exports = Mutation;
