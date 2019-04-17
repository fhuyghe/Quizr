const {Settings, ResultOption, Question} = require('../model/settings')

class SettingsControllers {

    //GET the settings
    async find(ctx) {
        const {shop} = ctx.params
        const data = await Settings
            .findOne({ shop: shop })
            .populate('resultOptions')
            .populate('questions')
        ctx.body = await data ? data : {shop: shop}
    }

    //POST settings
    async add(ctx) {
        try {
            const data = ctx.request.body;

            if (data._id) {
                console.log('Updating')
                const settings = await Settings.updateOne({_id: data._id}, data);
                ctx.body = settings;
            } else {
                console.log('New record')
                const settings = await new Settings(data).save();
                ctx.body = settings;
            }
        } catch (err) {
          ctx.throw(422);
        }
      }

    //Add result option
    async addOption(ctx) {

        try {
            const data = ctx.request.body;
            const option = data.option

            if (option._id) {
                console.log('Updating option')
                const resultOption = await ResultOption.update({_id: option._id}, option);
                ctx.body = resultOption;
            } else {
                console.log('New option')
                const resultOption = await new ResultOption(option).save(function(err, doc){
                    console.log(doc, data.settings)
                    if (!err){
                        Settings.findOne({ _id: data.settings._id }, function (err, settings) {
                            console.log('Found the settings');
                            settings.resultOptions.push(doc)
                            settings.save()
                        });
                    }
                });
                ctx.body = resultOption;
            }
        } catch (err) {
          ctx.throw(422);
        }
    }

    //Add result option
    async addQuestion(ctx) {

        try {
            const data = ctx.request.body;
            const question = data.question

            if (question._id) {
                console.log('Updating question')
                const newQuestion = await Question.update({_id: option._id}, option);
                ctx.body = newQuestion;
            } else {
                console.log('New question')
                const newQuestion = await new Question(question).save(function(err, doc){
                    console.log(doc, data.settings)
                    if (!err){
                        Settings.findOne({ _id: data.settings._id }, function (err, settings) {
                            console.log('Found the settings');
                            settings.questions.push(doc)
                            settings.save()
                        });
                    }
                });
                ctx.body = newQuestion;
            }
        } catch (err) {
          ctx.throw(422);
        }
    }
}

module.exports = new SettingsControllers();