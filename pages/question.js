import { Layout, 
  Page,
  FormLayout,
  TextField,
  Card,
  ButtonGroup,
  Button,
  PageActions,
  Subheading,
  Heading,
  Spinner,
  Checkbox,
  Select
} from '@shopify/polaris';
import {Router} from '../routes'
import AnswerForm from '../components/AnswerForm.js'
import { connect } from 'react-redux'
import { getSettings, saveQuestion, deleteQuestion } from '../store'

class Question extends React.Component {

  state = {
    newQuestion: true,
    question: '',
    text: '',
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
      text,
      ordered,
      answerNumber,
      answers,
      newQuestion
    } = this.state

    const { isDeleting } = this.props
    
    const answerNumberOptions = [
      {label: '1', value: 1},
      {label: '2', value: 2},
      {label: '3', value: 3},
      {label: '5', value: 5},
      {label: 'No maximum', value: -1},
    ];

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
                <TextField 
                  label="Text" 
                  value={text} 
                  multiline
                  onChange={this.handleChange('text')} />
                <Select
                  label="Maximum answers"
                  options={answerNumberOptions}
                  value={answerNumber}
                onChange={this.handleChange('answerNumber')} />
              {answerNumber != 1 &&
                <Checkbox
                  checked={ordered}
                  label="Order the user's answers"
                  onChange={this.handleChange('ordered')} />
              }
              </FormLayout>
            </Card>
          </Layout.Section>

          <Layout.AnnotatedSection
            title="Answers"
            description="Shopify and your customers will use this information to contact you."
          >
                  {answers.map((answer, index) => {
                      return <AnswerForm 
                          {...answer}
                          length={answers.length}
                          options={options} 
                          index={index} 
                          key={'answer-' + index} 
                          handleAnswerChange={this.handleAnswerChange}
                          deleteAnswer={this.deleteAnswer}
                          lowerAnswer={this.lowerAnswer}
                          higherAnswer={this.higherAnswer}
                          removeTag={this.removeTag}
                        />
                      }) }
            <ButtonGroup>
            <Button primary onClick={this.addAnswer} >
                    Add an answer
                  </Button>
          </ButtonGroup>
          </Layout.AnnotatedSection>

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
                    content: isDeleting ? <Spinner size="small" color="teal" /> : "Delete",
                    onAction: () => this.deleteQuestion(),
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

  //Answers Things
  deleteAnswer = (index) => {
    var newAnswers = this.state.answers
    newAnswers.splice(index, 1)

    this.setState({
      answers: newAnswers
    })
  }

  lowerAnswer = (index) => {
    var newAnswers = [...this.state.answers]
    newAnswers[index] = this.state.answers[index + 1]
    newAnswers[index + 1] = this.state.answers[index]

    this.setState({
      answers: newAnswers
    })
  }

  higherAnswer = (index) => {
    var newAnswers = [...this.state.answers]
    newAnswers[index] = this.state.answers[index - 1]
    newAnswers[index - 1] = this.state.answers[index]

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

  deleteQuestion = () => { 
    this.props.deleteQuestion(this.state)
    setTimeout(() => { 
      Router.pushRoute('questions')
    }, 1000)
  }
 
}

//Connect Redux
const mapStateToProps = (state) => {
  return {
    isLoaded: state.isLoaded,
    settings: state.settings,
    isDeleting: state.isDeleting
  }
}

const mapDispatchToProps = { getSettings, saveQuestion, deleteQuestion }

const connectedQuestion = connect(mapStateToProps, mapDispatchToProps)(Question)

export default connectedQuestion;