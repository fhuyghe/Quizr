import {
  EmptyState,
  Page
} from '@shopify/polaris';
import {Router} from '../routes'

class QuestionsEmptyState extends React.Component {

  render() {

    return (
        <Page title="questions" >
          <EmptyState
            heading="Add questions to your quiz"
            action={{
              content: 'Add question',
              onAction: () => Router.pushRoute('question', {slug: 'new'})
            }}
            image="https://cdn.shopify.com/s/files/1/0757/9955/files/empty-state.svg"
          >
            <p>Add as many as 10 questions to your quiz.</p>
          </EmptyState>
        </Page>
    )
    };
}

export default QuestionsEmptyState;