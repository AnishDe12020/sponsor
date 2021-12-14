import { AppProps } from "next/app";
import "../styles/globals.css";
import { NextSeo } from "next-seo";

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <>
      <NextSeo
        title="Sponsor Avneesh"
        titleTemplate="Sponsor Avneesh"
        defaultTitle="Sponsor Avneesh"
        description="A website for sponsoring Avneesh"
        canonical="https://www.avneesh.tech/"
        openGraph={{
          url: "https://www.avneesh.tech/",
          title: "Sponsor Avneesh",
          description: "A website for sponsoring Avneesh",
          images: [
            {
              url: "/og-image.png",
              width: 800,
              height: 420,
              alt: "Sponsor Avneesh",
            },
          ],
          profile: {
            firstName: "Avneesh",
            gender: "Male",
            lastName: "Agarwal",
            username: "avneesh0612",
          },
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
