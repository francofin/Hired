const {gql} = require('apollo-server-express');
const { authMiddleware } = require('../../utils/auth');
const {DateTimeResolver} = require('graphql-scalars');

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

const allPosts = async (parent, args, {req}) => {
    return posts;
};

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


module.exports = {
    Query:{
        totalPosts,
        allPosts,
    },
    Mutation:{
        newPost,
    }
}
