const SettingsControllers = require('../controller/settings');
const ProcessPayment = require('../controller/processPayment');

module.exports = function(router){

    router.get('/', ProcessPayment)

    //router.prefix(`/api/${api}`);

    router.get('/api/settings/:shop', SettingsControllers.find);
    router.post('/api/settings', SettingsControllers.add);

    //Result Options
    router.put('/api/settings/addoption', SettingsControllers.addOption);

    //Questions
    router.put('/api/settings/addquestion', SettingsControllers.addQuestion);

    return router

}