import {
    Card
  } from '@shopify/polaris';
  import gql from 'graphql-tag';
  import { Query } from 'react-apollo';
  
  const GET_PRODUCT_BY_ID = gql`
  query getProduct($id: ID!) {
    product(id: $id) {
        title
        handle
        type
        url
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
            console.log(product)
            
            return (
            <Card sectioned>
            <div className="productBlock">
              <div className="productImage">
                <img
                  src={
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
              </div>
              <div className="productText">
                <h3>{product.title}</h3>
                <div dangerouslySetInnerHTML={{ __html: product.descriptionHtml }} />
                <a className="btn" href={product.url}>Shop Now</a>
                </div>
                </div>
            </Card>
            );
        }}
        </Query>
  
    }
  }
  
  export default ProductDisplay;