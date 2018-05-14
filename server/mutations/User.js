/* @flow */
const graphql = require('graphql');
const mongoose = require('mongoose');
const {
  GraphQLObjectType,
  GraphQLNonNull,
  GraphQLString,
  GraphQLID
} = graphql;

const UserType = require('../schema/User');
const UserModel = require('../models/User');

const mutations = {
  addUser: {
    type: UserType,
    args: {
      sub: {
        type: new GraphQLNonNull(GraphQLString)
      },
      name: {
        type: new GraphQLNonNull(GraphQLString)
      },
      email: {
        type: new GraphQLNonNull(GraphQLString)
      }
    },
    resolve(parentValue, { sub, name, email }) {
      return UserModel.create({
        sub,
        name,
        email
      });
    }
  },
  editUser: {
    type: UserType,
    args: {
      name: {
        type: new GraphQLNonNull(GraphQLString)
      },
      email: {
        type: new GraphQLNonNull(GraphQLString)
      }
    },
    resolve(parentValue, { name, email }, req) {
      if (!req.user) {
        throw new Error('Authentication required.');
      }

      return UserModel.findOneAndUpdate({ sub: req.user.sub }, {name, email});
    }
  },
  deleteUser: {
    type: UserType,
    resolve(parentValue, args, req) {
      if (!req.user) {
        throw new Error('Authentication required.');
      }

      return UserModel.findOneAndRemove({ sub: req.user.sub });
    }
  }
};

module.exports = mutations;
