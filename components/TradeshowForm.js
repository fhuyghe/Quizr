import { Layout, 
    Card, 
    FormLayout, 
    Page, 
    TextField
} from '@shopify/polaris';


class TradeshowForm extends React.Component {

    state = { 
        resultsValue: 'options',
        collectEmailChecked: true,
        resultsTitleTradeshow: '',
        resultsParagraphTradeshow: '',
        resultsTextAfterTradeshow: '',
        introTitleTradeshow: '',
        introParagraphTradeshow: '',
        shareParagraphTradeshow: ''
    };

    componentWillMount(){
        this.setState({...this.props})
    }

    componentWillReceiveProps(nextProps){
        if (nextProps !== this.props ) this.setState({...nextProps})
    }

    render() {

        const {
            resultsTitleTradeshow,
            resultsParagraphTradeshow,
            resultsTextAfterTradeshow,
            introTitleTradeshow,
            introParagraphTradeshow,
            shareParagraphTradeshow,
            resultEmailTitleTradeshow
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
            title="First Slide"
            description="The first slide your customers will see."
        >
            <Card sectioned>
            <FormLayout>
                <TextField 
                    label="Title"
                    value={introTitleTradeshow}
                    onChange={this.handleChange('introTitleTradeshow')} />
                <TextField 
                    label="Paragraph" 
                    value={introParagraphTradeshow}
                    multiline 
                    onChange={this.handleChange('introParagraphTradeshow')} />
            </FormLayout>
            </Card>
        </Layout.AnnotatedSection>

        <Layout.AnnotatedSection
            title="Share Page"
            description="The paragraph inviting people to share their email."
        >
            <Card sectioned>
            <FormLayout>
                <TextField 
                    label="Text"
                    value={shareParagraphTradeshow}
                    multiline 
                    onChange={this.handleChange('shareParagraphTradeshow')} />
                <TextField 
                    label="Email Title"
                    value={resultEmailTitleTradeshow}
                    onChange={this.handleChange('resultEmailTitleTradeshow')} />
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
                    value={resultsTitleTradeshow} 
                    onChange={this.handleChange('resultsTitleTradeshow')} />
                <TextField 
                    label="Paragraph" 
                    value={resultsParagraphTradeshow.replace(/<br\s*[\/]?>/gi, '\n')}
                    multiline 
                    onChange={this.handleChange('resultsParagraphTradeshow')} />
                <TextField 
                    label="Text after the results" 
                    value={resultsTextAfterTradeshow}
                    multiline 
                    onChange={this.handleChange('resultsTextAfterTradeshow')} />
            </FormLayout>
            </Card>
        </Layout.AnnotatedSection>
    </Layout>
    </Page>
  )}

    handleChange = (field) => {
        return (value) => {
            var formattedString = value.replace(/(?:\r\n|\r|\n)/g, '<br/>');
            this.setState({ [field]: formattedString }
            )
        };
      };
}

export default TradeshowForm;