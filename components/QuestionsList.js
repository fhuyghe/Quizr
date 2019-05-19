import {Router} from '../routes'
import { 
    Card,
    TextStyle,
    Layout,
    Page,
    Heading,
    TextContainer,
    Stack,
    Badge
   } from '@shopify/polaris';

class QuestionsList extends React.Component {
    
      render() {
        const questions = this.props.questions

        const renderQuestions = questions.map((question, index) => {
          const first = index == 0
          const last = index == questions.length - 1

          return <Card 
              key={question._id}
              title={question.question}
              onClick={() => Router.pushRoute('question', {slug: question._id})}
              actions={[
                { content: '▼',
                  disabled: last,  
                  onAction: () => this.props.lowerQuestion(index)},
                { content: '▲',
                  disabled: first,
                  onAction: () => this.props.higherQuestion(index)},
                { content: 'Edit',
                    onAction: () => Router.pushRoute('question', {slug: question._id})
                  }
                ]}
                >
              <p>{question.text}</p>
              <Stack wrap={false}>
                { question.answers && question.answers.map((answer, index) => {
                  return <Badge key={index}>{answer.text}</Badge>
                })}
              </Stack>
          </Card>
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
                <div className="questionList">
                  {renderQuestions}
                </div>
            </Layout.Section>
          </Layout>
          </Page>
        );
      }
    }
    
export default QuestionsList;