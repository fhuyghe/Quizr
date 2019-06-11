const SettingsControllers = require('../controller/settings');
const CouponsControllers = require('../controller/coupons');
const ShopifyControllers = require('../controller/shopify');
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

    //Coupons
    router.get('/api/coupons/:shop', CouponsControllers.find);
    router.put('/api/coupons', CouponsControllers.save);
    router.put('/api/coupons/delete', CouponsControllers.delete);

    //Shopify
    router.get('/api/shopify/', ShopifyControllers.get)
    router.post('/api/shopify/', ShopifyControllers.post)

    return router

}