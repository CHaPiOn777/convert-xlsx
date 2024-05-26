import React from "react";
import { replacePlaceholders } from "../utils/replacePlaceholders";

export const readFileFromUrl = async (url: string) => {
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

export const readFile = async (url: string, replacements?: string[]) => {
  try {
    const content = await readFileFromUrl(url);
    const { description } = extractDataFromHTML(content as string);
    const dataIsMatch = description
      ?.match(/\{[^}]+\}/g)
      ?.map((item) => item.slice(1, -1).split("-"));
    if (replacements && description) {
      const updatedText = replacePlaceholders(description, replacements);
      return updatedText.split("\u000b");
    }
    return dataIsMatch;
  } catch (error) {
    console.error("Ошибка:", error);
  }
};
export const file = async (url: string) =>
  await (await fetch(url)).arrayBuffer();
