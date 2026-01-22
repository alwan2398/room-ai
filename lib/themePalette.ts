import { parseThemeColors } from "@/constant/ThemesConst";

export function getThemePalette(style: string) {
  const colors = parseThemeColors(style);

  return [
    colors["background"],
    colors["foreground"],
    colors["card"],
    colors["card-foreground"],
    colors["popover"],
    colors["popover-foreground"],
    colors["primary"],
    colors["primary-foreground"],
    colors["secondary"],
    colors["secondary-foreground"],
    colors["muted"],
    colors["muted-foreground"],
    colors["accent"],
    colors["accent-foreground"],
    colors["destructive"],
    colors["destructive-foreground"],
    colors["border"],
    colors["input"],
    colors["ring"],
    colors["chart-1"],
    colors["chart-2"],
    colors["chart-3"],
    colors["chart-4"],
    colors["chart-5"],
  ].filter(Boolean);
}
