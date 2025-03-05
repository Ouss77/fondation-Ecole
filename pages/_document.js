import Document, { Html, Head, Main, NextScript } from 'next/document';

class MyDocument extends Document {
  render() {
    const currentLanguage = 'en'; // Or dynamically set based on user preference

    return (
      <Html lang={currentLanguage}>
        <Head>
          <meta charSet="UTF-8" />
          <meta name="description" content="Welcome to the AF3M website. Discover news, activities, and partners in the mechanical field." />
          <meta property="og:title" content="Home - AF3M" />
          <meta property="og:description" content="Explore the latest news, activities, and partnerships of AF3M." />
          <meta property="og:image" content="https://af3m-assoc.org/wp-content/uploads/2022/10/Capture-de%CC%81cran-2022-10-06-a%CC%80-10.09.14.png" />
          <meta property="og:url" content="https://af3m-assoc.org/" />
          <meta property="og:type" content="website" />
          {/* Remove this line: {this.props.styles} */}
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