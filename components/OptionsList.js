import {Router} from '../routes'
import { ResourceList,
    Card,
    TextStyle,
    Avatar,
    Layout,
    Page,
    Heading,
    TextContainer,
    Badge
   } from '@shopify/polaris';

class OptionsList extends React.Component {

  renderItem = (item) => {
    const {title, paragraph, defaultOption, product} = item;
    const media = <Avatar size="medium" name={title} source={ product && product.image } />;

    return (
        <ResourceList.Item
          media={media}
          accessibilityLabel={`View details for ${title}`}
          onClick={() => Router.pushRoute('option', {slug: item._id})}
        >
          <h4><TextStyle variation="strong">{title}</TextStyle></h4>
          <div>{ paragraph }</div>
          {defaultOption && <Badge>Default</Badge>}
        </ResourceList.Item>
    );
    }
    
      render() {
        const options = this.props.options

        return (
          <Page
            title="Options"
            primaryAction={{
              content: 'Add Option',
              onAction: () => Router.pushRoute('option', {slug: 'new'})
            }}
          >
          <Layout>
            <Layout.Section>
              <TextContainer>
                <Heading>Result Options</Heading>
                <p>Choose what options the users will be given at the end of the quiz. When creating questions, you will be able to assign points for these options for each possible answer.</p>
              </TextContainer>
            </Layout.Section>

            <Layout.Section>
              <Card>
                <ResourceList
                      resourceName={{singular: 'option', plural: 'options'}}
                      items={options}
                      renderItem={this.renderItem}
                  />
              </Card>
            </Layout.Section>
          </Layout>
          </Page>
        );
      }
    }
    
export default OptionsList;