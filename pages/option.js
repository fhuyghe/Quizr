
import { Layout, 
  Page,
  FormLayout,
  TextField,
  ResourcePicker,
  Button,
  Card,
  PageActions,
  Subheading,
  Heading
} from '@shopify/polaris';
import ProductDisplay from '../components/productDisplay'
import {Router} from '../routes'

class Option extends React.Component {

  state = {
    newOption: true,
    resourcePickerOpen: false,
    title: '',
    paragraph: '',
    product: ''
  }

  componentDidMount(){
    const newOption = this.props.query.slug == 'new' ? true : false

    if (!newOption){
      this.getOptionInfo()
    }

    this.setState({
      newOption: newOption
    })
  }

  render() {

    const {
      title,
      paragraph,
      newOption
    } = this.state

    return <Page
    breadcrumbs={[{content: 'Options', url: '/options'}]}
    title='Option'
    pagination={{
      hasPrevious: true,
      hasNext: true,
      previousURL: '',
      nextURL: ''
    }}
    >
      <Layout>
          <Layout.Section>
            <Heading>{newOption ? 'New Option' : 'Edit'}</Heading>
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
            <Card sectioned>
              <Subheading>Product</Subheading>
              <Button onClick={this.resourcePickerOpen}>
                {this.state.product ? 'Change' : 'Select'}
              </Button>
              {this.state.product && <ProductDisplay product={this.state.product} />}
              <ResourcePicker
                  allowMultiple={false}
                  showVariants={false}
                  resourceType="Product"
                  open={this.state.resourcePickerOpen}
                  onSelection={({selection}) => {
                    this.setState({product: selection[0].id});
                    this.setState({resourcePickerOpen: false});
                  }}
                  onCancel={() => this.setState({resourcePickerOpen: false})}
                />
              </Card>
            </Layout.Section>

            <Layout.Section>
              <PageActions
                primaryAction={{
                  content: 'Save',
                  onAction: () => this.props.saveOption(this.state),
                }}
                secondaryActions={[
                  {
                    content: 'Cancel',
                    onAction: () => Router.pushRoute('options', {slug: null})
                  },
                  {
                    content: 'Delete',
                    onAction: () => this.props.deleteOption(this.state),
                    disabled: newOption
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

  resourcePickerOpen = ()=>{
    this.setState(({resourcePickerOpen})=>(
      {resourcePickerOpen: !resourcePickerOpen}
    ));
  }

  getOptionInfo(){
    const {settings, query} = this.props
    const option = settings.resultOptions
      ? settings.resultOptions.find((el) => {
          return el._id == query.slug
        })
      : {} 
      
    if (option) this.setState({...option})
  }

  

}

export default Option;