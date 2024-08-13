import React from "react";

export const fetchAllProducts = async () => {
  const myHeaders = new Headers();
  myHeaders.append("Content-Type", "application/json");

  const myInit: RequestInit = {
    method: "GET",
    headers: myHeaders,
    mode: "cors",
  };

  try {
    const response = await fetch(
      "https://fakestoreapi.com/products",
      myInit
    ).then((response) => response.json());

    return response;
  } catch (error) {
    console.log({ error });
  }
};
export const fetchSingleProducts = async ({id}:any) => {


  try {
    if(id){
      const response = await fetch(`https://fakestoreapi.com/products/${id}`).then(
        (res) => res.json()
      );
      return response;
    }

   
  } catch (error) {
    console.log( "fetching single product",error );
  }
};
