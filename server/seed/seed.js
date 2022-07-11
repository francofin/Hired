const db = require('../config/connection');
const faker = require('faker');
const {Product, User, Job, Industry } = require('../models');


db.once('open', async () => {
    await Industry.deleteMany();

    const industrySet = await Industry.insertMany([
        { name: 'Finance' },
        { name: 'Private Equity' },
        { name: 'Metals' },
        { name: 'Consumer Services' },
        { name: 'Insurance' },
        { name: 'Agriculture, Farming, Forestry, Fishing and Hunting' },
        { name: 'Construction' },
        { name: 'Educational Services' },
        { name: 'Non-Profits' },
        { name: 'Healthcare' },
        { name: 'Pharmaceutical' },
        { name: 'Biotechnology' },
        { name: 'Healthcare Administration' },
        { name: 'Healthcare Services' },
        { name: 'Information Technology' },
        { name: 'Software' },
        { name: 'Gambling' },
        { name: 'Leisure' },
        { name: 'Lodging' },
        { name: 'Tourism' },
        { name: 'Cannabis' },
        { name: 'Defense' },
        { name: 'Mining' },
        { name: 'Semi-Conductors' },
        { name: 'Chemical Manufacturing' },
        { name: 'Automotive' },
        { name: 'Energy' },
        { name: 'Oil and Gas Transport' },
        { name: 'Oil and Gas Discovery' },
        { name: 'Real Estate' },
        { name: 'Utilities' },
        { name: 'Transportation' },
        { name: 'Warehousing' },
        { name: 'Retail' },
        { name: 'Banking' },
        { name: 'Commercial Banking' },
        { name: 'Mortgage Banking' },
        { name: 'Entertainment' },
        { name: 'Communication Services' },
        {gicsCode:10},
        {gicsCode:15},
        {gicsCode:20},
        {gicsCode:25},
        {gicsCode:30},
        {gicsCode:35},
        {gicsCode:40},
        {gicsCode:45},
        {gicsCode:50},
        {gicsCode:55},
        {gicsCode:60},
    ]);

    const gicSet = await Industry.insertMany([
        {gicsCode:10},
        {gicsCode:15},
        {gicsCode:20},
        {gicsCode:25},
        {gicsCode:30},
        {gicsCode:35},
        {gicsCode:40},
        {gicsCode:45},
        {gicsCode:50},
        {gicsCode:55},
        {gicsCode:60},
    ]);

    console.log('industry seeded');



await Product.deleteMany();
     const product = await Product.insertMany([
        {
            name: 'Premium User Services',
            description:
                'Premium service to allow potential employers to see your profile first, Get more hits and appropriate matches to find your career path. \
        Our Premium service allows you to match with more employers on a daily basis. Have your profile show up at the top of the list when \
        employers search for potential candidates, directly reach out to potential employees with a personal message.',
            priceUser: 5.99
        },
        {
            name: 'Premium Employer Services',
            description:
                'Premium service to allow employers to get access to all users on our platform. This gives your company the ability to have first pick at the best candidates \
                for the role. Premium services will enable you to directly reach out to the most suitable candidates you believe are the right fit for the role, allow job listings to be featured \
                on our home page, thus increasing exposure of the role, thus allowing candidates to view your job listing much easier. Sign up and quickly find your ideal candidate.',
            priceEmployer: 50.99
        },
    ]);

    console.log('products seeded');
})