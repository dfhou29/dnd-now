import { sql } from "@vercel/postgres";
import { NextResponse } from "next/server";

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);

  console.log("search params", searchParams);

  const name = searchParams.get("name");
  const race = searchParams.get("race");
  const rank = searchParams.get("rank");
  const background = searchParams.get("background");
  const alignment = searchParams.get("alignment");
  const armor_class = searchParams.get("armorClass");
  const level = searchParams.get("level");
  const age = searchParams.get("age");
  const height = searchParams.get("height");
  const weight = searchParams.get("weight");
  const eyes = searchParams.get("eyes");
  const skin = searchParams.get("skin");
  const hair = searchParams.get("hair");
  const hit_points = searchParams.get("hitPoints");
  const hit_dice = searchParams.get("hitDice");
  const ability_scores = searchParams.get("abilityScores");
  const proficiencies = searchParams.get("proficiencies");
  const racial_traits = searchParams.get("racialTraits");
  const class_features = searchParams.get("classFeatures");
  const equipments = searchParams.get("equipments");
  const spells = searchParams.get("spells");
  const personality = searchParams.get("personality");
  const ideals = searchParams.get("ideals");
  const bonds = searchParams.get("bonds");
  const flaws = searchParams.get("flaws");
  const backstory = searchParams.get("backstory");
  const user_id = searchParams.get("user_id");

  try {
    if (!name) throw new Error("Name required");
    if (!race) throw new Error("Race required");
    if (!rank) throw new Error("Rank required");
    if (!level) throw new Error("level required");

    const result =
      await sql`INSERT INTO characters (name, race, rank, background, alignment, level, armor_class, age, height, weight, eyes, skin, hair, hit_points, hit_dice, ability_scores, proficiencies, racial_traits, class_features, equipments, spells, personality, ideals, bonds, flaws, backstory, user_id) VALUES 
    (${name}, ${race}, ${rank}, ${background}, ${alignment}, ${level}, ${armor_class}, ${age}, ${height}, ${weight}, ${eyes}, ${skin}, ${hair}, ${hit_points}, ${hit_dice}, ${ability_scores}, ${proficiencies}, ${racial_traits}, ${class_features}, ${equipments}, ${spells}, ${personality}, ${ideals}, ${bonds}, ${flaws}, ${backstory}, ${user_id})
    RETURNING id, user_id;`;

    console.log("Insert Result: ", result);
    const characters = await sql`SELECT * FROM characters;`;
    return NextResponse.json(
      {
        id: result["rows"][0]["id"],
        user_id: result["rows"][0]["user_id"],
      },
      { status: 200 }
    );
  } catch (error) {
    console.error("Error:", error.message);
    return NextResponse.json({ error }, { status: 500 });
  }
}
