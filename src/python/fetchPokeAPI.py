import requests
import json
import time

BASE_URL = "https://pokeapi.co/api/v2"
OUTPUT_FILE = "pokemon.json"

STAT_MAP = {
    "hp": "hp",
    "attack": "atk",
    "defense": "def",
    "special-attack": "spa",
    "special-defense": "spd",
    "speed": "spe"
}

def get_all_pokemon():
    pokemon = {}

    response = requests.get(f"{BASE_URL}/pokemon?limit=2500")
    response.raise_for_status()

    data = response.json()

    for pkmn in data["results"]:
        stats = {}
        types = []
        pokemon_data = requests.get(pkmn["url"]).json()

        for stat in pokemon_data["stats"]:
            key = STAT_MAP[stat["stat"]["name"]]
            stats[key] = stat["base_stat"]
        
        for t in pokemon_data["types"]:
            types.append(t["type"]["name"])
        
        pokemon[pokemon_data["name"]] = {"stats": stats, "types": types}

        print(pokemon[pokemon_data["name"]])

        time.sleep(0.1)

    return pokemon

def get_all_abilities():
    abilities = {}

    response = requests.get(f"{BASE_URL}/ability?limit=1000")
    response.raise_for_status()

    data = response.json()

    for ability in data["results"]:
        ability_data = requests.get(ability["url"]).json()

        for entry in ability_data["effect_entries"]:
            if entry["language"]["name"] == "en":
                effect = entry["effect"]

        abilities[ability_data["name"]] = " ".join(effect.split()) if effect else None
        print(abilities[ability_data["name"]])

        time.sleep(0.1)

    return abilities

def get_all_items():
    items = {}

    response = requests.get(f"{BASE_URL}/item?limit=2500")
    response.raise_for_status()

    data = response.json()

    for item in data["results"]:
        item_data = requests.get(item["url"]).json()

        for entry in item_data["effect_entries"]:
            if entry["language"]["name"] == "en":
                effect = entry["effect"]

        items[item_data["name"]] = " ".join(effect.split()) if effect else None
        print(items[item_data["name"]])

        time.sleep(0.1)

    return items

def get_all_moves():
    moves = {}

    response = requests.get(f"{BASE_URL}/move?limit=1000")
    response.raise_for_status()

    data = response.json()

    for move in data["results"]:
        move_data = requests.get(move["url"]).json()
        meta_data = {}

        for entry in move_data["effect_entries"]:
            if entry["language"]["name"] == "en":
                effect = entry["effect"]

        if not move_data["effect_entries"]:
            for entry in move_data["flavor_text_entries"]:
                if entry["language"]["name"] == "en":
                    effect = entry["flavor_text"]

        meta_data["effect"] = " ".join(effect.split()) if effect else None
        meta_data["damage-class"] = move_data["damage_class"]["name"]
        meta_data["type"] = move_data["type"]["name"]
        meta_data["power"] = move_data["power"]
        meta_data["accuracy"] = move_data["accuracy"]
        meta_data["pp"] = move_data["pp"]
        meta_data["priority"] = move_data["priority"]
        moves[move_data["name"]] = meta_data
        print(move_data["name"])

        time.sleep(0.1)

    return moves

pokemon = get_all_pokemon()

with open(OUTPUT_FILE, "w", encoding="utf-8") as f:
    json.dump(pokemon, f, indent=2, ensure_ascii=False)

print(f"Saved {len(items)} pokemon to {OUTPUT_FILE}")
