import React, { PureComponent } from "react";
import PropTypes from "prop-types";
import { Prism } from "react-syntax-highlighter";
import SyntaxHighlighter from "react-syntax-highlighter";

class CodeBlock extends PureComponent {
  static propTypes = {
    value: PropTypes.string,
    language: PropTypes.string
  };

  static defaultProps = {
    language: null
  };

  render() {      
    const { language, value } = this.props;
    return (
      // <Prism language={language || 'js'}>
      //   {value}
      // </Prism>
      <SyntaxHighlighter language={language || 'js'}>
        {value}
      </SyntaxHighlighter>
    );
  }
}

export default CodeBlock;