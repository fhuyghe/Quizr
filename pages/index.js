import { Layout, 
    Card, 
    FormLayout, 
    Checkbox,
    Page, 
    TextField
    } from '@shopify/polaris';
require('isomorphic-fetch');


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

    componentWillMount(props){
        this.setState({...this.props.settings})
    }

    render() {

        const {
            collectEmailChecked,
            resultsTitle,
            resultsParagraph,
            resultsTextAfter,
            introTitle,
            introParagraph
        } = this.state;

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
            </FormLayout>
            </Card>
        </Layout.AnnotatedSection>

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
    </Layout>
    </Page>
  )};

    handleSelection = (resources) => {
        const idsFromResources = resources.selection.map((product) => product.id);
      this.setState({ open: false })
      store.set('ids', idsFromResources);
    };

    save = () => {
        const dataToSave =  this.state
        dataToSave._id = this.props.settings._id ? this.props.settings._id : null

        fetch('/api/settings', {
            method: 'POST',
            body: JSON.stringify(dataToSave),
            headers: {
                'Content-Type': 'application/json'
            }
        });
    }

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