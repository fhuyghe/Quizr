import { Card,
    FormLayout,
    TextField } from '@shopify/polaris';

class OptionsList extends React.Component {
  state = {
    optionTitle: '',
    optionParagraph: ''
  }
    
      render() {
        const {openClose,
          optionTitle,
          optionParagraph
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
          </Card>
        );
      }
    
      handleChange = (field) => {
        return (value) => this.setState({[field]: value});
      };

    }
    
export default OptionsList;