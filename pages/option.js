
import { Layout, 
  Page,
  FormLayout,
  TextField,
  ResourcePicker,
  Button,
  Card,
  PageActions,
  Subheading,
  Heading,
  Checkbox
} from '@shopify/polaris';
import ProductDisplay from '../components/productDisplay'
import {Router} from '../routes'
import { connect } from 'react-redux'
import { saveOption } from '../store'

class Option extends React.Component {

  state = {
    newOption: true,
    resourcePickerOpen: false,
    title: '',
    paragraph: '',
    product: {},
    defaultOption: false
  }

  static async getInitialProps ({query}) {
    return {query}
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
      newOption,
      defaultOption
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
                  <Checkbox
                    checked={defaultOption}
                    label="Default option"
                    onChange={this.handleChange('defaultOption')}
                  />
              </FormLayout>
            </Card>
          </Layout.Section>

          <Layout.Section>
            <Card sectioned>
              <Subheading>Product</Subheading>
              <Button onClick={this.resourcePickerOpen}>
                {this.state.product.id ? 'Change' : 'Select'}
              </Button>
              {this.state.product && this.state.product.id && <ProductDisplay product={this.state.product.id} />}
              <ResourcePicker
                  allowMultiple={false}
                  showVariants={false}
                  resourceType="Product"
                  open={this.state.resourcePickerOpen}
                  onSelection={({selection}) => {
                    this.setState({product: selection[0]});
                    this.setState({resourcePickerOpen: false});
                  }}
                  onCancel={() => this.setState({resourcePickerOpen: false})}
                />
              </Card>
            </Layout.Section>

            <Layout.Section>
              <PageActions
                primaryAction={{
                  content: this.state._id ? 'Update' : 'Save',
                  onAction: () => this.saveOption(this.state),
                }}
                secondaryActions={[
                  {
                    content: 'Back',
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

  saveOption = (option) => {
    const dataToSave =  {option: option}
    dataToSave.option.product = option.product 
      ? option.product 
      : null
    dataToSave.option.product.image = option.product.images && option.product.images[0].originalSrc
    dataToSave.settings = this.props.settings

    this.props.saveOption(dataToSave)
}
}

//Connect Redux
const mapStateToProps = (state) => {
  return {
      settings: state.settings
  }
}

const mapDispatchToProps = { saveOption }

const connectedOption = connect(mapStateToProps, mapDispatchToProps)(Option)

export default connectedOption;