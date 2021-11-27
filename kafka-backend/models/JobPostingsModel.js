const mongoose = require('mongoose');
const AddressSchema = require('./AddressModel');
const schema = mongoose.Schema;

let jobPostingsSchema = new mongoose.Schema({
    job_company_id: {type: String, required: true},
    job_title: {type: String, required: true},
    job_company_name: {type: String, required:true},
    job_industry: {type: String, required: false},
    //job_location: [{type: Array, required: true}],
    job_location: [{type: AddressSchema, required: true}],
    job_work_type: {type: String, required: true},
    job_salary_details: {type: String, required: false},
    job_compensation: {type: Number, required: true},
    job_what_you_do: {type: String, required: true},
    job_what_you_love: {type: String, required: false},
    job_what_you_need: {type: String, required: true},
    job_created_at: {type: Date, required: true},
});

const jobPostingsModel = mongoose.model('jobpostings', jobPostingsSchema);
module.exports = jobPostingsModel;
