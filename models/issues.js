const mongoose = require('mongoose')
const Schema = mongoose.Schema;

const IssueSchema = new Schema({
    id: Number,
    title: String,
    status: String,
    effort: Number,
    author: String,
    created: {type: Date, default: new Date()},
    due: {type: Date, default: new Date(new Date().getTime() + 1000*60*60*24*10)}    

});

const Issue = mongoose.model('Issue', IssueSchema, "issues");
module.exports = Issue;