import { Attributes, Component } from 'react'

// import Link from 'next/link'
import App from '../components/App'
import { AppLayoutProps } from '../components/AppLayout'

export default class RollerPage extends Component<Attributes, any> implements AppLayoutProps {
  state = {
    collapsed: false
  }

  get collapsed(): boolean {
    return this.state.collapsed
  }

  toggleSideBar() {
    this.setState({ collapsed: !this.collapsed })
  }

  render() {
    return (
      <App title="Home" navbar={{ collapsed: this.collapsed, toggleSideBar: this.toggleSideBar.bind(this) }}>
        <h1>Roller</h1>
      </App>
    )
  }
}
