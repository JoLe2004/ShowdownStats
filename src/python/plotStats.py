import matplotlib.pyplot as plt
import json

raw_file = "gen9vgc2026regf.json"

with open(raw_file, "r") as f:
    data = json.load(f)

pokemon = "Urshifu-Rapid-Strike"
poke_data = data[pokemon]

def parsePercentDict(d):
    return {k.strip(): float(v.replace("%", "")) for k, v in d.items()}

items = parsePercentDict(poke_data["Items"])

plt.figure(figsize=(8, 5))
plt.barh(items.keys(), items.values())
plt.title(f"{pokemon} - Item Usage")
plt.xlabel("Usage %")
plt.show()
