import "@/styles/globals.css";
import "./lib/font-awesome/css/all.min.css";
import Script from "next/script";

export default function App({ Component, pageProps }) {
  return (
    <>
      {/* <!-- Global site tag (gtag.js) - Google Analytics --> */}
      <Script
        src="https://www.googletagmanager.com/gtag/js?id=G-C6MRCXCQX7"
        strategy="afterInteractive"
      />
      <Script id="google-analytics" strategy="afterInteractive">
        {`
          window.dataLayer = window.dataLayer || [];
          function gtag(){window.dataLayer.push(arguments);}
          gtag('js', new Date());

          gtag('config', 'G-C6MRCXCQX7');
        `}
      </Script>
      <Component {...pageProps} />
    </>
  );
}
