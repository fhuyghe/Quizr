import {
  EmptyState,
  Page
} from '@shopify/polaris';
import {Router} from '../routes'

class OptionsEmptyState extends React.Component {

  render() {

    return (
        <Page title="Options" >
          <EmptyState
            heading="Add result options"
            action={{
              content: 'Add option',
              onAction: () => Router.pushRoute('options', {slug: 'new'})
            }}
            image="https://cdn.shopify.com/s/files/1/0757/9955/files/empty-state.svg"
          >
          </EmptyState>
        </Page>
    )
    };
}

export default OptionsEmptyState;