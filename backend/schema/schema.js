const graphql = require('graphql');
const _ = require('lodash');
const axios = require('axios');

const {GraphQLObjectType,GraphQLString,GraphQLInt,GraphQLSchema,GraphQLList,GraphQLNonNull} = graphql

const url = 'http://localhost:5001/'

const CompanyType = new GraphQLObjectType({
    name:'Company',
    fields: ()=>(
        {
            id: {type: GraphQLString},
            name: {type:GraphQLString},
            description: {type:GraphQLString},
            users: {
                type:new GraphQLList(UserType),
                async resolve(parentValue,args){
                    const response = await axios.get('http://localhost:5001/companies/'+parentValue.id+'/users')
                    return response.data
                }
            }
        }
    )
})

const UserType = new GraphQLObjectType({
    name:'User',
    fields: {
        id: {type: GraphQLString},
        firstName: {type:GraphQLString},
        age: {type:GraphQLInt},
        company: {type:CompanyType,
            async resolve(parentValue,args){
                const response = await axios.get(`http://localhost:5001/companies/${parentValue.companyId}`)
                return response.data
            }
        }
    }
})

const mutation = new GraphQLObjectType({
    name:'Mutation',
    fields:{
        addUser: {
            type: UserType,
            args: {
                companyId: {type: GraphQLString},
                firstName: {type: new GraphQLNonNull(GraphQLString)},
                age: {type: new GraphQLNonNull(GraphQLInt)}
            },
            async resolve(parentValue,args){
                const {firstName,age,companyId} = args
               const response = await axios.post(`${url}users`,{firstName,age,companyId})
               return response.data
            }
        },
        deleteUser: {
            type : UserType,
            args : {
                id: {type: new GraphQLNonNull(GraphQLString)},
            },
            async resolve(parentValue,args){
                const {id} = args
                const response = await axios.delete(`${url}users/${id}`)
                return response.data
            }
        },
        editUser: {
            type: UserType,
            args : {
                id: {type: new GraphQLNonNull(GraphQLString)},
                firstName: {type: new GraphQLNonNull(GraphQLString)},
                age: {type: GraphQLInt}
            },
            async resolve(parentValue,args){
                const {firstName,age,id}= args
                const response = await axios.put(`${url}users/${id}`,{firstName,age})
                return response.data
            }
        }
    }
})



const RootQuery = new GraphQLObjectType({
    name:'RootQueryType',
    fields: {
        user : {
            type: UserType,
            args: {id : {type: GraphQLString}},
            async resolve(parentValue,args){
                //do database query inside this function
                const response = await axios.get('http://localhost:5001/users/'+args.id)
                return response.data
            }
        },
        company : {
            type:CompanyType,
            args: {id: {type: GraphQLString}},
            async resolve(parentValue,args){
                const response = await axios.get('http://localhost:5001/companies/'+args.id)
                return {message:'User deleted '+id}
            }
        }
    }
})

const graphqlSchema = new GraphQLSchema({
    query: RootQuery,
    mutation
})

module.exports = graphqlSchema