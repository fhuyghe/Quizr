import OptionsEmptyState from '../components/OptionsEmptyState'
import Option from '../components/Option'
import OptionsList from '../components/OptionsList'

class Options extends React.Component {

  render() {
    console.log(this.props.settings.resultOptions)
    const slug = this.props.query.slug
    const emptyState = !this.props.settings.resultOptions;


    return (
      <div>
      {slug 
        ? <Option saveOption={this.saveOption} slug={slug} />
        : emptyState
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