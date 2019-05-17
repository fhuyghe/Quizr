import QuestionsEmptyState from '../components/QuestionsEmptyState'
import QuestionsList from '../components/QuestionsList'
import { connect } from 'react-redux'
import { getSettings, lowerQuestion, higherQuestion } from '../store'
import { Loading } from '@shopify/polaris';
import '../style/adminStyle.scss'

class Questions extends React.Component {

  static async getInitialProps ({query}) {
    return {query}
  }

  componentWillMount(){
    this.props.getSettings(this.props.query.shop)
  }

  render() {
    console.log('Questions page')
    const {settings} = this.props
    const emptyState = !settings 
            || settings.questions 
            && settings.questions.length < 1

    return (
      <div>
      {this.props.isLoaded
        ? emptyState
          ? <QuestionsEmptyState />
          : <QuestionsList 
              questions={settings.questions} 
              lowerQuestion={this.props.lowerQuestion}
              higherQuestion={this.props.higherQuestion}
              />
        : <Loading />
        }
      </div>
    )
    };

}

//Connect Redux
const mapStateToProps = (state) => {
  return {
    isLoaded: state.isLoaded,
    settings: state.settings,
    questions: state.settings.questions
  }
}

const mapDispatchToProps = { getSettings, lowerQuestion, higherQuestion }

const connectedQuestions = connect(mapStateToProps, mapDispatchToProps)(Questions)

export default connectedQuestions;