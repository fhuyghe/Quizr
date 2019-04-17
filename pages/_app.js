import App from 'next/app';
import Head from 'next/head';
import { AppProvider,
          Loading } from '@shopify/polaris';
import '@shopify/polaris/styles.css';
import Cookies from 'js-cookie'
import { InMemoryCache } from 'apollo-cache-inmemory';
import { ApolloClient } from 'apollo-client';
import { createHttpLink } from 'apollo-link-http';
import { ApolloProvider } from 'react-apollo';

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

    static async getInitialProps ({Component, ctx}) {
      var pageProps = {}
      pageProps.query = ctx.query

      return {pageProps}
    }

    async componentDidMount(){
      const shop = this.state.shopOrigin
      const res = await fetch('https://quizr.herokuapp.com/api/settings/' + shop)
      const data = await res.json()
      this.setState({
        settings: data,
        loaded: true
      })
    }

  render() {
    const { Component, pageProps } = this.props;

    return (
      <React.Fragment>
        <Head>
          <title>Quizr</title>
          <meta charSet="utf-8" />
        </Head>
        <AppProvider 
          shopOrigin={this.state.shopOrigin} 
          apiKey={API_KEY} 
          forceRedirect >
          <ApolloProvider client={client}>
            { this.state.loaded 
            ? <Component {...pageProps} settings={this.state.settings} />
            : <Loading /> 
            }
          </ApolloProvider>
        </AppProvider>
        </React.Fragment>
    );
  }
}

export default QuizrApp;