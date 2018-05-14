/* @flow */
const graphql = require('graphql');
const mongoose = require('mongoose');
const {
  GraphQLObjectType,
  GraphQLString,
  GraphQLList,
  GraphQLID
} = graphql;
const UserType = require('./User');
const UserModel = require('../models/User');

const RootQuery = new GraphQLObjectType({
  name: 'RootQueryType',
  fields: {
    users: {
      type: new GraphQLList(UserType),
      resolve(parentValue, args, req) {
        return UserModel.find();
      }
    },
    user: {
      type: UserType,
      args: {
        id: {
          type: GraphQLID
        }
      },
      resolve(parentValue, args) {
        return UserModel.findById(args.id);
      }
    }
  }
});

module.exports = RootQuery;
