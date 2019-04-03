import { Layout, 
    Card, 
    FormLayout, 
    Checkbox,
    Button, 
    Page, 
    TextField, 
    Stack,
    RadioButton, 
    Toast } from '@shopify/polaris';
import Link from 'next/link'
//To store locally for now
import store from 'store-js';
import OptionsList from '../components/OptionsList'
import OptionsAdd from '../components/OptionsAdd'


class Index extends React.Component {
    state = { 
        resultsValue: 'options',
        collectEmailChecked: true,
        resultsTitle: '',
        resultsParagraph: '',
        resultsTextAfter: '',
        introTitle: '',
        introParagraph: '',
        showToast: false,
    };

    render() {

        const {
            resultsValue, 
            collectEmailChecked,
            resultsTitle,
            resultsParagraph,
            resultsTextAfter,
            introTitle,
            introParagraph,
            showToast
        } = this.state;

        const toastMarkup = showToast ? (
                <Toast 
                    content="Saved!" 
                    onDismiss={this.toggleSaveToast} 
                    duration={4500}
                />
          ) : null;

    return (
    <Page
        title="Settings"
        primaryAction={{
            content: 'Save',
            onAction: () => this.save(),
    }}>
    <Layout>
        <Layout.AnnotatedSection
            title="General Settings"
            description="Tell us more about your quiz."
        >
            <Card sectioned>
            <FormLayout>
                <Checkbox
                    checked={collectEmailChecked}
                    label="Collect emails at the end of the quiz"
                    onChange={this.handleCollectEmailChange}
                />
                <Stack vertical>
                    <RadioButton
                        label="Result as options"
                        helpText="Create a set of options for the quiz to choose from."
                        id="options"
                        name="results"
                        checked={resultsValue === 'options'}
                        onChange={this.handleResultsChange}
                    />
                    <RadioButton
                        label="Result as tag filter"
                        helpText="The quiz will return a set of products matching the filters."
                        checked={resultsValue === 'filters'}
                        id="filters"
                        name="results"
                        onChange={this.handleResultsChange}
                    />
                </Stack>
            </FormLayout>
            </Card>
        </Layout.AnnotatedSection>


        { resultsValue == 'options' ? 
        <Layout.AnnotatedSection
            title="Options"
            description="Create options to show as the result of the quiz."
        >
            <Link href="/options?slug=new" as="/options/new"><Button>Add new</Button></Link>
            <OptionsList />
        </Layout.AnnotatedSection>
        : null }

        <Layout.AnnotatedSection
            title="Intro"
            description="The first slide your customers will see."
        >
            <Card sectioned>
            <FormLayout>
                <TextField 
                    label="Title"
                    value={introTitle}
                    onChange={this.handleChange('introTitle')} />
                <TextField 
                    label="Paragraph" 
                    value={introParagraph}
                    multiline 
                    onChange={this.handleChange('introParagraph')} />
            </FormLayout>
            </Card>
        </Layout.AnnotatedSection>

        <Layout.AnnotatedSection
            title="Results Page"
            description="Customize the last page of your quiz"
        >
            <Card sectioned>
            <FormLayout>
                <TextField 
                    label="Title" 
                    value={resultsTitle} 
                    onChange={this.handleChange('resultsTitle')} />
                <TextField 
                    label="Paragraph" 
                    value={resultsParagraph}
                    multiline 
                    onChange={this.handleChange('resultsParagraph')} />
                <TextField 
                    label="Text after the results" 
                    value={resultsTextAfter}
                    multiline 
                    onChange={this.handleChange('resultsTextAfter')} />
            </FormLayout>
            </Card>
        </Layout.AnnotatedSection>
        {toastMarkup}
    </Layout>
    </Page>
  )};

    handleSelection = (resources) => {
        const idsFromResources = resources.selection.map((product) => product.id);
      this.setState({ open: false })
      store.set('ids', idsFromResources);
    };

    save = () => {
        store.set('settings', this.state);
        console.log('saved', this.state)
        this.toggleSaveToast();
    }

    toggleSaveToast = () => {
        this.setState(({showToast}) => ({showToast: !showToast}));
    };

    handleCollectEmailChange = (value) => {
        this.setState({collectEmailChecked: value});
      };

      handleResultsChange = (checked, value) => {
        this.setState({resultsValue: value});
      };

      handleChange = (field) => {
        return (value) => this.setState({[field]: value});
      };
}
  
  export default Index;