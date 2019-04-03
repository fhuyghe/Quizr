import {Page} from '@shopify/polaris';
import store from 'store-js';

import OptionsEmptyState from '../components/OptionsEmptyState'
import OptionsAdd from '../components/OptionsAdd'
import Option from '../components/Option'

class Options extends React.Component {

  static async getInitialProps({ query }) {
    const slug = query.slug;
    return {slug};
  }

  render() {
    const slug = this.props.slug
    const emptyState = !store.get('options');

    return (
      <div>
      {slug 
        ? <Option slug />
        : emptyState
          ? <OptionsEmptyState />
          : <OptionsList options={store.get('options')} />
        }
      </div>
    )
    };
}

export default Options;