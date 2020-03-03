import { Layout, 
    Card, 
    FormLayout, 
    DatePicker,
    Page, 
    TextField,
    Select,
    ButtonGroup,
    Button,
    TextStyle,
    TextContainer,
    Banner,
    Spinner,
    Checkbox
} from '@shopify/polaris';


class CouponForm extends React.Component {
    constructor(props) { 
        super(props)
        this.state = {...props}
    }

    state = {
        discountPaused: false,
        discountPausedTradeshow: false,
        month: 1,
        year: new Date().getFullYear(),
        discountType: 'dollars',
        discountAmount: '10',
        discountEndType: 'quantity',
        discountEndDate: new Date(),
        discountEndQty: 100,
        discountText: '',
        discountParagraph: ''
    };

    componentDidUpdate(nextProps){
        if (nextProps !== this.props ) this.setState({...nextProps})
    }

    render() {

        const {
            discountPaused,
            discountPausedTradeshow,
            discountType,
            discountAmount,
            discountEndType,
            discountEndDate,
            discountEndQty,
            discountTitle,
            discountParagraph,
            month,
            year,
            discountCodes,
            discountCodesSent,
            isSaving,
            isPausing
        } = this.state;

        const discountCreated = this.state._id

        const discountTypeOptions = [
            {label: 'Dollars', value: 'dollars'},
            {label: 'Percents', value: 'percents'},
          ];
        
        // const discountEndTypeOptions = [
        //     {label: 'Date', value: 'date'},
        //     {label: 'Quantity', value: 'quantity'},
        //   ];

    return (
        <Page title="Coupons" >
            <Layout>
                    <Layout.AnnotatedSection
                        title="Coupon Settings"
                        description="Coupons will be generated for each user and sent with the results email."
                >
                    {discountCreated &&
                        <Banner
                        title={discountPaused && discountPausedTradeshow ? "Discount campaign paused" : "Discount campaign active"}
                            status={discountPaused && discountPausedTradeshow ? "warning" : "success"}
                    >
                        <TextContainer>
                        {discountPaused && discountPausedTradeshow
                            ? <p>Resume your campaign below to continue sending discounts to your customers.</p>
                            : <p>Your customers are now receiving a coupon in the result email.</p>
                            }
                            <TextStyle variation="subdued">To edit the settings of this discount offer, delete it and create a new one.</TextStyle>
                            </TextContainer>
                        </Banner>
                    }
                        <Card sectioned>
                            <FormLayout>
                                <Select
                                    label="Type of discoumt"
                                    options={discountTypeOptions}
                                    disabled={discountCreated}
                                    onChange={this.handleChange('discountType')}
                                    value={discountType}
                                />
                                <TextField
                                    label="Amount"
                                    type="number"
                                    value={discountAmount}
                                    onChange={this.handleChange('discountAmount')}
                                    max={discountType == 'percents' ? 100 : 999}
                                    min={0}
                                suffix={discountType == 'percents' && '%'}
                                prefix={discountType == 'dollars' && '$'}
                                disabled={discountCreated}
                                />
                                {/* <Select
                                    label="Discount end"
                                    options={discountEndTypeOptions}
                                    onChange={this.handleChange('discountEndType')}
                                value={discountEndType}
                                disabled={discountCreated}
                                /> */}
                                {discountEndType == 'quantity'
                                    ? <TextField
                                        label="Quantity"
                                        type="number"
                                        min={0}
                                        value={discountEndQty}
                                    onChange={this.handleChange('discountEndQty')}
                                    disabled={discountCreated}
                                    />
                                    : <DatePicker
                                        month={month}
                                        year={year}
                                        onChange={this.handleChange('discountEndDate')}
                                        onMonthChange={this.handleMonthChange}
                                    selected={discountEndDate}
                                    disabled={discountCreated}
                                    />
                            }
                            <TextField 
                                label="Title" 
                                value={discountTitle} 
                                onChange={this.handleChange('discountTitle')}
                                disabled={discountCreated}
                            />
                            <TextField 
                                label="Paragraph" 
                                value={discountParagraph}
                                multiline 
                                onChange={this.handleChange('discountParagraph')}
                                disabled={discountCreated}
                            />
                        </FormLayout>
                    </Card>
                </Layout.AnnotatedSection>

                <Layout.AnnotatedSection
                    title="Locations"
                    description=""
                >
                    <Card sectioned>
                
                        <Checkbox
                    checked={!discountPaused}
                    label="Customer Quiz"
                    onChange={this.handlePauseChange('discountPaused')}
                                /><br />
                            
                        <Checkbox
                    checked={!discountPausedTradeshow}
                    label="Trade Show Quiz"
                    onChange={this.handlePauseChange('discountPausedTradeshow')}
                        />

                    {isPausing && <Spinner size="small" color="teal" /> }
                        
                     </Card>
                </Layout.AnnotatedSection>
            
                    <Layout.AnnotatedSection
                    title="Campaign Settings"
                    description=""
                >
                    <Card sectioned>
                        <ButtonGroup>
                            {!discountCreated && <Button primary onClick={this.save}>{isSaving ? <Spinner size="small" color="teal" /> : "Create Campaign"}</Button>}
                            {discountCreated && <Button destructive onClick={this.delete}>Delete</Button>}
                            {discountCreated && 
                                <TextContainer>
                                    <p>{discountCodes.length} coupons remaining</p>
                                    <p>{discountCodesSent.length} coupons sent</p>
                                </TextContainer>}
                        </ButtonGroup>                     
                    </Card>
                </Layout.AnnotatedSection>
    </Layout>
    </Page>
  )};
    
    handleMonthChange = (month, year) => {
        this.setState({
          month,
          year
        });
    };

    handleChange = (field) => {
        return (value) => {
            this.setState({ [field]: value }
            )
        }
    }
    
    handlePauseChange = (field) => {
        return (value) => {
            this.setState({ [field]: !value })
            this.props.pause(field)
        }
    }

    save = () => {
        this.props.save(this.state)
    }

    delete = () => { 
        this.props.delete(this.state)
    }
}

export default CouponForm