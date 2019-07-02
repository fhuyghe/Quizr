import {
  Card,
  TextField
  } from '@shopify/polaris';
  import gql from 'graphql-tag';
  import { Query } from 'react-apollo';
  
  const GET_DOMAIN = gql`
  query getDomain {
    shop {
      primaryDomain{
        url
      }
    }
  }
`;
  
  class DomainDisplay extends React.Component {
  
    render() {

      const queryFunction = <Query query={GET_DOMAIN} variables={{ id: this.props.product }}>
      {(res) => {
        if (res.loading) return <div>Loading…</div>;
        if (res.error) return <div>{res.error.message}</div>;
                
        const { shop } = res.data
          this.props.saveDomain(shop.primaryDomain.url)
          return null
      }}
    </Query>
  
      return <Card sectioned>
                <TextField 
                    label="Domain"
                    value={this.props.domain}
                    disabled
                    onChange={this.props.handleChange('domain')} />
                
                { !this.props.domain && queryFunction }
            </Card>
    }
  }
  
  export default DomainDisplay;