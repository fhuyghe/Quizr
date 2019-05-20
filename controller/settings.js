const {Settings, ResultOption, Question} = require('../model/settings')

class SettingsControllers {

    //GET the settings
    async find(ctx) {
        console.log('Getting Settings');
        const {shop} = ctx.params
        const data = await Settings
            .findOne({ shop: shop })
            .populate('resultOptions')
            .populate({
                path: 'questions',
                populate: {
                    path: 'answers.negative',
                    model: 'ResultOption'
                  }
             })
             .populate({
                path: 'questions',
                populate: {
                  path: 'answers.positive',
                  model: 'ResultOption'
                }
             })
        ctx.body = await data ? data : {shop: shop}
    }

    //POST settings
    async save(ctx) {
        try {
            const data = ctx.request.body;
            console.log(data)

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

    //Save result option
    async saveOption(ctx) {

        try {
            const data = ctx.request.body;
            const option = data.option

            if (option._id) {
                console.log('Updating option')
                console.log(option)
                const resultOption = await ResultOption.updateOne({_id: option._id}, option);
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
    async saveQuestion(ctx) {
        console.log('Saving Question')

        try {
            const data = ctx.request.body;
            const question = data.question

            if (question._id) {
                console.log('Updating question')
                ctx.body = await Question.updateOne({_id: question._id}, question);
            } else {
                console.log('New question')
                await new Question(question).save(function(err, doc){
                    if (!err){
                        Settings.findOne({ _id: data.settings._id }, function (err, settings) {
                            console.log('Found the settings');
                            settings.questions.push(doc)
                            settings.save()
                        });
                        console.log(doc)
                        ctx.body = doc;
                    }
                });
            }
        } catch (err) {
          ctx.throw(422);
        }
    }
}

module.exports = new SettingsControllers();