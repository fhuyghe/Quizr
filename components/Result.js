import ProductDisplay from './productDisplay'

class Result extends React.Component {

  render() {
    const { result } = this.props

    return (
       <div className="result" >
       <h4>{ result.paragraph }</h4>
       {result.product && <ProductDisplay product={result.product} />}
       </div>
    )
    };
}

export default Result;