import {
    Card,
    Thumbnail,
  } from '@shopify/polaris';
  import gql from 'graphql-tag';
  import { Query } from 'react-apollo';
  
  const GET_PRODUCT_BY_ID = gql`
  query getProduct($id: ID!) {
    product(id: $id) {
        title
        handle
        descriptionHtml
        id
        images(first: 1) {
          edges {
            node {
              originalSrc
              altText
            }
          }
        }
        variants(first: 1) {
          edges {
            node {
              price
              id
            }
          }
        }
    }
  }
`;
  
  class ProductDisplay extends React.Component {
  
    render() {
  
      return <Query query={GET_PRODUCT_BY_ID} variables={{ id: this.props.product }}>
        {(res) => {
            if (res.loading) return <div>Loading…</div>;
            if (res.error) return <div>{res.error.message}</div>;
            const product = res.data.product
            return (
            <Card sectioned>
            <Thumbnail
              source={
                product.images.edges[0]
                    ? product.images.edges[0].node.originalSrc
                    : ''
                }
              alt={
                product.images.edges[0]
                  ? product.images.edges[0].node.altText
                  : ''
              }
            />
                <h3>{product.title}</h3>
            </Card>
            );
        }}
        </Query>
  
    }
  }
  
  export default ProductDisplay;