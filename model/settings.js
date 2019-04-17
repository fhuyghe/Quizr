const mongoose = require('mongoose');
const {Schema} = mongoose;

const settingsSchema = new Schema({
    shop: { type: String, unique : true, required : true, dropDups: true},
    introTitle: { type: String },
    introParagraph: { type: String },
    resultsTitle: { type: String },
    resultsParagraph: { type: String },
    resultsTextAfter: { type: String },
    resultOptions:[{ type: Schema.Types.ObjectId, ref: 'ResultOption' }],
    questions:[{ type: Schema.Types.ObjectId, ref: 'Question' }]
});

//Result Options
const resultOptionSchema = Schema({
    title: String,
    slug: String,
    paragraph: String,
    product: String
  });

// Questions
const questionSchema = Schema({ 
    question: String,
    answers: [{
        text: String,
        positive: [{ type: Schema.Types.ObjectId, ref: 'ResultOption' }],
        negative: [{ type: Schema.Types.ObjectId, ref: 'ResultOption' }],
    }]
  });

  const Settings = mongoose.model('Settings', settingsSchema);
  const ResultOption = mongoose.model('ResultOption', resultOptionSchema);
  const Question = mongoose.model('Question', questionSchema);

module.exports = { Settings, ResultOption, Question }