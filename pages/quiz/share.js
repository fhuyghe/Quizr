import {Router} from '../../routes'
import QuizContainer from '../../components/QuizContainer'
import { saveAnswer } from '../../store'
import { connect } from 'react-redux'

class Share extends React.Component{
    render() {
        const { settings } = this.props

        return <QuizContainer name="share">
            <h1>Share</h1>
            <p>{ settings.shareParagraph }</p>
            <a onClick={() => Router.pushRoute('quiz/shared')} className="btn">Send my Results</a>
            <a onClick={() => Router.pushRoute('quiz/results')}>Not thanks, take me to my results</a>
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