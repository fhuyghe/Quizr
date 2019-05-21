var router = require('koa-router')();
const SettingsControllers = require('../controller/settings');
const ProcessPayment = require('../controller/processPayment');

router.get('/test', function (ctx, next) {
    ctx.body = { ok: true }
    next();
  })

router.get('/', ProcessPayment)

//router.prefix(`/api/${api}`);

router.get('/api/settings/:shop', SettingsControllers.find);
router.put('/api/settings', SettingsControllers.save);

//Result Options
router.put('/api/settings/saveoption', SettingsControllers.saveOption);

//Questions
router.put('/api/settings/savequestion', SettingsControllers.saveQuestion);

// If no endpoint matches request return 501and some json
router.use(function (ctx, next) {
    ctx.statusCode = 501
    ctx.body = { message: 'Not implemented' } 
    next();
  })


module.exports = {
    router
  };