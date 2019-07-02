import { Layout, 
    Card, 
    FormLayout, 
    Checkbox,
    Page, 
    TextField
} from '@shopify/polaris';
import DomainDisplay from './DomainDisplay'


class GeneralForm extends React.Component {

    state = { 
        resultsValue: 'options',
        collectEmailChecked: true,
        resultsTitle: '',
        resultsParagraph: '',
        resultsTextAfter: '',
        introTitle: '',
        introParagraph: '',
        shareParagraph: '',
        domain: ''
    };

    componentWillMount(){
        this.setState({...this.props})
    }

    componentWillReceiveProps(nextProps){
        if (nextProps !== this.props ) this.setState({...nextProps})
    }

    render() {

        const {
            collectEmailChecked,
            resultsTitle,
            resultsParagraph,
            resultsTextAfter,
            introTitle,
            introParagraph,
            shareParagraph,
            title, 
            intro,
            resultEmail,
            resultEmailName,
            resultEmailTitle
        } = this.state;

    return (
    <Page
        title="Settings"
        primaryAction={{
            content: 'Save',
            onAction: () => this.props.save(this.state),
    }}>
    <Layout>
        <Layout.AnnotatedSection
            title="General Settings"
            description="Tell us more about your quiz."
                >
                    <DomainDisplay
                        handleChange={this.handleChange}
                        saveDomain={this.saveDomain}
                        domain ={this.state.domain} />
            <Card sectioned>
            <FormLayout>
                <TextField 
                    label="Title"
                    value={title}
                    onChange={this.handleChange('title')} />
                <TextField 
                    label="Intro" 
                    value={intro}
                    multiline 
                    onChange={this.handleChange('intro')} />
            </FormLayout>
            </Card>
        </Layout.AnnotatedSection>

        <Layout.AnnotatedSection
            title="First Slide"
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
            title="Share Page"
            description="The paragraph inviting people to share their email."
        >
            <Card sectioned>
            <FormLayout>
                <Checkbox
                    checked={collectEmailChecked}
                    label="Collect emails at the end of the quiz"
                    onChange={this.handleCollectEmailChange}
                />
                <TextField 
                    label="Text"
                    value={shareParagraph}
                    multiline 
                    onChange={this.handleChange('shareParagraph')} />
                <TextField 
                    label="Sender's Email"
                    value={resultEmail} 
                    type="email"
                                onChange={this.handleChange('resultEmail')} />
                <TextField 
                    label="Sender's Name"
                    value={resultEmailName} 
                    onChange={this.handleChange('resultEmailName')} />
                <TextField 
                    label="Email Title"
                    value={resultEmailTitle}
                    onChange={this.handleChange('resultEmailTitle')} />
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
                    value={resultsParagraph.replace(/<br\s*[\/]?>/gi, '\n')}
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

    handleCollectEmailChange = (value) => {
        this.setState({collectEmailChecked: value});
    };

    handleResultsChange = (checked, value) => {
        this.setState({resultsValue: value});
    };
    
    saveDomain = (domain) => { 
        this.setState({ domain })
    }

    handleChange = (field) => {
        return (value) => {
            var formattedString = value.replace(/(?:\r\n|\r|\n)/g, '<br/>');
            this.setState({ [field]: formattedString }
            )
        };
      };
}

export default GeneralForm;