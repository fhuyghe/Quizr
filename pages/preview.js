
import { Layout, 
  Page,
  FormLayout,
  TextField,
  Autocomplete,
  Card,
  Button,
  PageActions,
  Subheading,
  Heading,
  Stack, 
  Tag,
  TextContainer
} from '@shopify/polaris';
import Quiz from '../components/QuizContainer'


class QuizPreview extends React.Component {

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

export default QuizPreview;