import "@/styles/globals.css";
import "./lib/font-awesome/css/all.min.css";
import Script from "next/script";

export default function App({ Component, pageProps }) {
  return (
    <>
      <script
        async
        src="https://www.googletagmanager.com/gtag/js?id=G-C6MRCXCQX7"
      ></script>
      <script>
        window.dataLayer = window.dataLayer || []; function gtag()
        {dataLayer.push(arguments)}
        gtag('js', new Date()); gtag('config', 'G-C6MRCXCQX7');
      </script>
      <Component {...pageProps} />
    </>
  );
}
