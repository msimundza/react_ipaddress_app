import React, { Component } from 'react'
import IpAddress from './ipAddress'

const ipInfoAPI = 'https://ipinfo.io/json'

class App extends Component {
  constructor (props, context) {
    super(props, context)

    this.state = {
      ipAddress: '',
      isLoading: false,
      error: null
    }
  }

  componentDidMount () {
    this.setState({ isLoading: true })
    fetch(ipInfoAPI)
      .then(res => {
        if (res.ok) {
          return res.json()
        } else {
          throw Error(`Error fetching data from ${ipInfoAPI}, ${res.statusText}`)
        }
      })
      .then(data => {
        this.setState({ ipAddress: data.ip, isLoading: false })
      })
      .catch(error => {
        this.setState({ error, isLoading: false })
      })
  }

  render () {
    const { ipAddress, isLoading, error } = this.state
    if (error) {
      return <div className='error'><span>{error.message}</span></div>
    }

    return (
      <div className='App'>
        {isLoading ? <div>'Loading'</div> : <div><IpAddress ip={ipAddress} /></div>}
      </div>
    )
  }
}

export default App
