import { ComponentState, Fragment, PureComponent } from 'react'

import DevTools from 'mobx-react-devtools'

import Head from 'next/head'

import AppLayout, { AppLayoutProps } from './AppLayout'

export interface AppProps {
  title: string
  navbar: AppLayoutProps
}

export default class App extends PureComponent<AppProps, ComponentState> {
  get title() {
    return this.props.title
  }

  get children() {
    return this.props.children
  }

  render() {
    return (
      <Fragment>
        {/* {this.renderDevTools()} */}
        {this.renderHead()}
        {this.renderGlobalStyle()}
        {this.renderLayout()}
      </Fragment>
    )
  }

  renderDevTools() {
    // return <DevTools /> // TODO: Render only for development
  }

  renderHead() {
    return (
      <Head>
        <title>{this.title}</title>
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <meta charSet="utf-8" />
        <link rel="stylesheet" href="//cdnjs.cloudflare.com/ajax/libs/antd/3.2.0/antd.min.css" />
        <link rel="stylesheet" href="/_next/static/style.css" />
      </Head>
    )
  }

  renderGlobalStyle() {
    return (
      <style jsx global>{`
        body {
        }
      `}</style>
    )
  }

  renderLayout() {
    return <AppLayout {...this.props.navbar}>{this.children}</AppLayout>
  }
}
