import abilities from "../data/abilities.json"
import items from "../data/items.json"
import moves from "../data/moves.json"

export default function Tooltip({ title, tooltip }) {
    if (!tooltip.visible || tooltip.element.trim() === "Other") return null
    if (tooltip.element.trim() === "Nothing") return null
    if (title !== "Moves" && title !== "Items" && title !== "Abilities") return null

    let text
    if (title === "Abilities") {
        text = abilities[tooltip.element.trim().toLowerCase().split(" ").join("-").replace("'", "")]
    }

    if (title === "Items") {
        text = items[tooltip.element.trim().toLowerCase().split(" ").join("-").replace("'", "")]
    }

    let move
    if (title === "Moves") {
        move = moves[tooltip.element.trim().toLowerCase().split(" ").join("-").replace("'", "")]
        text = move["effect"]
    }

    if (title === "Abilities" || title === "Items") {
        return (
            <div
                className="fixed w-lg z-10 max-h-fit p-2 bg-black text-white text-sm pointer-events-none opacity-90"
                style={{ left: tooltip.x + 10, top: tooltip.y + 10 }}>
                {text}
            </div>
        )
    }

    if (title === "Moves") {
        return (
            <div
                className="fixed w-lg z-10 max-h-fit p-2 bg-black text-white text-sm pointer-events-none opacity-90"
                style={{ left: tooltip.x + 10, top: tooltip.y + 10 }}>
                <div className="flex items-center gap-2">
                    <span className={`type ${move["type"]}`}></span>
                    <div>({move["damage-class"] && move["damage-class"].charAt(0).toUpperCase() + move["damage-class"].slice(1)})</div>
                </div>
                <div>Power: {move["power"] ? move["power"] : "N/A"}</div>
                <div>Accuracy: {move["accuracy"] ? move["accuracy"] : "N/A"}</div>
                <div>PP: {move["pp"] ? move["pp"] : "N/A"}</div>
                <div>Priority: {move["priority"]}</div>
                {text}
            </div>
        )
    }
}