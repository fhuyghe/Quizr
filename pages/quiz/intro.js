import {Link} from '../../routes'
import QuizContainer from '../../components/QuizContainer'

class Intro extends React.Component{
    render() {

        const {settings} = this.props

        return <QuizContainer name="intro">
            <h1>{ settings.introTitle }</h1>
            <p>{ settings.introParagraph }</p>
            <Link route='quiz/question' params={{number: '1'}}>
                <a className="btn">Start</a>
            </Link>
        </QuizContainer>
    }
}

export default Intro;