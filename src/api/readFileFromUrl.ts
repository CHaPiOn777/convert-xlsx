const readFileFromUrl = async (url: string) => {
  try {
    const response = await fetch(url);
    const blob = await response.blob();

    return new Promise((resolve, reject) => {
      const fileReader = new FileReader();
      fileReader.onload = () => resolve(fileReader.result);
      fileReader.onerror = reject;
      fileReader.readAsText(blob);
    });
  } catch (error) {
    console.error("Ошибка при чтении файла:", error);
    return null;
  }
};

const extractDataFromHTML = (htmlContent: string) => {
  const parser = new DOMParser();
  const doc = parser.parseFromString(htmlContent, "text/html");

  // Извлечение метаданных
  const metaDescription = doc?.querySelector('meta[property="og:description"]');
  const description = metaDescription
    ? metaDescription.getAttribute("content")
    : null;

  return { description };
};

export const readFile = (url: string) => {
  readFileFromUrl(url)
    .then((content) => {
      const { description } = extractDataFromHTML(content as string);
      const dataInCurlyBraces = description?.match(/\{[^}]+\}/g);
      return console.log(dataInCurlyBraces);
      // Дальнейшая обработка содержимого файла
    })
    .catch((error) => {
      console.error("Ошибка:", error);
    });
};
