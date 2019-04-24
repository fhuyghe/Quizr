import {Link} from '../../routes'
import QuizContainer from '../../components/QuizContainer'

class Share extends React.Component{
    render() {

        return <QuizContainer name="share">
            <h1>Share</h1>
            <Link route='/quiz/results'>
                <a className="btn">My Results</a>
            </Link>
        </QuizContainer>
    }
}

export default Share;