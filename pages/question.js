import { Layout, 
  Page,
  FormLayout,
  TextField,
  Card,
  Button,
  PageActions,
  Subheading,
  Heading,
} from '@shopify/polaris';
import {Router} from '../routes'
import Answer from '../components/answerForm'
import { connect } from 'react-redux'
import { getSettings, saveQuestion } from '../store'

class Question extends React.Component {

  state = {
    newQuestion: true,
    question: '',
    answers: []
  }

  static async getInitialProps ({query}) {
    return {query}
  }

  componentWillMount(){
    this.props.getSettings(this.props.query.shop)
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

    const options = this.props.settings.resultOptions && this.props.settings.resultOptions.map((option) => {
      return {value: option._id, _id: option._id , label: option.title}
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
                      return <Answer 
                          {...answer} 
                          options={options} 
                          index={index} 
                          key={'answer-' + index} 
                          handleAnswerChange={this.handleAnswerChange}
                          removeTag={this.removeTag}
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
                  onAction: () => this.saveQuestion(),
                }}
                secondaryActions={[
                  {
                    content: 'Back',
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

  removeTag = (index, type, option) => {
    var newAnswers = this.state.answers
    newAnswers[index][type].splice(option, 1);

    this.setState({
      answers: newAnswers
    })
  }

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

  saveQuestion = () => {
    const dataToSave =  {
      question: this.state,
      settings: this.props.settings
    }

    this.props.saveQuestion(dataToSave);
  }
 
}

//Connect Redux
const mapStateToProps = (state) => {
  return {
    isLoaded: state.isLoaded,
    settings: state.settings
  }
}

const mapDispatchToProps = { getSettings, saveQuestion }

const connectedQuestion = connect(mapStateToProps, mapDispatchToProps)(Question)

export default connectedQuestion;