export function replacePlaceholders(text: string, replacements: string[]) {
  let currentIndex = 0;
  return text.replace(/\{(.*?)\}/g, (match) => {
    if (currentIndex < replacements.length) {
      currentIndex++;
      return replacements[currentIndex - 1];
    } else {
      return match;
    }
  });
}
