import { drizzle } from 'drizzle-orm/postgres-js';
import postgres from 'postgres';
import dotenv from 'dotenv';
import { foodsTable } from "./db";

dotenv.config({ path: ".env.local" });

const env = process.env;
const POSTGRES_CONNECTION_STRING = env.POSTGRES_CONNECTION_STRING;

if (!POSTGRES_CONNECTION_STRING || typeof POSTGRES_CONNECTION_STRING !== "string") {
    throw new Error("POSTGRES_CONNECTION_STRING not found on .env.local");
}

const categories = [
    {
        name: "Gemüse",
        list: [
            "Artischoke",
            "Avocado",
            "Blattgemüse",
            "Blumenkohl",
            "Brokkoli",
            "Brunnenkresse",
            "Butternusskürbis",
            "Chicorée",
            "Eichelkürbis",
            "Fenchel",
            "Grüne",
            "Grünkohl",
            "Gurke",
            "Karotten",
            "Kohl",
            "Kohlrabi",
            "Koriander",
            "Kräuter",
            "Kürbis",
            "Lauch",
            "Mangold",
            "Maniok",
            "Okra",
            "Oliven",
            "Pak choy",
            "Pastinaken",
            "Petersilie",
            "Pilze",
            "Radicchio",
            "Radieschen",
            "Römersalat",
            "Rosenkohl",
            "Rote",
            "Rucola",
            "Salat",
            "Schalotten",
            "Sellerie",
            "Sommerkürbis",
            "Spaghettikürbis",
            "Spargel",
            "Spinat",
            "Steckrübe",
            "Steckrüben",
            "Süßkartoffel",
            "Taro",
            "Thymian",
            "Winterkürbis",
            "Yambohne",
            "Zitronengras",
            "Zucchini",
            "Zwiebeln",
            "Zwiebeln",
        ]
    },
    {
        name: "Früchte",
        list: [
            "Kokosnuss",
            "Limetten",
            "Lychee",
            "Mandarinen",
            "Mango",
            "Melone",
            "Nektarinen",
            "Orangen",
            "Papaya",
            "Passionsfrucht",
            "Pfirsiche",
            "Pflaumen",
            "Preiselbeeren",
            "Rhabarber",
            "Sternfrucht",
            "Wassermelone",
            "Weintrauben",
            "Zitrusfrüchte",
            "Ananas",
            "Äpfel",
            "Aprikosen",
            "Bananen",
            "Birnen",
            "Blaubeeren",
            "Brombeeren",
            "Cantaloupe",
            "Datteln",
            "Erdbeeren",
            "Feigen",
            "Granatäpfel",
            "Grapefruit",
            "Guave",
            "Himbeeren",
            "Kaki",
            "Kirschen",
            "Kiwi",
            "Kochbananen"
        ]
    },
    {
        name: "Kräuter",
        list: [
            "Basilikum",
            "Dill",
            "Ingwer",
            "Knoblauch",
            "Koriander",
            "Kurkuma",
            "Lorbeerblatt",
            "Minze",
            "Petersilie",
            "Pfefferminze",
            "Rosmarin",
            "Safran",
            "Salbei",
            "Schnittlauch",
            "Thymian",
            "Zimt",
        ]
    },
    {
        name: "Proteine",
        list: [
            "Fisch",
            "Fleisch",
            "Meeresfrüchte",
        ],
    },
    {
        name: "Essig und Saures",
        list: [
            "Apfelessig",
            "Eingelegtes Gemüse",
            "Kimchi",
            "Kokosnuss-Joghurt",
            "Kokosnussmilch-Kefir",
            "Kombucha",
            "Rotweinessig",
            "Sauerkraut",
            "Wasser-Kefir",
        ]
    },
    {
        name: "Fette",
        list: [
            "Avocadoöl",
            "Kokosnuss-Butter",
            "Kokosnussöl",
            "Olivenöl",
            "Palmöl",
        ]
    },
    {
        name: "Sonstiges",
        list: [
            "Dattelzucker",
            "Getrocknete Früchte",
            "Grüner Tee",
            "Honig",
            "Johannisbrotpulver",
            "Kokosnuss-Aminos",
            "Kokosnuss-Zucker",
            "Kokosnussmehl",
            "Kräutertee",
            "Maniokmehl",
            "Pfeilwurzelstärke",
            "Tapiokastärke",
            "Tigernussmehl",
            "Wegerichmehl",
        ]
    }
];

async function main() {
    const client = postgres(POSTGRES_CONNECTION_STRING!);
    const db = drizzle(client, { logger: env.LOG_DB_QUERIES === "true" });
    const data: (typeof foodsTable.$inferInsert)[] = [];


    for (const category of categories) {
        for (const name of category.list) {
            data.push({
                category: category.name,
                name,
                allowed: true
            });
        }
    }

    console.log("Seed start");
    await db.insert(foodsTable).values(data);
    console.log("Seed done");
};

main();