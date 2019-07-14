const routes = require('next-routes')

                                                    // Name   Page      Pattern
module.exports = routes()                           // ----   ----      -----
    .add('index')                                       
    .add('questions', '/questions')   
    .add('question', '/questions/:slug')   
    .add('options', '/options')
    .add('option', '/options/:slug')
    .add('preview', '/preview')
    .add('coupons', '/coupons')
    .add('tradeshow', '/tradeshow')