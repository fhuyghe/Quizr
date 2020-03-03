
import { Layout, 
  Page,
  Card,
} from '@shopify/polaris';
import { connect } from 'react-redux'
import { getSettings } from '../store'


class QuizPreview extends React.Component {

  static async getInitialProps ({query}) {
    return {query}
  }

  componentDidMount(){
    this.props.getSettings(this.props.query.shop)
  }

  render() {

    return (
      <Page title='Preview' >
      <Layout>
      <div className="quizrWrap">
        <iframe src={"https://quizr.13milliseconds.com/" + this.props.settings.shop.replace('.myshopify.com', '')} frameborder="0" onload="resizeIframe(this)"></iframe>
      </div>
      </Layout>
    </Page>
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

const mapDispatchToProps = { getSettings }

const connectedPreview = connect(mapStateToProps, mapDispatchToProps)(QuizPreview)

export default connectedPreview;