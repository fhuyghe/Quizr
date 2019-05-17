import {Router} from '../../routes'
import QuizContainer from '../../components/QuizContainer'
import Answer from '../../components/Answer'
import { saveAnswer } from '../../store'
import { connect } from 'react-redux'

class Question extends React.Component{

    constructor( props ) {
        super( props );

        this.clickedAnswer = this.clickedAnswer.bind( this );
    }

    static async getInitialProps ({query}) {
        return {query}
    }

    render() {
        const {settings, answers} = this.props
        const currentNumber = parseInt(this.props.query.number)
        const currentAnswer = answers[currentNumber]

        const question = settings.questions[currentNumber - 1]

        //Define if there is a following question
        const nextQuestion = currentNumber < settings.questions.length
            ? currentNumber + 1
            : 0

        //Render the answers
        const answerRender = question && question.answers.map((answer, index) => {
            return <Answer 
                        key={index} 
                        answer={answer}
                        selected={currentAnswer && currentAnswer._id == answer._id}
                        clicked={this.clickedAnswer} 
                    />
        })

        // Render the counter
        const renderCounter = settings.questions.map((item, index) => {
            const className = index == currentNumber - 1 ? 'line active' : 'line'
            return <div key={item._id} className={className} ></div>
        })

        return <QuizContainer name="question">
            <header>
                <div className="counter">
                    {renderCounter}
                </div>
                <h1>{question.question}</h1>
            </header>

            <div className='content'>
                <div className="answerWrap">
                    {answerRender}
                </div>
            </div>

            <footer>
            { currentNumber > 1
                && <a className="btn back" onClick={() => Router.pushRoute('quiz/question', {number: currentNumber - 1})}>Back</a>
            }
            { nextQuestion > 0 
                ? <a className={currentAnswer ? "btn next" : "btn next inactive" } onClick={() => currentAnswer && Router.pushRoute('quiz/question', {number: nextQuestion})}>Next</a>
                : <a className={currentAnswer ? "btn share" : "btn share inactive"} onClick={() => currentAnswer && Router.pushRoute('quiz/share')}>See Results</a>
            }
            </footer>
        </QuizContainer>
    }

    clickedAnswer(answer) {
        // Save selected answer
        const currentNumber = parseInt(this.props.query.number)
        this.props.saveAnswer(answer, currentNumber)
    }
}

//Connect Redux
const mapStateToProps = (state) => {
    return {
      settings: state.settings,
      answers: state.answers
    }
  }
  const mapDispatchToProps = { saveAnswer }

  const connectedQuestion = connect(mapStateToProps, mapDispatchToProps)(Question)
  
  export default connectedQuestion;