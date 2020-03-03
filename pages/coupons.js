import { connect } from 'react-redux'
import CouponForm from '../components/CouponForm';
import { getCoupons, saveCouponsProcess, deleteCoupons, pauseCoupons } from '../store'
import { Loading } from '@shopify/polaris';


class Coupons extends React.Component {

    static async getInitialProps(ctx) {
        return {
            query: ctx.query
        }
      }

      componentDidMount() {
        let shop = this.props.settings.shop || this.props.query.shop
        this.props.getCoupons(shop)
    }

    render() {
        return <div>
            {this.props.isLoaded
                ? <CouponForm {...this.props.coupons}
                    save={this.save}
                    pause={this.props.pauseCoupons}
                    delete={this.delete}
                    isSaving={this.props.isSaving}
                    isPausing={this.props.isPausing} />
                : <Loading />
            }
      </div>
    };

    save = (data) => {
        this.props.saveCouponsProcess(this.props.settings.shop, data)
    }

    delete = (data) => {
        this.props.deleteCoupons(data)
    }
}

//Connect Redux
const mapStateToProps = (state) => {
    return {
        isSaving: state.isSaving,
        isLoaded: state.isLoaded,
        settings: state.settings,
        coupons: state.coupons,
        isPausing: state.isPausing
    }
}
const mapDispatchToProps = { getCoupons, saveCouponsProcess, deleteCoupons, pauseCoupons }

const connectedCoupons = connect(mapStateToProps, mapDispatchToProps)(Coupons)

export default connectedCoupons;