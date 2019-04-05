const mongoose = require('mongoose');
const {Schema} = mongoose;

const settingsSchema = new Schema({
    shop: { type: String, unique : true, required : true, dropDups: true},
    introTitle: { type: String },
    introParagraph: { type: String },
    resultsTitle: { type: String },
    resultsParagraph: { type: String },
    resultsTextAfter: { type: String }
});

module.exports =  mongoose.model('Settings', settingsSchema);