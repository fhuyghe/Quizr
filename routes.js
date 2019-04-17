const routes = require('next-routes')

                                                    // Name   Page      Pattern
module.exports = routes()                           // ----   ----      -----
.add('index')                                       // about  about     /about
.add('questions', '/questions/:slug')   
.add('options', '/options')
.add('option', '/options/:slug')