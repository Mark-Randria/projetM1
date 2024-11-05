// Pour mettre la premiere lettre majuscule
export const capitalizeFirstLetter = (string: string) => {
  if (!string) return ""; // Gérer les cas où la chaîne est vide ou nulle
  return string.charAt(0).toUpperCase() + string.slice(1).toLowerCase();
};
