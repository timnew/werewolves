import marked from 'marked';

import React, { PropTypes } from 'reactx';

class Markdown extends React.Component {
  constructor(props) {
    super(props);
  }

  renderMarkdown(markdown) {
    this.setState({
      html: marked(markdown)
    });
  }

  componentWillMount() {
      this.renderMarkdown(this.props.markdown);
  }

  componentWillReceiveProps(nextProps) {
    this.renderMarkdown(nextProps.markdown);
  }

  get html() { return this.state.html; }

  render() {
    return <div dangerouslySetInnerHTML={{ __html: this.html }}/>;
  }
}
Markdown.enablePureRender();
Markdown.propTypes = {
  markdown: PropTypes.string
};
Markdown.defaultProps = {
  markdown: ''
};

export default Markdown;
