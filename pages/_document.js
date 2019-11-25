import React from 'react';
import Document, { Head, Main, NextScript } from 'next/document';
import { createGlobalStyle, ServerStyleSheet } from 'styled-components';
import { normalize } from 'polished';

// import theme from '../styled/theme';

export const GlobalStyle = createGlobalStyle`
  ${normalize}
  body, html{
    font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, Helvetica, Arial, sans-serif, "Apple Color Emoji", "Segoe UI Emoji", "Segoe UI Symbol";
  }
`;

export default class MyDocument extends Document {
  static async getInitialProps(ctx) {
    const initialProps = await Document.getInitialProps(ctx);
    const sheet = new ServerStyleSheet();
    const styleTags = sheet.getStyleElement();
    return { ...initialProps, styleTags };
  }

  render() {
    return (
      <html lang="en">
        <Head>
          <title>Credit Score</title>
          {this.props.styleTags}
        </Head>
        <body className="custom">
          <GlobalStyle />
          <Main />
          <NextScript />
        </body>
      </html>
    );
  }
}
