const SettingsControllers = require('../controller/settings');
const ProcessPayment = require('../controller/processPayment');

module.exports = function(router){

    router.get('/', ProcessPayment)

    //router.prefix(`/api/${api}`);

    router.get('/api/settings/:shop', SettingsControllers.find);
    router.put('/api/settings', SettingsControllers.save);

    //Result Options
    router.put('/api/settings/saveoption', SettingsControllers.saveOption);

    //Questions
    router.put('/api/settings/savequestion', SettingsControllers.saveQuestion);
    router.put('/api/settings/deletequestion', SettingsControllers.deleteQuestion);

    return router

}