export interface ParsedPlan {
  type: "daily" | "weekly";
  wordsGoal: number;
  lessonsGoal: number;
}

export function parsePlanText(text: string): ParsedPlan {
  const lower = text.toLowerCase();

  // Detect weekly
  const type: "daily" | "weekly" = /hafta/i.test(lower) ? "weekly" : "daily";

  // Extract words goal: "20 ta so'z", "20 soz", "20ta so'z"
  const wordsMatch = lower.match(/(\d+)\s*(?:ta\s+)?so['\u2018\u2019]?z/);
  const wordsGoal = wordsMatch ? parseInt(wordsMatch[1], 10) : 0;

  // Extract lessons goal: "5 ta dars", "5 dars", "5ta dars"
  const lessonsMatch = lower.match(/(\d+)\s*(?:ta\s+)?dars/);
  const lessonsGoal = lessonsMatch ? parseInt(lessonsMatch[1], 10) : 0;

  return { type, wordsGoal, lessonsGoal };
}

export function getPlanEndDate(startDate: string, type: "daily" | "weekly"): string {
  if (type === "daily") return startDate;

  const date = new Date(startDate);
  date.setDate(date.getDate() + 6);
  return date.toISOString().split("T")[0];
}
