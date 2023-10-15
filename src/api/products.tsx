const API_URL = "http://localhost:4000";

export const readProducts = async (text: string = "") => {
  try {
    const products = await fetch(`${API_URL}/products?name=${text}`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    });

    const result = products.json();
    if (!products.ok) throw new Error();
    return result;
  } catch (error) {
    console.log("getProducts error: ", error);
  }
};

export const updateProducts = async (body: any) => {
  try {
    const products = await fetch(`${API_URL}/products`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(body),
    });

    const result = products.json();
    if (!products.ok) throw new Error();
    return result;
  } catch (error) {
    console.log("updateProducts error: ", error);
  }
};
