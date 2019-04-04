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

  render() {
    const { Component, pageProps } = this.props;

    return (
        <AppProvider shopOrigin={this.state.shopOrigin} apiKey={API_KEY} forceRedirect>
          <ApolloProvider client={client}>
            <Component {...pageProps} />
          </ApolloProvider>
        </AppProvider>
    );
  }
}

export default QuizrApp;