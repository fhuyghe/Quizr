import { ResourceList,
  Card,
    TextStyle,
    Avatar } from '@shopify/polaris';
import store from 'store-js';

class OptionsList extends React.Component {

  renderItem = (item) => {
    const {title, paragraph, product} = item;
    const media = <Avatar customer size="medium" name={title} />;

    return (
        <ResourceList.Item
          media={media}
          accessibilityLabel={`View details for ${title}`}
        >
        <h3>
            <TextStyle variation="strong">{title}</TextStyle>
        </h3>
        <div>{paragraph}</div>
        </ResourceList.Item>
    );
    }
    
      render() {
        const options = store.get('options') ? store.get('options') : [];

        return (
          <Card>
            <ResourceList
                  resourceName={{singular: 'option', plural: 'options'}}
                  items={options}
                  renderItem={this.renderItem}
              />
          </Card>
        );
      }
    }
    
export default OptionsList;