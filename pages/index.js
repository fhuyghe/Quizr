import { Layout, Page, EmptyState, ResourcePicker } from '@shopify/polaris';

class Index extends React.Component {
    state = { open: false };
    render() {
    return (
    <Page 
        primaryAction={{
            content: 'Select products',
            onAction: () => this.setState({ open: true }),
    }}>
    <ResourcePicker
        resourceType="Product"
        showVariants={false}
        open={this.state.open}
        onSelection={(resources) => this.handleSelection(resources)}
        onCancel={() => this.setState({ open: false })}
    />
        <Layout>
        <EmptyState
            heading="Discount your products temporarily"
            action={{
                content: 'Select products',
                onAction: () => this.setState({ open: true }),
            }}
            image="https://cdn.shopify.com/s/files/1/0757/9955/files/empty-state.svg"
            >
            <p>Select products to change their price temporarily.</p>
            </EmptyState>
        </Layout>
    </Page>
  )};

  handleSelection = (resources) => {
        const idsFromResources = resources.selection.map((product) => product.id);
      this.setState({ open: false })
      console.log(resources)
    };
}
  
  export default Index;