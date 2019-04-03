import App from 'next/app';
import Head from 'next/head';
import { AppProvider } from '@shopify/polaris';
import '@shopify/polaris/styles.css';
import Cookies from 'js-cookie'
import ApolloClient from 'apollo-boost';
import { ApolloProvider } from 'react-apollo';

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