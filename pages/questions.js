import QuestionsEmptyState from '../components/QuestionsEmptyState'
import QuestionsList from '../components/QuestionsList'
import { connect } from 'react-redux'
import { getSettings, saveSettings } from '../store'
import { Loading } from '@shopify/polaris';

class Questions extends React.Component {

  static async getInitialProps ({query}) {
    return {query}
  }

  componentWillMount(){
    this.props.getSettings(this.props.query.shop)
  }

  render() {
    const emptyState = !this.props.settings 
            || this.props.settings.questions 
            && this.props.settings.questions.length < 1

    return (
      <div>
      {this.props.isLoaded
        ? emptyState
          ? <QuestionsEmptyState />
          : <QuestionsList questions={this.props.settings.questions} />
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
    settings: state.settings
  }
}

const mapDispatchToProps = { getSettings, saveSettings }

const connectedQuestions = connect(mapStateToProps, mapDispatchToProps)(Questions)

export default connectedQuestions;