

export const fetchData = async (url, options) => {
  const response = await fetch(url, options);
  const data = await response.json();
  console.log(data, "data");
  return data;
};
