/* @flow */
const graphql = require('graphql');
const {
  GraphQLObjectType,
  GraphQLString,
  GraphQLID
} = graphql;

const UserType = new GraphQLObjectType({
  name: 'User',
  fields: () => ({
    id: {
      type: GraphQLID,
      resolve(parentValue, args) {
        return parentValue._id;
      }
    },
    name: {
      type: GraphQLString
    },
    email: {
      type: GraphQLString
    }
  })
});

module.exports = UserType;
