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

        const stats = this.props.stats || {users: []}
        const settings = this.props.settings || {}
        
        //Trade Show info
        const tradeshowUsers = stats.users.filter(user => user.firstName)

        const tradeshowFullInfo = [['Email', 'First Name', 'Last Name', 'Company', 'Phone Number', 'Address 1', 'Address 2', 'City', 'State', 'Zip Code', 'Notes']]
        tradeshowUsers.map(user => { 
            tradeshowFullInfo.push([
                user.email,
                user.firstName,
                user.lastName,
                user.company,
                user.phone,
                user.address1,
                user.address2,
                user.city,
                user.state,
                user.zipcode,
                user.notes
            ])   
        })

        //Email display for resource list
        const customers = stats.users.filter(user => !user.firstName)

        const emails = [['Email']]
        customers.map(user => {
            if (user.email) {
                emails.push([user.email])   
            }
        })

        const emailsDisplay = (user) => {
            if (user.email) {
                return <ResourceList.Item
                id={user._id}
                accessibilityLabel={`View details for ${user.email}`}
                >
                    <p><TextStyle variation="strong">{user.email}</TextStyle></p>
                </ResourceList.Item>
            }
        }

        const emailPercentage = stats.users && (emails.length - 1) / stats.users.length * 100

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
        <Page title="Stats" >
            <Layout>
                <Layout.AnnotatedSection title="General Stats" >
                    <Card sectioned>
                        <p>The quiz was completed {this.props.stats ? this.props.stats.users.length : 0 } times.</p>        
                        <p>{Math.round(emailPercentage)}% of people have left their email address.</p>
                        <p>You collected {emails.length - 1} email addresses.</p>
                    </Card>
                </Layout.AnnotatedSection>

                <Layout.AnnotatedSection title="Emails" >
                    <Card sectioned>
                        <CSVLink
                            data={emails}
                            target="_blank"
                            filename={settings && settings.shop + '-quiz-users.csv'}>
                            <Button >Download Emails</Button>
                        </CSVLink>
                        <ResourceList
                            resourceName={{ singular: 'customer', plural: 'customers' }}
                            items={customers}
                            renderItem={emailsDisplay}
                            hasMoreItems={true}
  />
                    </Card>
                </Layout.AnnotatedSection>

                <Layout.AnnotatedSection title="Trade Show Prospects" >
                    <Card sectioned>
                        <CSVLink
                            data={tradeshowFullInfo}
                            target="_blank"
                            filename={settings && settings.shop + '-quiz-wholesalers.csv'}>
                            <Button >Download Info</Button>
                        </CSVLink>
                        <ResourceList
                            resourceName={{ singular: 'wholesaler', plural: 'wholesalers' }}
                            items={tradeshowUsers}
                            renderItem={emailsDisplay}
                            hasMoreItems={true}
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