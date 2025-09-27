/**
 * Removes emoji characters from a string.
 * @param text The input string.
 * @returns The string with emojis removed.
 */
export const stripEmojis = (text: string): string => {
  // A comprehensive regex to match most emoji characters, including symbols, pictographs, and transport/map symbols.
  const emojiRegex = /(\u00a9|\u00ae|[\u2000-\u3300]|\ud83c[\ud000-\udfff]|\ud83d[\ud000-\udfff]|\ud83e[\ud000-\udfff])/g;
  return text.replace(emojiRegex, '');
};
