import {Router} from '../../routes'
import QuizContainer from '../../components/QuizContainer'
import { saveAnswer } from '../../store'
import { connect } from 'react-redux'

class Share extends React.Component{
    render() {
        const { settings } = this.props

        return <QuizContainer name="share">
            <header>
                <h1>Share</h1>
            </header>

            <div className="content">
                <p>{ settings.shareParagraph }</p>
            </div>

            <footer>
                <a onClick={() => Router.pushRoute('quiz/shared')} className="btn">Send my Results</a>
                <a className="shareSkip" onClick={() => Router.pushRoute('quiz/results')}>Not thanks, take me to my results</a>
            </footer>
        </QuizContainer>
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

  const connectedShare = connect(mapStateToProps, mapDispatchToProps)(Share)
  
  export default connectedShare;