import '../style/style.scss'

class QuizContainer extends React.Component {

  render() {

    return (
      <div className={"quizContainer " + this.props.name}>
        <div className="gradient">  
          <div className="wrap">
            { this.props.children }
          </div>
        </div>
      </div>
    )
    };
}

export default QuizContainer;