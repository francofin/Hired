const {gql} = require('apollo-server-express');
const me = () => 'Magic'


module.exports ={
    Query:{
            me
    }
}