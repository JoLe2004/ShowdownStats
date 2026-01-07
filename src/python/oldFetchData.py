import requests
import json

month = "2025-11"
formatName = "gen9vgc2026regf"
rating = "1760"

url = f"https://www.smogon.com/stats/{month}/chaos/{formatName}-{rating}.json"

response = requests.get(url)
response.raise_for_status()

data = response.json()

def normalize_stats(stats, top_n=None, round_decimals=3, min_percent=0):
    normalized = {"Usage": round(stats["usage"]*100, 2)}
    total = sum(stats["Abilities"].values())

    for section, data in stats.items():
        if not isinstance(data, dict) or not data:
            continue
        
        if section == "Checks and Counters":
            continue

        sortedItems = sorted(data.items(), key=lambda x: x[1], reverse=True)

        if top_n:
            sortedItems = sortedItems[:top_n]

        section_percent = {}
        for key, value in sortedItems:
            percent = (value / total) * 100
            if percent >= min_percent:
                section_percent[key] = round(percent, round_decimals)
        
        normalized[section] = section_percent

    return normalized

for pokemon, stats in data["data"].items():
    normalized = normalize_stats(stats, top_n=20, round_decimals=3, min_percent=0.5)
    data["data"][pokemon] = normalized

outputFile = "gen9vgc2026regf.json"

with open(outputFile, "w", encoding="utf-8") as f:
    json.dump(data, f, indent=2, ensure_ascii=False)

print("Saved data to json")

'''
for pokemon, stats in data["data"].items():
    normalized = normalize_stats(stats, top_n=20, round_decimals=2, min_percent=0.01)
    print(f"\n{pokemon}")
    for section, values in normalized.items():
        print(f"--- {section} ---")
        for k, v in values.items():
            print(f"{k}: {v}%")
'''