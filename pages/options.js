import OptionsEmptyState from '../components/OptionsEmptyState'
import OptionsList from '../components/OptionsList'
import { connect } from 'react-redux'
import { getSettings, saveSettings } from '../store'
import { Loading } from '@shopify/polaris';

class Options extends React.Component {

  static async getInitialProps ({query}) {
    return {query}
  }

  componentWillMount(){
    this.props.getSettings(this.props.query.shop)
  }

  render() {
    const emptyState = !this.props.settings || !this.props.settings.resultOptions;

    return (
      <div>
      {this.props.isLoaded
          ? emptyState
            ? <OptionsEmptyState />
            : <OptionsList options={this.props.settings.resultOptions} />
          : <Loading />
        }
      </div>
    )
    };
}

//Connect Redux
const mapStateToProps = (state) => {
  return {
    isLoaded: state.isLoaded,
    settings: state.settings
  }
}

const mapDispatchToProps = { getSettings, saveSettings }

const connectedOptions = connect(mapStateToProps, mapDispatchToProps)(Options)

export default connectedOptions;