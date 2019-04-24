import {Router} from '../routes'
import { ResourceList,
    Card,
    TextStyle,
    Avatar,
    Layout,
    Page,
    Heading,
    TextContainer,
   } from '@shopify/polaris';

class QuestionsList extends React.Component {

  renderItem = (item) => {
    const {question, paragraph} = item;

    return (
        <ResourceList.Item
          accessibilityLabel={`View details for ${question}`}
          onClick={() => Router.pushRoute('question', {slug: item._id})}
        >
        <h3>
            <TextStyle variation="strong">{question}</TextStyle>
        </h3>
        <div>{paragraph}</div>
        </ResourceList.Item>
    );
    }
    
      render() {
        const questions = this.props.questions

        return (
          <Page
            title="questions"
            primaryAction={{
              content: 'Add question',
              onAction: () => Router.pushRoute('question', {slug: 'new'})
            }}
          >
          <Layout>
            <Layout.Section>
              <TextContainer>
                <Heading>Questions</Heading>
                <p>Choose what questions the users will be asked.</p>
              </TextContainer>
            </Layout.Section>

            <Layout.Section>
              <Card>
                <ResourceList
                      resourceName={{singular: 'question', plural: 'questions'}}
                      items={questions}
                      renderItem={this.renderItem}
                  />
              </Card>
            </Layout.Section>
          </Layout>
          </Page>
        );
      }
    }
    
export default QuestionsList;