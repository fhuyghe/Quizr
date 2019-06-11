import { connect } from 'react-redux'
import CouponForm from '../components/CouponForm';
import { getCoupons, saveCouponsProcess, deleteCoupons } from '../store'
import { Loading } from '@shopify/polaris';


class Coupons extends React.Component {

    static async getInitialProps(ctx) {
        return {
            query: ctx.query
        }
      }

    componentWillMount() {
        let shop = this.props.settings.shop || this.props.query.shop
        this.props.getCoupons(shop)
    }

    render() {
        return <div>
            {this.props.isLoaded
                ? <CouponForm {...this.props.coupons} save={this.save} delete={this.delete} isSaving={this.props.isSaving}/>
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
        coupons: state.coupons
    }
}
const mapDispatchToProps = { getCoupons, saveCouponsProcess, deleteCoupons }

const connectedCoupons = connect(mapStateToProps, mapDispatchToProps)(Coupons)

export default connectedCoupons;