const SettingsControllers = require('../controller/settings');
const ProcessPayment = require('../controller/processPayment');

module.exports = function(router){

    const api = 'settings';

    router.get('/', ProcessPayment)

    //router.prefix(`/api/${api}`);

    router.get('/api/settings/:shop', SettingsControllers.find);
    router.post('/api/settings', SettingsControllers.add);

    //Result Options
    router.post('/api/settings/addoption', SettingsControllers.addOption);

    //Questions
    router.post('/api/settings/addquestion', SettingsControllers.addQuestion);

    return router

}