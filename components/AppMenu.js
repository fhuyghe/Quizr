import { Navigation, Frame } from '@shopify/polaris';
import {Router} from '../routes'
  
class AppContainer extends React.Component {

  render() {

    const navigationMarkup = <Navigation location="/">
    <Navigation.Section
      items={[
        {
          onClick: () => Router.pushRoute('/index'),
          label: 'General',
          icon: 'home',
        },
        {
          onClick: () => Router.pushRoute('/options'),
          label: 'Options',
          icon: 'duplicate',
        },
        {
          onClick: () => Router.pushRoute('/questions'),
          label: 'Questions',
          icon: 'help',
          },
          {
            onClick: () => Router.pushRoute('/coupons'),
            label: 'Coupons',
            icon: 'notes',
          },
          {
            onClick: () => Router.pushRoute('/tradeshow'),
            label: 'Tradeshow',
            icon: 'notes',
          }
      ]}
      />
    <Navigation.Section
      items={[
        {
          onClick: () => Router.pushRoute('/preview'),
          label: 'Preview',
          icon: 'view',
        },
      ]}
      separator
      />
      <Navigation.Section
      items={[
        {
          onClick: () => Router.pushRoute('/stats'),
          label: 'Stats',
          icon: 'search',
        },
      ]}
      separator
    />
    </Navigation>

    return (
      <Frame
        navigation={navigationMarkup}>
        { this.props.children }
        </Frame>
    )
    };
}

export default AppContainer;