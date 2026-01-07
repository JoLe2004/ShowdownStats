
export default function BaseStats({ data }) {
    const MAX_STAT = 255
    const statMapping = {
        "hp": "HP",
        "atk": "Atk",
        "def": "Def",
        "spa": "SpA",
        "spd": "SpD",
        "spe": "Spe"
    }

    return (
        <>
            <div className="flex flex-col items-center w-fit">
                <h2 className="mb-2 text-2xl font-bold">Base Stats</h2>
                <div className="flex flex-col justify-center w-80 h-60 md:w-100 p-4 bg-list [box-shadow:8px_8px_24px_rgba(0,0,0,0.9)]">
                    {Object.entries(data).map(([key, value]) => {
                        let bg
                        switch (key) {
                            case "hp":
                                bg = "bg-hp"
                                break
                            case "atk":
                                bg = "bg-atk"
                                break
                            case "def":
                                bg = "bg-def"
                                break
                            case "spa":
                                bg = "bg-spa"
                                break
                            case "spd":
                                bg = "bg-spd"
                                break
                            case "spe":
                                bg = "bg-spe"
                                break
                        }

                        return <div key={key} className="flex items-center">
                            <span className="w-10">{statMapping[key]}</span>
                            <div className="w-full h-8 mx-2">
                                <span
                                    className={`h-full inline-block transition-[width] ease-in-out ${bg}`}
                                    style={{ width: `${(value / MAX_STAT) * 100}%` }}>
                                </span>
                            </div>
                            <span className="inline-block w-10 text-right">{value}</span>
                        </div>
                    })}
                </div>
            </div>
        </>
    )
}