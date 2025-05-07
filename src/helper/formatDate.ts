export const formatDate = (date: string) => {
  const newDate = new Date(date);

  const formatted = newDate.toLocaleDateString("mx-MX");

  const final = formatted.replace(/\//g, "/");

  return final;
};
