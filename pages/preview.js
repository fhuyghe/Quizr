
import { Layout, 
  Page,
  Card,
} from '@shopify/polaris';
import Quiz from '../components/QuizContainer'


class QuizPreview extends React.Component {

  static async getInitialProps ({query}) {
    return {query}
  }

  componentWillMount(){
    this.props.getSettings(this.props.query.shop)
  }

  render() {

    return (
      <Page
    title='Preview'
    >
      <Layout>
        <Card>
          <Quiz { ...this.props }/>
        </Card>
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