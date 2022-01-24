import { AppProps } from "next/app";
import "../styles/globals.css";
import { NextSeo } from "next-seo";
import data from "../public/data.json";

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <>
      <NextSeo
        title={`Sponsor ${data.name}`}
        titleTemplate={`Sponsor ${data.name}`}
        defaultTitle={`Sponsor ${data.name}`}
        description={`A website for sponsoring ${data.name}`}
        canonical="https://www.avneesh.tech/"
        openGraph={{
          url: "https://www.avneesh.tech/",
          title: `Sponsor ${data.name}`,
          description: `A website for sponsoring ${data.name}`,
          images: [
            {
              url: "/og-image.png",
              width: 800,
              height: 420,
              alt: `Sponsor ${data.name}`,
            },
          ],
        }}
        twitter={{
          handle: "@avneesh0612",
          site: "@avneesh0612",
          cardType: "summary_large_image",
        }}
      />
      <Component {...pageProps} />
    </>
  );
}

export default MyApp;
