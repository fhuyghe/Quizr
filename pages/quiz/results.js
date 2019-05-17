import QuizContainer from '../../components/QuizContainer'
import Result from '../../components/Result'
import { saveAnswer } from '../../store'
import { connect } from 'react-redux'

class Results extends React.Component{
    state = {
        results: []
    }

    componentWillMount(){
        let positive = []
        let negative = []
        let results = {}

        this.props.answers.map((answer) => {
            positive = positive.concat(answer.positive)
            negative = negative.concat(answer.negative)
        })

        positive.map((value) => {
            results[value._id] = results[value._id] ? results[value._id] + 1 : 1
        })
        negative.map((value) => {
            results[value._id] = results[value._id] ? results[value._id] - 1 : -1
        })

        var sortable = [];
        for (var value in results) {
            sortable.push([value, results[value]]);
        }

        sortable.sort(function(a, b) {
            return a[1] - b[1];
        });

        this.setState({
            results: sortable.slice(0,3)
        })
    }

    render() {

        const { settings } = this.props

        return <QuizContainer name="results">
            <header>
                <h1>{ settings.resultsTitle }</h1>
            </header>

            <div className="content">

                <p>{ settings.resultsParagraph }</p>
                
                {this.state.results.map((result) => {
                    const resultOption = settings.resultOptions.find((option) => {
                        return option._id == result[0]
                    })
                    return resultOption && <Result key={resultOption._id} result={resultOption} />
                })}
                
                <p>{ settings.resultsTextAfter }</p>
            </div>

            <footer>
                <a href="https://savemefrom.com" className="btn">Shop Now</a>
            </footer>
        </QuizContainer>
    }
}

//Connect Redux
const mapStateToProps = (state) => {
    return {
      settings: state.settings,
      answers: state.answers
    }
  }
  const mapDispatchToProps = { saveAnswer }

  const connectedResults = connect(mapStateToProps, mapDispatchToProps)(Results)
  
  export default connectedResults;