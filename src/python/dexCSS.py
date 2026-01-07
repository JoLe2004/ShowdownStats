import requests

output_file = "pokemon-dex.css"

max_pokemon = 1025

css_lines = []

for dex_number in range(1, max_pokemon + 1):
    url = f"https://pokeapi.co/api/v2/pokemon-species/{dex_number}/"
    response = requests.get(url)
    print(url)
    if response.status_code == 200:
        data = response.json()
        name = data["name"].lower().replace(" ", "-").replace(".", "").replace("'", "")
        css_line = f".pokesprite.{name} {{ --dex: {dex_number}; }}"
        css_lines.append(css_line)
    else:
        print(f"Warning: Could not fetch Pokémon #{dex_number}")

with open(output_file, "w", encoding="utf-8") as f:
    f.write("\n".join(css_lines))

print(f"Generated {len(css_lines)} CSS entries in {output_file}")
