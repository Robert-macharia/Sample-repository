type FoodAnalysis = {
  caloriesEstimate: number;
  sugar: number; // 0-100
  salt: number; // 0-100
  fiber: number; // 0-100
  protein: number; // 0-100
  overallScore: number; // 0-100
  notes: string[];
};

export async function analyzeFoodImage(_imageBytes: Buffer | null, descriptionHint?: string): Promise<FoodAnalysis> {
  // Stubbed analysis—replace with actual Gemini API integration.
  const seed = (descriptionHint || 'food').length;
  const clamp = (n: number) => Math.max(0, Math.min(100, Math.round(n)));
  const sugar = clamp((seed * 13) % 100);
  const salt = clamp((seed * 7) % 100);
  const fiber = clamp(100 - ((seed * 11) % 100));
  const protein = clamp((seed * 17) % 100);
  const base = clamp(60 + fiber / 5 - sugar / 8 - salt / 10 + protein / 6);
  return {
    caloriesEstimate: 300 + (seed * 23) % 250,
    sugar,
    salt,
    fiber,
    protein,
    overallScore: clamp(base),
    notes: [
      fiber > 50 ? 'Good fiber content' : 'Consider adding more fiber',
      sugar > 60 ? 'High sugar, consider reducing sweets' : 'Sugar level is reasonable',
      salt > 60 ? 'High sodium, watch salt intake' : 'Sodium level acceptable'
    ],
  };
}

export async function summarizeJournalText(text: string): Promise<string> {
  // Stub summarization. Replace with Gemini when API key available.
  if (!text || text.trim().length < 20) {
    return 'Short entry. Mood seems neutral to positive.';
  }
  return `Summary: ${text.slice(0, 120)}${text.length > 120 ? '…' : ''}`;
}

export async function suggestPersonalizedActivities(mood: string): Promise<string[]> {
  const lower = (mood || '').toLowerCase();
  if (lower.includes('tired')) return ['Short walk', 'Hydration reminder', 'Light music session'];
  if (lower.includes('anxious')) return ['Breathing exercise', 'Call a family member', 'Listen to calming music'];
  return ['15-min walk', 'Memory game session', 'Write a brief journal entry'];
}