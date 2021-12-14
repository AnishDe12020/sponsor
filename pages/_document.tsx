import Document, {
  Html,
  Head,
  Main,
  NextScript,
} from "next/dist/pages/_document";

class MyDocument extends Document {
  render() {
    return (
      <Html lang="en">
        <Head>
          <meta
            name="keywords"
            content="Avneesh, Agarwal, Avneesh Agarwal, web dev, blogger, content creator"
          />
          <link rel="apple-touch-icon" href="/icon.svg"></link>
          <meta name="theme-color" content="#fff" />
        </Head>
        <body>
          <Main />
          <NextScript />
        </body>
      </Html>
    );
  }
}

export default MyDocument;
