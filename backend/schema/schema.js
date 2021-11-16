const graphql = require('graphql');
const _ = require('lodash');

const {GraphQLObjectType,GraphQLString,GraphQLInt,GraphQLSchema} = graphql

const users = [
    {id:23,firstName: 'Hasham Javed',age: 26},
    {id:54, firstName: 'Saif Javed',age: 20}
]

const UserType = new GraphQLObjectType({
    name:'User',
    fields: {
        id: {type: GraphQLString},
        firstName: {type:GraphQLString},
        age: {type:GraphQLInt},
    }
})

const RootQuery = new GraphQLObjectType({
    name:'RootQueryType',
    fields: {
        user : {
            type: UserType,
            args: {id : {type: GraphQLString}},
            resolve(parentValue,args){
                //do database query inside this function
                return _.find(users,{id:args.age})
            }
        }
    }
})

const graphqlSchema = new GraphQLSchema({
    query: RootQuery,
})

module.exports = graphqlSchema