import requests
import json
import re

month = "2025-11"
formatName = "gen9vgc2026regf"
rating = "1630"

url = f"https://www.smogon.com/stats/{month}/moveset/{formatName}-{rating}.txt"
usage_url = f"https://www.smogon.com/stats/{month}/chaos/{formatName}-{rating}.json"

response = requests.get(url)
usage_response = requests.get(usage_url)

raw_formatted = response.text
usage_data = usage_response.json()

blocks = raw_formatted.split("+----------------------------------------+")

raw = []

for b in blocks[1:]:
    lines = [l.strip() for l in b.split("\n") if l.strip()]
    
    for l in lines:
        l = l.strip("|").strip()
        raw.append(l)

data = {}
current_pokemon = None
ability_check = False
items_check = False
spreads_check = False
moves_check = False
tera_check = False
teammates_check = False

for i in range(len(raw)):
    if not current_pokemon and i + 1 < len(raw) and raw[i + 1].startswith("Raw count"):
        current_pokemon = raw[i]
        abilities = {}
        items = {}
        spreads = {}
        moves = {}
        tera = {}
        teammates = {}

    if raw[i] == "Abilities":
        ability_check = True
        continue
    if raw[i] == "Items":
        ability_check = False
        items_check = True
        continue
    if raw[i] == "Spreads":
        items_check = False
        spreads_check = True
        continue
    if raw[i] == "Moves":
        spreads_check = False
        moves_check = True
        continue
    if raw[i] == "Tera Types":
        moves_check = False
        tera_check = True
        continue
    if raw[i] == "Teammates":
        tera_check = False
        teammates_check = True
        continue
    if raw[i] == "Checks and Counters" and current_pokemon:
        teammates_check = False
        data[current_pokemon] = {
            "Usage": round(usage_data["data"][current_pokemon]["usage"] * 100, 3),
            "Abilities": abilities,
            "Items": items,
            "Spreads": spreads,
            "Moves": moves,
            "Tera Types": tera,
            "Teammates": teammates
        }
        current_pokemon = None

    if ability_check and current_pokemon:
        s = raw[i].rsplit(" ", 1)
        abilities[s[0]] = s[1]
        
    if items_check and current_pokemon:
        s = raw[i].rsplit(" ", 1)
        items[s[0]] = s[1]
    
    if spreads_check and current_pokemon:
        s = raw[i].rsplit(" ", 1)
        s[0] = s[0].strip()
        spreads[s[0]] = s[1]

    if moves_check and current_pokemon:
        s = raw[i].rsplit(" ", 1)
        s[0] = s[0].strip()
        moves[s[0]] = s[1]
    
    if tera_check and current_pokemon:
        s = raw[i].rsplit(" ", 1)
        s[0] = s[0].strip()
        tera[s[0]] = s[1]

    if teammates_check and current_pokemon:
        s = raw[i].rsplit(" ", 1)
        s[0] = s[0].strip()
        teammates[s[0]] = s[1]

with open("../data/pokemon.json", "r") as f:
    baseStats = json.load(f)

for pkmn in data.keys():
    data[pkmn]["Base Stats"] =  baseStats[pkmn.lower().replace(" ", "-")]["stats"]
    data[pkmn]["Types"] =  baseStats[pkmn.lower().replace(" ", "-")]["types"]

outputFile = f"{formatName}_{rating}.json"

with open(outputFile, "w", encoding="utf-8") as f:
    json.dump(data, f, indent=2, ensure_ascii=False)
