

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
           "https://freetestapi.com/api/v1/products",myInit
        ).then((response) => response.json());

        return response;
    } catch (error) {
        console.log({ error });
    }
}
