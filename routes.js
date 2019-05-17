const routes = require('next-routes')

                                                    // Name   Page      Pattern
module.exports = routes()                           // ----   ----      -----
.add('index')                                       
.add('questions', '/questions')   
.add('question', '/questions/:slug')   
.add('options', '/options')
.add('option', '/options/:slug')
.add('preview', '/preview/:slide')
.add('quiz/question', '/quiz/question/:number')
.add('quiz/share', '/quiz/share')
.add('quiz/shared', '/quiz/shared')
.add('quiz/results', '/quiz/results')