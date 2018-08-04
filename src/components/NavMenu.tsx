import { Attributes, ComponentState, PureComponent, ReactNode } from 'react'

import { SingletonRouter, withRouter } from 'next/router'

import { Icon, Menu } from 'antd'

class NavMenu extends PureComponent<Attributes & SingletonRouter, ComponentState> {
  get router() {
    return this.props.router
  }

  renderMenuItem(href: string, text: string, icon?: ReactNode) {
    return (
      <Menu.Item key={href}>
        {icon}
        <span>{text}</span>
      </Menu.Item>
    )
  }

  onMenuItemClicked({ key }: { key: string }) {
    this.router.replace(key)
  }

  render() {
    return (
      <Menu
        theme="dark"
        mode="inline"
        defaultSelectedKeys={[this.router.pathname]}
        onClick={this.onMenuItemClicked.bind(this)}>
        {this.renderMenuItem('/', 'Setup', <Icon type="apple" />)}
        {this.renderMenuItem('/roller', 'Roller', <Icon type="apple" />)}
        {this.renderMenuItem('/play', 'Play', <Icon type="apple" />)}
      </Menu>
    )
  }
}

export default withRouter(NavMenu)
