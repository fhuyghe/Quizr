import { Navigation, Frame } from '@shopify/polaris';
import {
  DuplicateMinor,
  HomeMajorMonotone,
  QuestionMarkMajorTwotone,
  NoteMinor,
  ViewMinor,
  SearchMinor
} from '@shopify/polaris-icons';
import {Router} from '../routes'
  
class AppContainer extends React.Component {

  render() {

    const navigationMarkup = <Navigation location="/">
    <Navigation.Section
      items={[
        {
          onClick: () => Router.pushRoute('/index'),
          label: 'General',
          icon: HomeMajorMonotone,
        },
        {
          onClick: () => Router.pushRoute('/options'),
          label: 'Options',
          icon: DuplicateMinor,
        },
        {
          onClick: () => Router.pushRoute('/questions'),
          label: 'Questions',
          icon: QuestionMarkMajorTwotone,
          },
          {
            onClick: () => Router.pushRoute('/tradeshow'),
            label: 'Tradeshow',
            icon: NoteMinor,
          }
      ]}
      />
    <Navigation.Section
      items={[
        {
          onClick: () => Router.pushRoute('/preview'),
          label: 'Preview',
          icon: ViewMinor,
        },
      ]}
      separator
      />
      <Navigation.Section
      items={[
        {
          onClick: () => Router.pushRoute('/stats'),
          label: 'Stats',
          icon: SearchMinor,
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