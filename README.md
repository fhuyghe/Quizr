# Quizr
**A simple quiz app for Shopify websites**

## Functionalities
Quizr lets you create a quiz for your store. Create questions, answer options (multiple choice or slider) and create a set of rules to show a customized enswer featuring your products. Optional functionalities include creating a custom promo code and capturing the quiz takers email.

## Tools used
This app was build using the following tools:
- React, Next,js and Redux
- Mongoose, Apollo, Koa
- Shopify Polaris

## How to use
This app has been created as a private app, to be installed manually on your Shopify store.

After you've enabled custom app development, you can create and install a custom app in your Shopify admin.
You can then create an API key with the following scopes:
'read_products', 'read_themes', 'write_themes', 'write_content', 'read_price_rules', 'write_price_rules'

Add the following environment variables:
- **SHOPIFY_API_SECRET_KEY** 
- **SHOPIFY_API_KEY**
- **API_VERSION**
- **APP_URL** The domain you are using
