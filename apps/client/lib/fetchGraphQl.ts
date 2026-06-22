import { BACKEND_URL } from "./constants";

export const fetchGraphQl = async (query: string, variable = {}) => {
  const response = await fetch(`${BACKEND_URL}/graphql`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      query,
      variable,
    }),
  });

  const result = await response.json();
  if (result.errors) {
    console.error("GraphQL Error: ", result.errors);
    throw new Error("Failed to fetch the data from GraphQL");
  }

  return result.data;
};
