const mongoose = require('mongoose');
const {
  Schema
} = mongoose;

const settingsSchema = new Schema({
  shop: {
    type: String,
    unique: true,
    required: true,
    dropDups: true
  },
  domain: {type: String},
  accessToken: {type: String}, 
  introTitle: {type: String},
  introParagraph: {type: String},
  resultsTitle: {
    type: String
  },
  resultsParagraph: {
    type: String
  },
  shareParagraph: {
    type: String
  },
  resultsTextAfter: {
    type: String
  },
  resultOptions: [{
    type: Schema.Types.ObjectId,
    ref: 'ResultOption'
  }],
  questions: [{
    type: Schema.Types.ObjectId,
    ref: 'Question'
  }],
  resultEmail: {type: String},
  resultEmailName: {type: String},
  resultEmailTitle: {type: String},
  title: {type: String},
  intro: { type: String },
  // Tradeshow settings
  introTitleTradeshow: String,
  introParagraphTradeshow: String,
  shareParagraphTradeshow: String,
  resultEmailTitleTradeshow: String,
  resultsTitleTradeshow: String,
  resultsParagraphTradeshow: String,
  resultsTextAfterTradeshow: String
});

// Collected info
const statsSchema = new Schema({
  shop: {
    type: String,
    unique: true,
    required: true,
    dropDups: true
  },
  emails: [{
    type: String
  }],
  users: [{
    email: String,
    firstName: String,
    lastName: String,
    company: String,
    phone: String,
    address1: String,
    address2: String,
    city: String,
    state: String,
    zipcode: String,
    quizAnswers: [
      {
        question: String,
        answers: [String]
      }
    ],
    date: {
      type: Date,
      default: Date.now
    }
  }]
});

//Result Options
const resultOptionSchema = Schema({
  title: { type: String },
  defaultOption: { type: Boolean },
  slug: { type: String },
  paragraph: { type: String },
  product: {
    id: {type: String},
    title: { type: String },
    handle: { type: String },
    productType: { type: String },
    descriptionHtml: { type: String },
    image: { type: String }
  }
});

// Questions
const questionSchema = Schema({
  question: String,
  text: String,
  answerNumber: {
    type: Number, 
    default: 1
  },
  ordered: Boolean,
  answers: [{
    text: String,
    positive: [{
      type: Schema.Types.ObjectId,
      ref: 'ResultOption'
    }],
    negative: [{
      type: Schema.Types.ObjectId,
      ref: 'ResultOption'
    }],
  }]
});

const Settings = mongoose.model('Settings', settingsSchema);
const Stats = mongoose.model('Stats', statsSchema);
const ResultOption = mongoose.model('ResultOption', resultOptionSchema);
const Question = mongoose.model('Question', questionSchema);

module.exports = {
  Settings,
  Stats,
  ResultOption,
  Question
}