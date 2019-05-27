import { Card,
    FormLayout,
    TextField,
    Checkbox 
  } from '@shopify/polaris';

class OptionsList extends React.Component {
  state = {
    optionTitle: '',
    optionParagraph: '',
    defaultOption: false
  }
    
      render() {
        const {
          optionTitle,
          optionParagraph,
          defaultOption
        } = this.state

        return (
          <Card>
              <FormLayout>
                <TextField 
                    label="Title" 
                    value={optionTitle} 
                    onChange={this.handleChange('optionTitle')} />
                <TextField 
                    label="Paragraph" 
                    value={optionParagraph}
                    multiline 
                    onChange={this.handleChange('optionParagraph')} />
              </FormLayout>
              <Checkbox
                checked={defaultOption}
                label="Default option"
                name="defaultOption"
                onChange={this.handleChange}
              />
          </Card>
        );
      }
    
      handleChange = (field) => {
        return (value) => this.setState({[field]: value});
      };

    }
    
export default OptionsList;