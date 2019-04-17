import OptionsEmptyState from '../components/OptionsEmptyState'
import OptionsList from '../components/OptionsList'

class Options extends React.Component {

  render() {
    const emptyState = !this.props.settings || !this.props.settings.resultOptions;

    return (
      <div>
      {emptyState
          ? <OptionsEmptyState />
          : <OptionsList options={this.props.settings.resultOptions} />
        }
      </div>
    )
    };
}

export default Options;