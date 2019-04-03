import {Page,  EmptyState, ResourceList, ResourcePicker } from '@shopify/polaris';
import store from 'store-js';

import ResourceListWithProducts from '../components/ResourceList';

class Questions extends React.Component {
  state = {
    open: false
  };

  render() {
    const emptyState = !store.get('questions');

    return (
      <Page title="Result Options" >
      {emptyState ? 
        <EmptyState
          heading="Add questions to your quiz"
          action={{content: 'Add question'}}
          image="https://cdn.shopify.com/s/files/1/0757/9955/files/empty-state.svg"
        >
          <p>Add as many as 10 questions to your quiz.</p>
        </EmptyState>
        :
        <ResourceList>
          Questions
        </ResourceList>
        }


    <ResourcePicker
        resourceType="Product"
        showVariants={false}
        open={this.state.open}
        onSelection={(resources) => this.handleSelection(resources)}
        onCancel={() => this.setState({ open: false })}
    />
    <ResourceListWithProducts />
      </Page>
    )
    };
}

export default Questions;