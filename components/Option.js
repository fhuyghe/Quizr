import { Layout, 
  Page,
  FormLayout,
  TextField,
  ResourcePicker,
  Button,
  Card,
} from '@shopify/polaris';

class Option extends React.Component {

  state = {
    resourcePickerOpen: false,
    optionTitle: '',
    optionParagraph: '',
    product: []
  }

  render() {

    const {
      optionTitle,
      optionParagraph
    } = this.state

    const product = this.state.product[0]
    console.log(product)

    const productRender = product && 
      <Card>
        <h3>{product.title}</h3>
      </Card>

    return <Page
    breadcrumbs={[{content: 'Options', url: '/options'}]}
    title='Option'
    >
      <Layout>
      <Layout.AnnotatedSection
            title="Text"
        >
        <FormLayout>
                <TextField 
                    label="Title" 
                    value={optionTitle} 
                    onChange={this.handleChange('optionTitle')} />
                <TextField 
                    label="Paragraph" 
                    value={optionParagraph}
                    multiline 
                    onChange={this.handleChange('optionParagraph')} />
              </FormLayout>
        </Layout.AnnotatedSection>

        <Layout.AnnotatedSection
            title="Product"
        >
          <Button onClick={this.resourcePickerOpen}>
          {this.state.product ? 'Change' : 'Select'}
          </Button>
          {productRender}
          <ResourcePicker
                allowMultiple={false}
                showVariants={false}
                resourceType="Product"
                open={this.state.resourcePickerOpen}
                onSelection={({selection}) => {
                  this.setState({product: selection});
                  this.setState({resourcePickerOpen: false});
                }}
                onCancel={() => this.setState({resourcePickerOpen: false})}
              />
        </Layout.AnnotatedSection>
        <Button primary>Save</Button>
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

}

export default Option;