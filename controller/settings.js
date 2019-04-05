const Settings = require('../model/settings')

class SettingsControllers {

    //GET the settings
    async find(ctx) {
        const {shop} = ctx.params
        const data = await Settings.findOne({ shop: shop })
        ctx.body = await data ? data : {shop: shop}
    }

    //POST settings
    async add(ctx) {
        try {
            const data = ctx.request.body;
            console.log('data in add', data)

            if (data._id) {
                console.log('Updating')
                const settings = await Settings.update({_id: data._id}, data);
                ctx.body = settings;
                console.log(settings)
            } else {
                console.log('New record')
                const settings = await new Settings(data).save();
                console.log(settings)
                ctx.body = settings;
            }
        } catch (err) {
          ctx.throw(422);
        }
      }
}

module.exports = new SettingsControllers();