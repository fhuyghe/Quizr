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

export default Questions;