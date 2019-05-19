
import { 
  FormLayout,
  TextField,
  Autocomplete,
  Stack, 
  Tag,
  TextContainer,
  Card
} from '@shopify/polaris';

class Answer extends React.Component {
  
  state = {
    positiveSelected: this.props.positive,
    negativeSelected: this.props.negative,
    negativeInput: '',
    positiveInput: '',
    positiveOptions: this.props.options,
    negativeOptions: this.props.options,
  }
    
    render() {
      const { text, index, length } = this.props

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

      const first = index == 0
      const last = index == length - 1

      return (
        <Card sectioned
          title={text}
          actions={[
            { content: 'Delete',
              onAction: () => this.props.deleteAnswer(index)},
            { content: '▼',
              disabled: last,
              onAction: () => this.props.lowerAnswer(index)},
            { content: '▲',
              disabled: first,
              onAction: () => this.props.higherAnswer(index)},
          ]}
        >
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
            selected={this.state.positiveSelected}
            textField={PositiveTextField}
            onSelect={(selected) => this.updateSelection('positive', selected)}
          />

          <TextContainer>
            <Stack>{this.renderTags('negative')}</Stack>
          </TextContainer>
          <Autocomplete
            allowMultiple
            options={this.state.negativeOptions}
            selected={this.state.negativeSelected}
            textField={NegativeTextField}
            onSelect={(selected) => this.updateSelection('negative', selected)}
          />
        </FormLayout>
        </Card>
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

    updateSelection = (type, selected) => {
      const selectedOptions = selected.map((selectedItem) => {
        const matchedOption = this.props.options.find((option) => {
          return option.value.match(selectedItem);
        });
        return matchedOption;
      });

      type == 'negative'
      ? this.setState({ negativeSelected: selected })
      : this.setState({ positiveSelected: selected })

      this.props.handleAnswerChange(type , selectedOptions, this.props.index)
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

    //Render Tags
    renderTags = (type) => {
      return this.props[type].map((option, index) => {
        return (
          <Tag key={'option' + option.value} onRemove={() => this.props.removeTag(this.props.index, type, index)}>
            {option.label || option.title}
          </Tag>
        );
      });
    };

  }
    
export default Answer;