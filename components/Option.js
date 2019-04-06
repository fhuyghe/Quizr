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

class Option extends React.Component {

  state = {
    resourcePickerOpen: false,
    title: '',
    paragraph: '',
    product: []
  }

  render() {

    const {
      title,
      paragraph,
      product
    } = this.state

    const newOption = this.props.slug == 'new' ? true : false
    
    const productRender = product && 
      <Card>
        <h3>{product.title}</h3>
      </Card>

    return <Page
    breadcrumbs={[{content: 'Options', url: '/options'}]}
    title='Option'
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
              {productRender}
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
                  content: 'Save',
                  onAction: () => this.props.saveOption(this.state),
                }}
                secondaryActions={[
                  {
                    content: 'Cancel',
                    url: '/options'
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

  

}

export default Option;