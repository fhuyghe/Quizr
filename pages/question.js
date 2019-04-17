
import { Layout, 
  Page,
  FormLayout,
  TextField,
  Autocomplete,
  Card,
  Button,
  PageActions,
  Subheading,
  Heading,
  Stack, 
  Tag,
  TextContainer
} from '@shopify/polaris';
import {Router} from '../routes'
import Answer from '../components/answerForm'

class Question extends React.Component {

  state = {
    newQuestion: true,
    question: '',
    answers: []
  }

  componentDidMount(){
    const newQuestion = this.props.query.slug == 'new' ? true : false

    if (!newQuestion){
      this.getQuestionInfo()
    }

    this.setState({
      newQuestion: newQuestion
    })
  }

  render() {

    const {
      question,
      answers,
      newQuestion
    } = this.state

    const options = this.props.settings.resultOptions.map((option) => {
      return {value: option.slug , label: option.title}
    })

    return <Page
    breadcrumbs={[{content: 'Questions', url: '/questions'}]}
    title='Question'
    pagination={{
      hasPrevious: true,
      hasNext: true,
      previousURL: '',
      nextURL: ''
    }}
    >
      <Layout>
          <Layout.Section>
            <Heading>{newQuestion ? 'New Question' : 'Edit'}</Heading>
          </Layout.Section>

          <Layout.Section>
            <Card sectioned>
              <Subheading>Question</Subheading>
              <FormLayout>
                  <TextField 
                      label="Question" 
                      value={question} 
                      onChange={this.handleChange('question')} />
              </FormLayout>
            </Card>
          </Layout.Section>

          <Layout.Section>
            <Card sectioned>
              <Subheading>Answers</Subheading>
                  {answers.map((answer, index) => {
                    console.log(answer)
                      return <Answer 
                          {...answer} 
                          options={options} 
                          index={index} 
                          key={'answer-' + index} 
                          handleAnswerChange={this.handleAnswerChange}
                        />}) }
                  <Button onClick={this.addAnswer} >
                    Add an answer
                  </Button>
            </Card>
          </Layout.Section>

            <Layout.Section>
              <PageActions
                primaryAction={{
                  content: this.state._id ? 'Update' : 'Save',
                  onAction: () => this.saveQuestion(this.state),
                }}
                secondaryActions={[
                  {
                    content: 'Cancel',
                    onAction: () => Router.pushRoute('questions')
                  },
                  {
                    content: 'Delete',
                    onAction: () => this.props.deleteQuestion(this.state),
                    disabled: newQuestion
                  },
                ]}
              />
              </Layout.Section>
      </Layout>
    </Page>
  }

  handleAnswerChange = (label, value, index) => {
    var newAnswers = this.state.answers
    newAnswers[index][label] = value

    this.setState({
      answers: newAnswers
    })
  };

  addAnswer = () => {
    var newAnswers = this.state.answers
    newAnswers.push({
      text: '',
      positive: [],
      negative: []
    })

    this.setState({
      answers: newAnswers
    })
  }

  handleChange = (field) => {
    return (value) => this.setState({[field]: value});
  };

  getQuestionInfo(){
    const {settings, query} = this.props
    const question = settings.questions
     ? settings.questions.find((el) => {
        return el._id == query.slug
      })
      : {}

    if (question) this.setState({...question})
  }

  saveQuestion = (question) => {
    const dataToSave =  {question: question}
    dataToSave.settings = this.props.settings

    fetch('/api/settings/addquestion', {
        method: 'POST',
        body: JSON.stringify(dataToSave),
        headers: {
            'Content-Type': 'application/json'
        }
    });
}

  
}

function slugify(text)
{
  return text.toString().toLowerCase()
    .replace(/\s+/g, '-')           // Replace spaces with -
    .replace(/[^\w\-]+/g, '')       // Remove all non-word chars
    .replace(/\-\-+/g, '-')         // Replace multiple - with single -
    .replace(/^-+/, '')             // Trim - from start of text
    .replace(/-+$/, '');            // Trim - from end of text
}

export default Question;