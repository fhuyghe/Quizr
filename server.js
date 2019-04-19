const Koa = require('koa');
const Router = require('koa-router');
var bodyParser = require('koa-bodyparser');
const next = require('next');
const routes = require('./routes')
const mongoose = require('mongoose');
const { default: createShopifyAuth } = require('@shopify/koa-shopify-auth');
const dotenv = require('dotenv');
const { verifyRequest } = require('@shopify/koa-shopify-auth');
const session = require('koa-session');
require('isomorphic-fetch');
dotenv.config();
const { default: graphQLProxy } = require('@shopify/koa-shopify-graphql-proxy');

const port = parseInt(process.env.PORT, 10) || 3000;
const dev = process.env.NODE_ENV !== 'production';
const app = next({ dev });
const handle = routes.getRequestHandler(app)

//Mongoose
mongoose.connect(process.env.MONGODB_URI);
    var db = mongoose.connection;
    db.on('error', console.error.bind(console, 'connection error:'));
    db.once('open', function(){
});
mongoose.set('useCreateIndex', true);

const { SHOPIFY_API_SECRET_KEY, SHOPIFY_API_KEY, TUNNEL_URL } = process.env;

app.prepare().then(() => {
    const server = new Koa();
    const router = new Router();
    server.use(bodyParser());
    server.use(session(server));
    server.keys = [SHOPIFY_API_SECRET_KEY];

    server.use(
        createShopifyAuth({
        apiKey: SHOPIFY_API_KEY,
        secret: SHOPIFY_API_SECRET_KEY,
        scopes: ['read_products'],

        async afterAuth(ctx) {
            const { shop, accessToken } = ctx.session;
            ctx.cookies.set('shopOrigin', shop, { httpOnly: false })

            const stringifiedBillingParams = JSON.stringify({
                recurring_application_charge: {
                name: 'Simple Quiz',
                price: 9.00,
                trial_days: 30,
                return_url: TUNNEL_URL,
                test: true
                }
            })

            const options = {
                method: 'POST',
                body: stringifiedBillingParams,
                credentials: 'include',
                headers: {
                    'X-Shopify-Access-Token': accessToken,
                    'Content-Type': 'application/json',
                },
                };

            const confirmationURL = await fetch(
                `https://${shop}/admin/recurring_application_charges.json`, options)
                .then((response) => response.json())
                .then((jsonData) => jsonData.recurring_application_charge.confirmation_url)
                .catch((error) => console.log('error', error));
                ctx.redirect(confirmationURL);
        },
            }),
    );
        
    server.use(graphQLProxy());
    require('./routes/api')(router);
    server.use(router.routes());
    server.use(verifyRequest());


    server.use(async (ctx) => {
      await handle(ctx.req, ctx.res);
      ctx.respond = false;
      ctx.res.statusCode = 200;
      return
    });

    server.listen(port, () => {
        console.log(`> Ready on port ${port}`);
    });
});