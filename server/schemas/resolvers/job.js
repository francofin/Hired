const { authMiddleware } = require('../../utils/auth');
const { Job, User } = require('../../models');
const shortid = require('shortid');
const {DateTimeResolver} = require('graphql-scalars');



const allJobs = async (parent, args, {req}) => {
    return await Job.find({})
    .populate('employer', '_id userName email companyName')
    .sort({createdAt: -1})
    .exec();
}


const newJob = async (parent, args, {req}) => {
    const user = await authMiddleware({req});
    //add ability to link 

    //if args.input.description <>"" then do, else error. 
    const userFromDb = await User.findOne({email: user.email});

    let newJobPosting = await Job.findOneAndUpdate({...args.input}, 
        {employer: userFromDb._id}).save()
        .then(job => job.populate('employer', '_id userName firstName lastName companyName').execPopulate());

    return newJobPosting;
}

const userJobs = async(parent, args, {req}) => {
    const user = await authMiddleware({req});
    const currentUser = await User.findOne({email:user.email}).exec();

    let userJobPostings = await Job.find({employer: currentUser})
    .populate('employer', '_id firstName lastName companyName')
    .sort({createdAt: -1});

    return userJobPostings;
}

const singleUserJob = async(parent, args, {req}) => {
    return await Job.findById({_id:args.jobId}).populate('employer', '_id firstName lastName companyName').exec();
}

const updateJob = async(parent, args, {req}) => {
    const user = await authMiddleware({req});
    if(args.input.content.trim() === '') {
        throw new Error('Content is required')
    }
    const currentUser = await User.findOne({email:user.email}).exec();
    let jobPosting = await Job.findById({_id: args.input._id}).exec();

    if(jobPosting.employer._id.toString() !== currentUser._id.toString()){
        throw new Error('You do not have the permissions to update this post.')
    }

    let updatedPost = await Job.findByIdAndUpdate({_id: args.input._id}, {...args.input}, {new:true}).exec();

    return updatedPost;

}

const deleteJob = async(parent, args, {req}) => {
    const user = await authMiddleware({req});
    const currentUser = await User.findOne({email:user.email}).exec();
    let jobPosting = await Job.findById({_id: args.jobId}).exec();
    if(jobPosting.employer._id.toString() !== currentUser._id.toString()){
        throw new Error('You do not have the permissions to update this post.');
    }

    let deletedJob = await Job.findByIdAndDelete({_id:args.jobId}).exec()

    return deletedJob;
}

//add resolver for matched and applied jobs. 

const showUserInterest = async (parent, args, {req}) => {
    const user = await authMiddleware({req});
    const currentUser = await User.findOne({email:user.email}).exec();
    const jobPosting = await Job.findById({_id:args.jobId}).exec();
    if(jobPosting.employer._id.toString() !== currentUser._id.toString()){
        throw new Error('You do not have the permissions to update this post.');
    }

    const jobCandidate = await User.findById({_id:args.userId}).exec();
    let allCandidates = jobPosting.candidates;
    let matchedToCandidates = jobPosting.matchedCandidates;
    let updatedJob;
    
    if(jobPosting.applicants.includes(jobCandidate._id)){
        let userApplicants = jobPosting.applicants.filter((userId) => {
            return userId.toString() !== jobCandidate._id.toString();
        });
        //Update the matched candidate array
        let userMatchedJobs = jobCandidate.matchedJobs;
        //update the usermatched jobs array 
        await User.findByIdAndUpdate({_id:args.userId}, {matchedJobs:[...userMatchedJobs, jobPosting._id]}).exec();
        //Delete from applicant array in job list 
        updatedJob = await Job.findByIdAndUpdate({_id:args.jobId}, {matchedCandidates:[...matchedToCandidates, jobCandidate._id], applicants:userApplicants}, {new:true}).exec();
    }
    else {
        updatedJob = await Job.findByIdAndUpdate({_id:args.jobId}, {candidates:[...allCandidates, jobCandidate._id]}, {new:true}).exec();
    }
    

 
    return updatedJob;
}


module.exports = {
    Query:{
        allJobs, 
        userJobs,
        singleUserJob
    },
    Mutation: {
        newJob,
        updateJob,
        showUserInterest,
        deleteJob
    }
}