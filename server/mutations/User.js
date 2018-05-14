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
      name: {
        type: new GraphQLNonNull(GraphQLString)
      },
      email: {
        type: new GraphQLNonNull(GraphQLString)
      }
    },
    resolve(parentValue, { name, email }) {
      console.log(req.token);
      if (!req.user) {
        throw new Error('Authentication required.');
      }

      return UserModel.create({
        name,
        email
      });
    }
  },
  editUser: {
    type: UserType,
    args: {
      id: {
        type: new GraphQLNonNull(GraphQLString)
      },
      name: {
        type: GraphQLString
      },
      email: {
        type: GraphQLString
      }
    },
    resolve(parentValue, { id, name, email }) {
      if (!req.user) {
        throw new Error('Authentication required.');
      }

      return UserModel.findByIdAndUpdate(id, {name, email});
    }
  },
  deleteUser: {
    type: UserType,
    args: {
      id: {
        type: new GraphQLNonNull(GraphQLID)
      }
    },
    resolve(parentValue, { id }) {
      if (!req.user) {
        throw new Error('Authentication required.');
      }

      return UserModel.findByIdAndRemove(id);
    }
  }
};

module.exports = mutations;
