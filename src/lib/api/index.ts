export const fetchRandomWord = async () => {
  return fetch("https://api.api-ninjas.com/v1/randomword", {
    headers: {
      "X-Api-Key": import.meta.env.VITE_RANDOM_WORD_API,
    },
  }).then((res) => res.json());
};
