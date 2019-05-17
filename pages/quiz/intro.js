import {Router} from '../../routes'
import QuizContainer from '../../components/QuizContainer'
import { connect } from 'react-redux'
import { getSettings, saveSettings } from '../../store'
import { Loading } from '@shopify/polaris';

class Intro extends React.Component{

    static async getInitialProps ({query}) {
        return {query}
      }
    
      componentWillMount(){
        this.props.getSettings(this.props.query.shop)
      }

    render() {

        const settings = this.props.settings ? this.props.settings : {}

        return this.props.isLoaded ? 
        <QuizContainer name="intro">
            <h1>{ settings.introTitle }</h1>
            <p>{ settings.introParagraph }</p>
            <a className="btn" onClick={() => Router.pushRoute('quiz/question', {number: '1'})}>Start</a>
        </QuizContainer>
        : <Loading />
    }
}

//Connect Redux
const mapStateToProps = (state) => {
  return {
    isLoaded: state.isLoaded,
    settings: state.settings
  }
}

const mapDispatchToProps = { getSettings }

const connectedIntro = connect(mapStateToProps, mapDispatchToProps)(Intro)

export default connectedIntro;