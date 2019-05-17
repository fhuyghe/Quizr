import {Router} from '../routes'
import { 
    Card,
    TextStyle,
    Layout,
    Page,
    Heading,
    TextContainer,
    ButtonGroup,
    Button
   } from '@shopify/polaris';

class QuestionsList extends React.Component {
    
      render() {
        const questions = this.props.questions

        const renderQuestions = questions.map((question, index) => {
          const first = index == 0
          const last = index == questions.length - 1

          return <div 
              key={question._id}
              className="question clearfix">
              <div className="text">
            <h3><TextStyle variation="strong">{question.question}</TextStyle></h3>
            <div>{question.paragraph}</div>
            </div>
            <div className="actions">
            <ButtonGroup>
              <Button disabled={last} onClick={() => this.props.lowerQuestion(index)}>▼</Button>
              <Button disabled={first} onClick={() => this.props.higherQuestion(index)}>▲</Button>
              <Button primary onClick={() => Router.pushRoute('question', {slug: question._id})}>Edit</Button>
            </ButtonGroup>
            </div>
          </div>
        })

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
                <div className="questionList">
                  {renderQuestions}
                </div>
              </Card>
            </Layout.Section>
          </Layout>
          </Page>
        );
      }
    }
    
export default QuestionsList;