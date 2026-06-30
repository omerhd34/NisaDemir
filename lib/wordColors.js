/** Microsoft Word varsayılan Office 2013+ renk paleti */

export const WORD_COLOR_AUTOMATIC = {
 label: "Otomatik",
 value: "",
 hint: "Otomatik",
 swatch: "#000000",
};

// Tema renkleri — 10 sütun × 6 satır
export const WORD_THEME_COLORS = [
 ["#FFFFFF", "#000000", "#E7E6E6", "#44546A", "#4472C4", "#ED7D31", "#FFC000", "#70AD47", "#5B9BD5", "#C00000"],
 ["#F2F2F2", "#7F7F7F", "#D0CECE", "#D6DCE4", "#D9E2F3", "#FBE5D6", "#FFF2CC", "#E2EFDA", "#DEEBF7", "#FCE4D6"],
 ["#D9D9D9", "#595959", "#AEABAB", "#ADB9CA", "#B4C6E7", "#F8CBAD", "#FFE699", "#C5E0B4", "#BDD7EE", "#F8CBAD"],
 ["#BFBFBF", "#3F3F3F", "#757070", "#8496B0", "#8FAADC", "#F4B084", "#FFD966", "#A9D18E", "#9DC3E6", "#F4B084"],
 ["#A5A5A5", "#262626", "#3A3838", "#333F50", "#2F5597", "#C65911", "#BF8F00", "#538135", "#2E75B6", "#953735"],
 ["#7F7F7F", "#0D0D0D", "#161616", "#222A35", "#1F3864", "#843C0C", "#806000", "#385723", "#1E4E79", "#632523"],
].flat();

// Standart renkler — Word alt satırı
export const WORD_STANDARD_COLORS = [
 "#C00000",
 "#FF0000",
 "#FFC000",
 "#FFFF00",
 "#92D050",
 "#00B050",
 "#00B0F0",
 "#0070C0",
 "#002060",
 "#7030A0",
];

export const WORD_ALL_COLORS = [...WORD_THEME_COLORS, ...WORD_STANDARD_COLORS];

const WORD_COLOR_SET = new Set(WORD_ALL_COLORS.map((hex) => hex.toUpperCase()));

export function normalizeHexColor(input) {
 if (!input?.trim()) return "";

 const withHash = input.trim().startsWith("#") ? input.trim() : `#${input.trim()}`;

 if (/^#[0-9A-Fa-f]{6}$/.test(withHash)) {
  return withHash.toUpperCase();
 }

 if (/^#[0-9A-Fa-f]{3}$/.test(withHash)) {
  const [, r, g, b] = withHash;
  return `#${r}${r}${g}${g}${b}${b}`.toUpperCase();
 }

 return null;
}

export function isWordPaletteColor(hex) {
 return Boolean(hex && WORD_COLOR_SET.has(hex.toUpperCase()));
}

export function buildWordTextColors() {
 return [
  WORD_COLOR_AUTOMATIC,
  ...WORD_ALL_COLORS.map((hex, index) => ({
   label: `Renk ${index + 1}`,
   value: hex,
   hint: hex,
  })),
 ];
}
