const Coupons = require('../model/coupons')

class CouponsControllers {

    //GET the coupons
    async find(ctx) {
        try{
            console.log('Getting Coupons');
            const {shop} = ctx.params

            if (shop) {
                const data = await Coupons
                    .findOne({ shop: shop })
                
                ctx.body = await data ? data : {shop: shop}
            } else {
                ctx.body = {shop: null}
            }
        } catch (err) {
            console.log('Error', err)
        ctx.throw(422);
      }
    }

    //POST coupons
    async save(ctx) {
        try {
            let data = ctx.request.body;

            if (data._id) {
                console.log('Updating')
                const coupons = await Coupons.updateOne({_id: data._id}, data);
                ctx.body = coupons;
            } else {
                console.log('New record')
                delete data._id
                ctx.body = await new Coupons(data).save();
            }
        } catch (err) {
            console.log(err)
          ctx.throw(422);
        }
    }
    
    //DELETE coupons
    async delete(ctx) {
        try {
            const data = ctx.request.body;
            console.log('Deleting')
            ctx.body = await Coupons.deleteOne({_id: data._id})
        } catch (err) {
          ctx.throw(422);
        }
      }

    
}

module.exports = new CouponsControllers();