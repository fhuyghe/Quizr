import {Link} from '../../routes'
import QuizContainer from '../../components/QuizContainer'

class Question extends React.Component{
    render() {
        const {query, settings} = this.props
        const currentNumber = parseInt(query.number)
        const currentQuestion = settings.questions[currentNumber - 1]

        //Define if there is a following question
        const nextQuestion = currentNumber < settings.questions.length
            ? currentNumber + 1
            : 0

        //Render the answers
        const answerRender = currentQuestion.answers.map((answer) => {
            console.log(answer)
            return <div className="answer" onClick={this.clickedAnswer(answer)}>
                { answer.text }
            </div>
        })

        return <QuizContainer name="question">
            <header>
                <h1>{currentQuestion.question}</h1>
            </header>

            <div className='content'>
            {answerRender}
            </div>

            <footer>
            { nextQuestion > 0 
                ? <Link route='/quiz/question' params={{number: 1}}>
                    <a className="btn">Next</a>
                </Link>
                : <Link route='/quiz/share'>
                    <a className="btn">See Results</a>
                </Link>
            }
            </footer>
        </QuizContainer>
    }

    clickedAnswer(answer) {
        console.log('clicked', answer)
        //Change the display

        // Save selected answer

        // Add a substract points
    }
}

export default Question;