require('isomorphic-fetch');
import { connect } from 'react-redux'
import GeneralForm from '../components/GeneralForm';
import { getSettings, saveSettings } from '../store'
import { Loading } from '@shopify/polaris';


class Index extends React.Component {

    static async getInitialProps(ctx) {
        return {
            query: ctx.query
        }
      }

    componentWillMount(){
        this.props.getSettings(this.props.query.shop)
    }

    render() {
        return <div>
            {this.props.isLoaded
                ? <GeneralForm {...this.props.settings} save={this.save} isSaving={this.props.isSaving}/>
                : <Loading />
            }
      </div>
    };

    save = (data) => { this.props.saveSettings(this.props.query.shop, data) }
}

//Connect Redux
const mapStateToProps = (state) => {
    return {
        isLoaded: state.isLoaded,
        isSaving: state.isSaving,
        settings: state.settings
    }
}
const mapDispatchToProps = { getSettings, saveSettings }

const connectedIndex = connect(mapStateToProps, mapDispatchToProps)(Index)

export default connectedIndex;