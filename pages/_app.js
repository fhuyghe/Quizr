import App from 'next/app';
import Head from 'next/head';
import { AppProvider } from '@shopify/polaris';
import translations from '@shopify/polaris/locales/en.json';
import '@shopify/polaris/styles.css';
import Cookies from 'js-cookie'
import { InMemoryCache } from 'apollo-cache-inmemory';
import { ApolloClient } from 'apollo-client';
import { createHttpLink } from 'apollo-link-http';
import { ApolloProvider } from 'react-apollo';
//Redux
import {Provider as ReduxProvider} from 'react-redux'
import withReduxStore from '../lib/with-redux-store'
import AppMenu from '../components/AppMenu'
//Style
import '../style/adminStyle.scss'

global.fetch = require('node-fetch');

const client = new ApolloClient({
  link: new createHttpLink({
    credentials: 'include',
    headers: {
      'Content-Type': 'application/graphql',
    }
  }),
  cache: new InMemoryCache(),
})

class QuizrApp extends App {
    state = {
        shopOrigin: Cookies.get('shopOrigin'),
        loaded: false
    }

  render() {
    const { Component, pageProps, reduxStore } = this.props;

    return (
      <React.Fragment>
        <Head>
          <title>Quizr</title>
          <meta charSet="utf-8" />
        </Head>
        <AppProvider 
          shopOrigin={this.state.shopOrigin} 
          apiKey={API_KEY} 
          i18n={translations}
          forceRedirect >
          <ApolloProvider client={client}>
            <ReduxProvider store={reduxStore}>
              <AppMenu>
                <Component {...pageProps} />
              </AppMenu>
            </ReduxProvider>
          </ApolloProvider>
        </AppProvider>
        </React.Fragment>
    );
  }
}

export default withReduxStore(QuizrApp);