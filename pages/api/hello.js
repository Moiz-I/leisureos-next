// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import React, { useEffect, useContext, useState } from "react";
import axios from "axios";

//let selectedShow = useContext(AppWrapper);

export async function getData() {
  var locale = "en_GB";
  var type = "show";
  var n = 1;
  const q = "";
  var data = await axios.get(
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
  //const jsonData = await data.json()
  return data.data;
}

export default async function handler(req, res) {
  const jsonData = await getData();
  res.status(200).json(jsonData);
}

// export default async function handler(res) {
//   const jsonData = await getData();
//   res.status(200).json(jsonData);
// }
