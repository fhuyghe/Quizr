require('isomorphic-fetch');
import { connect } from 'react-redux'
import { getSettings } from '../store'
import { Loading } from '@shopify/polaris'
import Stats from '../components/Stats'


class StatsPage extends React.Component {

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
                ? <Stats stats={this.props.stats} settings={this.props.settings}/>
                : <Loading />
            }
      </div>
    };
}

//Connect Redux
const mapStateToProps = (state) => {
    return {
        isLoaded: state.isLoaded,
        settings: state.settings,
        stats: state.stats
    }
}
const mapDispatchToProps = { getSettings }

const connectedStats = connect(mapStateToProps, mapDispatchToProps)(StatsPage)

export default connectedStats;