
import { Layout, 
  Page,
  FormLayout,
  TextField,
  Autocomplete,
  Card,
  Button,
  PageActions,
  Subheading,
  Heading,
  Stack, 
  Tag,
  TextContainer
} from '@shopify/polaris';

class Answer extends React.Component {
  state = {
    negativeInput: '',
    positiveInput: '',
    positiveOptions: this.props.options,
    negativeOptions: this.props.options,
  }
    
      render() {
        const {text, positive, negative } = this.props
  
        const PositiveTextField = (
          <Autocomplete.TextField
            onChange={(value) => this.updateText(value, 'positive')}
            label="Positive Options"
            value={this.state.positiveInput}
          />
        );
  
        const NegativeTextField = (
          <Autocomplete.TextField
            onChange={(value) => this.updateText(value, 'negative')}
            label="Negative Options"
            value={this.state.negativeInput}
          />
        );

        return (

          <FormLayout>
            <TextField 
              label="Text" 
              value={text} 
              onChange={(value) => this.props.handleAnswerChange('text', value, this.props.index)} />

            <TextContainer>
              <Stack>{this.renderTags('positive')}</Stack>
            </TextContainer>
            <Autocomplete
              allowMultiple
              options={this.state.positiveOptions}
              selected={positive}
              textField={PositiveTextField}
              onSelect={(selected) => this.props.handleAnswerChange('positive', selected, this.props.index)}
            />

            <TextContainer>
              <Stack>{this.renderTags('negative')}</Stack>
            </TextContainer>
            <Autocomplete
              allowMultiple
              options={this.state.negativeOptions}
              selected={negative}
              textField={NegativeTextField}
              onSelect={(selected) => this.props.handleAnswerChange('negative', selected, this.props.index)}
            />
          </FormLayout>
        );
      }

      updateText = (newValue, type) => {
        if (type == 'positive'){
          this.setState({positiveInput: newValue});
        } else {
          this.setState({negativeInput: newValue});
        }
        this.filterAndUpdateOptions(newValue, type);
      };
    
      filterAndUpdateOptions = (inputString, type) => {
        if (inputString === '') {
          if (type == 'positive'){
            this.setState({
              positiveOptions: this.props.options,
            });
          } else {
            this.setState({
              negativeOptions: this.props.options,
            });
          }
          return;
        }
    
        const filterRegex = new RegExp(inputString, 'i');
        const resultOptions = this.props.options.filter((option) =>
          option.label.match(filterRegex),
        );

        if (type == 'positive'){
          this.setState({
            positiveOptions: resultOptions,
          });
        } else {
          this.setState({
            negativeOptions: resultOptions,
          });
        }
      };
    
      renderTags = (type) => {
        return this.props[type].map((option) => {
          let tagLabel = '';
          tagLabel = option.replace('_', ' ');
          tagLabel = titleCase(tagLabel);
          return (
            <Tag key={'option' + option} onRemove={() => this.removeTag(option)}>
              {tagLabel}
            </Tag>
          );
        });
      };

    }

    function titleCase(string) {
      string = string
        .toLowerCase()
        .split('-')
        .map(function(word) {
          return word.replace(word[0], word[0].toUpperCase());
        });
      return string.join(' ');
    }
    
export default Answer;