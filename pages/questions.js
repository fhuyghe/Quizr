import QuestionsEmptyState from '../components/QuestionsEmptyState'
import QuestionsList from '../components/QuestionsList'

class Questions extends React.Component {

  render() {
    console.log(this.props)
    const emptyState = !this.props.settings || this.props.settings.questions.length < 1

    return (
      <div>
      {emptyState
          ? <QuestionsEmptyState />
          : <QuestionsList questions={this.props.settings.questions} />
        }
      </div>
    )
    };

}

export default Questions;