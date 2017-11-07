import React from 'react'
import PropTypes from 'prop-types'

const styles = {
  content: {
    textAlign: 'center',
    fontSize: '35px',
  }
};

class Loading extends React.Component {
  constructor(props) {
    super(props)

    this.state = {
      text: props.text,
      speed: props.speed
    }
  }

  componentDidMount(){
    const stopper = this.state.text + '....';

    this.interval = window.setInterval(function(){
      if(this.state.text === stopper)
        this.setState({text: this.props.text})
      else
        this.setState({text: this.state.text + '.'})
    }.bind(this), this.state.speed)
  }

  componentWillUnmount() {
    window.clearInterval(this.interval)
  }

  render() {
    return (
      <div className='my-5'>
        <p style={styles.content}>{this.state.text}</p>
      </div>
    )
  }
}

Loading.defaultProps = {
  text: 'Loading',
  speed: 300
}

Loading.propTypes = {
  text: PropTypes.string, //.isRequired,
  speed: PropTypes.number //.isRequired
}

export default Loading
