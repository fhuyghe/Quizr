class ShopifyControllers {

    async get(ctx) {
      try {
          const data = ctx.request.body;
          const results = await fetch("https://" + ctx.cookies.get('shopOrigin') + "/admin/api/2019-04/" + data.route, {
            headers: {
              "X-Shopify-Access-Token": ctx.cookies.get('accessToken'),
            },
          })
          .then(response => response.json())
          .then(json => {
            return json;
          });
          ctx.body = {
            status: 'success',
            data: results
          };
        } catch (err) {
          console.log(err)
        }
      }

async post(ctx) {
  try {
    const data = ctx.request.body;
    console.log('Shopify API route', data.route)
    
      const results = await fetch("https://" + ctx.cookies.get('shopOrigin') + "/admin/api/2019-04/" + data.route, {
        method: data.method || 'POST',
        body: JSON.stringify(data.body),
        headers: {
          'Content-Type': 'application/json',
          "X-Shopify-Access-Token": data.accessToken
        },
      })
        .then(response => data.method == "DELETE" ? {} : response.json())
      .then(json => {
        return json;
      });
    
      ctx.body = {
        status: 'success',
        data: results
      }
    
  } catch (err) {
      console.log('Error:', err)
      ctx.body = {err}
    }
  }

}

module.exports = new ShopifyControllers();