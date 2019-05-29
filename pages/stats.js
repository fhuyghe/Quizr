require('isomorphic-fetch');
import { connect } from 'react-redux'
import { getSettings } from '../store'
import { Loading } from '@shopify/polaris';


class Stats extends React.Component {

    static async getInitialProps (ctx) {
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
                ? <h1>Stats</h1>
                : <Loading />
            }
      </div>
    };
}

//Connect Redux
const mapStateToProps = (state) => {
    return {
        isLoaded: state.isLoaded,
        settings: state.settings
    }
}
const mapDispatchToProps = { getSettings }

const connectedStats = connect(mapStateToProps, mapDispatchToProps)(Stats)

export default connectedStats;