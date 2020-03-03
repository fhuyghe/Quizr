require('isomorphic-fetch');
import { connect } from 'react-redux'
import TradeshowForm from '../components/TradeshowForm';
import { getSettings, saveSettings } from '../store'
import { Loading } from '@shopify/polaris';


class Tradeshow extends React.Component {

    static async getInitialProps(ctx) {
        return {
            query: ctx.query
        }
      }

    componentDidMount(){
        this.props.getSettings(this.props.query.shop)
    }

    render() {
        return <div>
            {this.props.isLoaded
                ? <TradeshowForm {...this.props.settings} save={this.save}/>
                : <Loading />
            }
      </div>
    }

    save = (data) => { this.props.saveSettings(this.props.query.shop, data) }
}

//Connect Redux
const mapStateToProps = (state) => {
    return {
        isLoaded: state.isLoaded,
        settings: state.settings
    }
}
const mapDispatchToProps = { getSettings, saveSettings }

const connectedTradeshow = connect(mapStateToProps, mapDispatchToProps)(Tradeshow)

export default connectedTradeshow;