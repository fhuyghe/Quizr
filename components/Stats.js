import {
    Layout, 
    Card, 
    Page, 
    DataTable,
    Heading,
    Button,
    ResourceList,
    TextStyle
} from '@shopify/polaris';
import {CSVLink} from 'react-csv';


class Stats extends React.Component {

    componentWillMount(){
        this.setState({...this.props})
    }

    componentWillReceiveProps(nextProps){
        if (nextProps !== this.props ) this.setState({...nextProps})
    }

    render() {

        const { stats, settings } = this.props

        const emails = [['Email']]
        const emailsDisplay = (user) => {
            if (user.email) {
                emails.push([user.email])
                return <ResourceList.Item
                id={user._id}
                accessibilityLabel={`View details for ${user.email}`}
                >
                    <h3><TextStyle variation="strong">{user.email}</TextStyle></h3>
                </ResourceList.Item>
            }
        }

        const emailPercentage = stats && emails.length / stats.users.length * 100

        const questionsStats = settings && settings.questions.map(question => {
            let questionAnswers = []
            stats.users.map(user => {
                user.quizAnswers.map(questionGroup => {
                    if (questionGroup.question == question._id) { 
                        questionAnswers = questionAnswers.concat(questionGroup.answers)
                    }
                })
            })

            let answersNumbers = []
            questionAnswers.map(answer => { 
                answersNumbers[answer] = answersNumbers[answer] ? answersNumbers[answer] + 1 : 1
            })

            let answersDisplay = []
            for (var key in answersNumbers) {
                const percent = Math.round(answersNumbers[key] / questionAnswers.length * 100)
                answersDisplay.push([
                    key,
                    percent + '%'
                ])
            }

            function Comparator(a, b) {
                if (a[1] < b[1]) return 1;
                if (a[1] > b[1]) return -1;
                return 0;
            }
            answersDisplay.sort(Comparator);

            return <Card sectioned key={question._id}>
                <Heading>{question.question}</Heading>
                <DataTable
                    columnContentTypes={[
                    'text',
                    'numeric',
                    ]}
                    headings={[
                    'Answer',
                    'Percent',
                    ]}
                    rows={answersDisplay}
                />
                    </Card>
        })

    return (
        <Page title="Settings" >
            <Layout>
                <Layout.AnnotatedSection title="General Stats" >
                    <Card sectioned>
                        <p>The quiz was completed {this.props.stats ? this.props.stats.users.length : 0 } times.</p>        
                        <p>{ Math.round(emailPercentage) }% of people have left their email address.</p>
                    </Card>
                </Layout.AnnotatedSection>

                <Layout.AnnotatedSection title="Emails" >
                    <Card sectioned>
                        <CSVLink
                            data={emails}
                            target="_blank"
                            filename={settings.shop + '-quiz-users'}>
                            <Button >Download Emails</Button>
                        </CSVLink>
                        <ResourceList
                            resourceName={{ singular: 'customer', plural: 'customers' }}
                            items={stats.users}
                            renderItem={emailsDisplay}
  />
                    </Card>
                </Layout.AnnotatedSection>

                <Layout.AnnotatedSection title="Questions stats" >
                        {questionsStats}
                </Layout.AnnotatedSection>
            </Layout>
        </Page>
        )
    };
}

export default Stats;