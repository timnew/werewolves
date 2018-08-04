import { ComponentState, PureComponent } from 'react'

import { Icon, Layout, Menu } from 'antd'

const { Header, Sider, Content } = Layout

import css from './AppLayout.less'
import NavMenu from './NavMenu'

export interface AppLayoutProps {
  collapsed: boolean
  toggleSideBar(): any
}

export default class AppLayout extends PureComponent<AppLayoutProps, ComponentState> {
  get collapsed(): boolean {
    return this.props.collapsed
  }

  get toggleIcon(): string {
    return this.collapsed ? 'menu-unfold' : 'menu-fold'
  }

  render() {
    return (
      <Layout>
        <Sider trigger={null} collapsible collapsed={this.collapsed}>
          <div className={css.logo} />
          <NavMenu />
        </Sider>
        <Layout>
          <Header style={{ background: '#fff', padding: 0 }}>
            <Icon className={css.trigger} type={this.toggleIcon} onClick={() => this.props.toggleSideBar()} />
          </Header>
          <Content
            style={{
              margin: '24px 16px',
              padding: 24,
              background: '#fff',
              minHeight: 280
            }}>
            {this.props.children}
          </Content>
        </Layout>
      </Layout>
    )
  }
}
