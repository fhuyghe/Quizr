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

    saveOption = (option) => {
      const dataToSave =  {option: option}
      dataToSave.option.product = option.product ? option.product.id : null
      dataToSave.settings = this.props.settings
  
      fetch('/api/settings/addoption', {
          method: 'POST',
          body: JSON.stringify(dataToSave),
          headers: {
              'Content-Type': 'application/json'
          }
      });
  }
}

export default Options;