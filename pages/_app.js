import App from 'next/app';
import { AppProvider } from '@shopify/polaris';
import '@shopify/polaris/styles.css';
import Cookies from 'js-cookie'
import ApolloClient from 'apollo-boost';
import { ApolloProvider } from 'react-apollo';

global.fetch = require('node-fetch');

/* import fetch from 'node-fetch';
import { createHttpLink } from 'apollo-link-http';
const link = createHttpLink({ uri: '/graphql', fetch: fetch });
*/

const client = new ApolloClient({
    fetchOptions: {
    credentials: 'include'
  }
}); 

class QuizrApp extends App {
    state = {
        shopOrigin: Cookies.get('shopOrigin')
    }

    static async getInitialProps({ query, req, ctx }) {
      const pageProps = {}
      const shop = 'savemefrom.myshopify.com'
      const res = await fetch('https://b63d3ce9.ngrok.io/api/settings/' + shop)
      const data = await res.json()

      pageProps.settings = data
      pageProps.query = {...ctx.query}

      return {
        pageProps
      }
    }

  render() {
    const { Component, pageProps } = this.props;

    //forceRedirect
    return (
        <AppProvider shopOrigin={this.state.shopOrigin} apiKey={API_KEY} >
          <ApolloProvider client={client}>
            <Component {...pageProps} />
          </ApolloProvider>
        </AppProvider>
    );
  }
}

export default QuizrApp;