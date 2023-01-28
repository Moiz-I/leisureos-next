import Head from "next/head";
import Image from "next/image";
import { Inter } from "@next/font/google";
import styles from "@/styles/Home.module.css";
import MovieGrid from "@/src/MovieGrid";
import Link from "next/link";

import { GlobalProvider, GlobalContext } from "../context/GlobalState";
import React, { useEffect, useContext, useState, useCallback } from "react";
// import { AppWrapper } from "@/context/AppContext";
import useLocalStorage from "use-local-storage";

const inter = Inter({ subsets: ["latin"] });

export async function getServerSideProps(context) {
  if (context.query.title) {
    console.log("INSODE");
    const id = context.query.title ? context.query.title : "";
    const region = context.query.region ? context.query.region : "";

    var locale = region;
    var type = "show";
    var n = 1;
    const q = id;
    const res = await fetch(
      "https://apis.justwatch.com/content/titles/" +
        locale +
        '/popular?body={"page_size":' +
        n +
        ',"page":1,"query":"' +
        q.split(" ").join("+") +
        '","content_types":["' +
        type +
        '"]}'
    );
    const data = id == "" ? "" : await res.json();

    return {
      props: { show: data, id: id },
    };
  }
  return { props: {} };
}

export default function Home({ show, id }) {
  return (
    <GlobalProvider>
      <Head>
        <title>LeisureOS</title>
        <meta
          name="description"
          content="A visual bookmarker for your fav shows"
        />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link
          rel="icon"
          href="data:image/svg+xml,<svg xmlns=%22http://www.w3.org/2000/svg%22 viewBox=%220 0 100 100%22><text y=%22.9em%22 font-size=%2290%22>🤤</text></svg>"
        />
      </Head>
      <main className={styles.main}>
        <MovieGrid links={show} />
        <a className="promo-container" href="https:/twitter.com/Moiz_zzz">
          <p className="promo">Built with 💛 by Moiz</p>
        </a>
      </main>
    </GlobalProvider>
  );
}
