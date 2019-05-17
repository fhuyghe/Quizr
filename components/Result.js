class Result extends React.Component {

  render() {
    const { result } = this.props

    return (
       <div className="result" >
       { result.title }
       { result.product }
       </div>
    )
    };
}

export default Result;