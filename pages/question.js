
import { Layout, 
  Page,
  FormLayout,
  TextField,
  Button,
  Card,
  PageActions,
  Subheading,
  Heading
} from '@shopify/polaris';
import {Router} from '../routes'

class Question extends React.Component {

  state = {
    newQuestion: true,
    title: '',
    paragraph: '',
  }

  componentDidMount(){
    const newQuestion = this.props.query.slug == 'new' ? true : false

    if (!newQuestion){
      this.getQuestionInfo()
    }

    this.setState({
      newQuestion: newQuestion
    })
  }

  render() {

    const {
      title,
      paragraph,
      newQuestion
    } = this.state

    return <Page
    breadcrumbs={[{content: 'Questions', url: '/questions'}]}
    title='Question'
    pagination={{
      hasPrevious: true,
      hasNext: true,
      previousURL: '',
      nextURL: ''
    }}
    >
      <Layout>
          <Layout.Section>
            <Heading>{newQuestion ? 'New Question' : 'Edit'}</Heading>
          </Layout.Section>

          <Layout.Section>
            <Card sectioned>
              <Subheading>Text</Subheading>
              <FormLayout>
                  <TextField 
                      label="Title" 
                      value={title} 
                      onChange={this.handleChange('title')} />
                  <TextField 
                      label="Paragraph" 
                      value={paragraph}
                      multiline 
                      onChange={this.handleChange('paragraph')} />
              </FormLayout>
            </Card>
          </Layout.Section>

            <Layout.Section>
              <PageActions
                primaryAction={{
                  content: 'Save',
                  onAction: () => this.props.saveQuestion(this.state),
                }}
                secondaryActions={[
                  {
                    content: 'Cancel',
                    onAction: () => Router.pushRoute('questions')
                  },
                  {
                    content: 'Delete',
                    onAction: () => this.props.deleteQuestion(this.state),
                    disabled: newQuestion
                  },
                ]}
              />
              </Layout.Section>
      </Layout>
    </Page>
  }

  handleChange = (field) => {
    return (value) => this.setState({[field]: value});
  };

  getQuestionInfo(){
    const {settings, query} = this.props
    const question = settings.questions
     ? settings.questions.find((el) => {
        return el._id == query.slug
      })
      : {}

    if (question) this.setState({...question})
  }

  

}

export default Question;