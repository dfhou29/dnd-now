import OpenAI from "openai";

export async function POST(req: Request) {
  const body = await req.json();
  const { race, background, rank, alignment, level } = body;

  const openai = new OpenAI({
    apiKey: process.env.OPENAI_API_KEY,
  });

  const prompt = `
Given the preferences listed below, generate a detailed Dungeons & Dragons 5e character sheet in the format of a single JSON object. If any preference is set to 'random', select an appropriate value that fits within the D&D 5e setting. Always assign an appropriate name when generating a character.

Expected JSON Format:
{
  "name": "Character Name",
  "race": "Character Race",
  "rank": "Character Class",
  "background": "Character Background",
  "alignment": "Character Alignment",
  "level": Character Level,
  "abilityScores": {
    "strength": Value,
    "dexterity": Value,
    "constitution": Value,
    "intelligence": Value,
    "wisdom": Value,
    "charisma": Value
  },
  "hitPoints": Value,
  "hitDice": "Dice Format",
  "proficiencies": ["Proficiency1", "Proficiency2", ...],
  "racialTraits": ["Trait1", "Trait2", ...],
  "classFeatures": ["Feature1", "Feature2", ...],
  "equipments": ["Equipment1", "Equipment2", ...],
  "spells": ["Spell1", "Spell2", ...],
  "personality": "Personality Description"(~30 words),
  "ideals": "Ideals Description"(~30 words),
  "bonds": "Bonds Description"(~20 words),
  "flaws": "Flaws Description"(~20 words),
  "backstory": "Character Backstory"(~30 words),
  "age": "Age",
  "height": "Height",
  "weight": "Weight",
  "eyes": "Eye Color",
  "skin": "Skin Tone",
  "hair": "Hair Color"
}

Your Preferences:
- Race: ${race}
- Class: ${rank}
- Background: ${background}
- Alignment: ${alignment}
- Level: ${level}
`;

  const chatCompletion = await openai.chat.completions.create({
    messages: [{ role: "user", content: prompt }],
    model: "gpt-3.5-turbo",
    temperature: 0.2,
  });

  const response = chatCompletion?.choices[0].message.content;
  console.log(response);
  const character = response?.replace(/^Output: \s*/, "");

  if (character) {
    return new Response(character, {
      headers: { "Content-Type": "application/json" },
    });
  } else {
    return new Response("Failed to generate character.", {
      status: 500,
      headers: { "Content-Type": "application/json" },
    });
  }
}