const {gql} = require('apollo-server-express');
const posts = [
    {
        id: 1,
        title: 'First post',
        description: 'First post description',
        category: 'PUBLISHED'
    },
    {
        id: 2,
        title: 'Second post',
        description: 'Second post description',
        category: 'PUBLISHED'
    },
    {
        id: 3,
        title: 'Third post',
        description: 'Second post description',
        category: 'PUBLISHED'
    },
    {
        id: 4,
        title: 'Fourth post',
        description: 'Second post description',
        category: 'PUBLISHED'
    }
];

const totalPosts = () => posts.length;

const allPosts = () => posts;

const newPost = (parent, args) => {
    console.log(args)
    const post = {
        id: posts.length+1,
        title:args.input.title,
        description: args.input.description
    }

    posts.push(post);

    return post;
}




const resolvers = {
    Query:{
        totalPosts,
        allPosts,
    },
    Mutation:{
        newPost,
    }
}
module.exports =resolvers;