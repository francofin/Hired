const { authMiddleware } = require('../../utils/auth');
const { User, Job } = require('../../models');
const shortid = require('shortid');
const {DateTimeResolver} = require('graphql-scalars');


const createUser = async(parent, args, {req}) => {
    const currentUser = await authMiddleware({req});
    const user  = await User.findOne({email: currentUser.email});
    return user ? user : new User({
        email: currentUser.email,
        userName: shortid.generate()
    }).save();
}

//Add delete User

const profile = async(parent, args, {req}) => {
    const currentUser = await authMiddleware({req});
    const user  = await User.findOne({email: currentUser.email});
    return user 
}

const publicProfile = async(parent, args, {req}) => {
    const user = await User.findOne({userName: args.userName}).exec();
    return user
}


const updateUser = async(parent, args, {req}) => {
    const currentUser = await authMiddleware({req});
    const updatedUser  = await User.findOneAndUpdate({email: currentUser.email}, {...args.input}, {new:true}).exec();
    return updatedUser 
}

const allUsers = async(parent, args, {req}) => await User.find({}).exec();

const addConnection = async(parent, args, {req}) => {
    const currentUser = await authMiddleware({req});
    const user = User.findOne({email:currentUser.email}).exec();
    let userConnection = User.findOne({_id:args.userId}).exec();

    if(!userConnection.connections.includes(user._id)) {
        const updatedUser = User.findByIdAndUpdate({_id: user._id}, 
            {connections: [...connections, userConnection._id]}, {new:true}).exec();
        
        return updatedUser;
    }


    return user;
}

const applyToJob = async(parent, args, {req}) => {
    const currentUser = await authMiddleware({req});
    const user = await User.findOne({email:currentUser.email}).exec();
    const jobInterest = await Job.findById({_id: args.jobId}).exec();


    let matchedToCandidates = jobInterest.matchedCandidates;
    let userMatchedJobs = user.matchedJobs;
    let userAppliedJobs = user.appliedTo;
    let jobApplicants = jobInterest.applicants;
    let updatedUser;
    
    if(jobInterest.candidates.includes(user._id)){
        await Job.findByIdAndUpdate({_id: args.jobId}, {matchedCandidates:[...matchedToCandidates, user._id]}, {new:true}).exec();
        updatedUser = await User.findByIdAndUpdate({_id:user._id}, {matchedJobs:[...userMatchedJobs, jobInterest._id], appliedTo:[...userAppliedJobs, jobInterest._id]}, {new:true}).exec();
    }
    else{
        await Job.findByIdAndUpdate({_id: args.jobId}, {applicants:[...jobApplicants, user._id]}, {new:true}).exec();
        updatedUser = await User.findByIdAndUpdate({_id:user._id}, {appliedTo:[...userAppliedJobs, jobInterest._id]}).exec();
    }
    
    return updatedUser;
}

const deleteUserProfile = async(parent, args, {req}) => {
    const currentUser = await authMiddleware({req});
    const user = await User.findOne({email:currentUser.email}).exec();
    const updatedUser = await User.findOneAndUpdate({email:currentUser.email}, {wantsToDelete:true}, {new:true}).exec();
    return updatedUser.wantsToDelete && await User.findOneAndDelete({email:currentUser.email}).exec();
}

const deleteUserProfileFromJob = async(parent, args, {req}) => {
    const currentUser = await authMiddleware({req});
    const user = await User.findById({_id:args.userId}).exec();
    const jobToDeleteUserFrom = await Job.findById({_id:args.jobId}).exec();
    const jobCandidates = jobToDeleteUserFrom.candidates.filter((userId) => {
        return args.userId.toString() !== jobCandidate._id.toString();
    });
    const jobApplicants = jobToDeleteUserFrom.applicants.filter((userId) => {
        return args.userId.toString() !== jobCandidate._id.toString();
    });;
    const jobMatchedCandidates = jobToDeleteUserFrom.matchedCandidates.filter((userId) => {
        return args.userId.toString() !== jobCandidate._id.toString();
    });;
    if(jobCandidates.includes(user._id) || jobApplicants.includes(user._id) || jobMatchedCandidates.includes(user._id)){
        await Job.findByIdAndUpdate({_id:args.jobId}, {
            applicants:[...jobApplicants],
            candidates:[...jobCandidates],
            matchedCandidates:[...jobMatchedCandidates]
        }).exec();
    }
    
}

const saveJob = async(parent, args, {req}) => {
    const currentUser = await authMiddleware({req});
    const user = await User.findOne({email:currentUser.email}).exec();
    const jobInterest = await Job.findById({_id: args.jobId}).exec();
    let userSavedJobs = user.saveForLater;
    const updatedUser = await User.findByIdAndUpdate({_id:user._id}, {saveForLater:[...userSavedJobs, jobInterest._id]}).exec();

    return updatedUser;
}

module.exports ={
    Query: {
        profile,
        publicProfile,
        allUsers
    },
    Mutation:{
        createUser,
        updateUser,
        addConnection,
        applyToJob,
        saveJob,
        deleteUserProfile
    }, 

}