/* @flow */
const graphql = require('graphql');
const mongoose = require('mongoose');
const {
  GraphQLObjectType,
  GraphQLString,
  GraphQLList
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
        sub: {
          type: GraphQLString
        }
      },
      resolve(parentValue, args) {
        return UserModel.findOne({ sub: args.sub });
      }
    }
  }
});

module.exports = RootQuery;
