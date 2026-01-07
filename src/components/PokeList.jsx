import { useState } from "react"

export default function PokeList({ data, setCurrentPkmn, setFormat, setRating }) {
    const [search, setSearch] = useState("")
    const [isOpen, setIsOpen] = useState(false)

    const filteredData = Object.entries(data).filter(([pkmn]) =>
        pkmn.toLowerCase().includes(search.toLowerCase())
    )

    return (
        <>
            <div className="fixed z-50 right-0 m-4">
                <button onClick={() => setIsOpen(!isOpen)} className="flex md:hidden flex-col justify-center w-6 h-6 gap-1">
                    {isOpen ? <div className="text-gray-400 text-3xl font-extrabold">X</div> :
                        <>
                            <span className="w-6 h-2 bg-gray-400 rounded-sm"></span>
                            <span className="w-6 h-2 bg-gray-400 rounded-sm"></span>
                            <span className="w-6 h-2 bg-gray-400 rounded-sm"></span>
                        </>}
                </button>
            </div>

            <div
                onClick={() => setIsOpen(!isOpen)}
                className={`fixed w-screen h-screen z-10 bg-black opacity-40 ${!isOpen && "hidden"}`}>
            </div>

            <div className={`fixed top-0 right-0 z-40 transition-transform duration-300 md:static md:translate-x-0 md:transition-none ${isOpen ? "translate-x-0" : "translate-x-full"}`}>
                <div className="flex flex-col h-screen bg-background text-white">
                    <div className="flex flex-col px-2 m-2 mb-4 gap-4 ">
                        {/* Format Selector */}
                        <select
                            onChange={(e) => { setFormat(e.target.value) }}
                            className="p-2 border text-sm bg-background">
                            <option value={`vgc_gen_9_2026_regulation_f_december_2025`}>[VGC] Gen 9 2026 Regulation F (12/25)</option>
                            <option value={`vgc_gen_9_2026_regulation_f_november_2025`}>[VGC] Gen 9 2026 Regulation F (11/25)</option>
                        </select>

                        {/* Rating */}
                        <div className="flex justify-center gap-2">
                            <button onClick={() => setRating("0")} className="w-14 border rounded-2xl cursor-pointer">0+</button>
                            <button onClick={() => setRating("1500")} className="w-14 border rounded-2xl cursor-pointer">1500+</button>
                            <button onClick={() => setRating("1630")} className="w-14 border rounded-2xl cursor-pointer">1630+</button>
                            <button onClick={() => setRating("1760")} className="w-14 border rounded-2xl cursor-pointer">1760+</button>
                        </div>

                        {/* Pokemon Search */}
                        <input
                            placeholder="Search for a Pokémon"
                            value={search}
                            onChange={(e) => { setSearch(e.target.value) }}
                            className="px-2 py-1 border">
                        </input>
                    </div>

                    {/* Pokemon List */}
                    <div className="flex flex-col overflow-y-auto border-t">
                        {filteredData.map(([pkmn, info], index) => {
                            const bg = index % 2 === 0 ? "bg-itemOne" : "bg-itemTwo"
                            return <button
                                key={pkmn}
                                onClick={() => setCurrentPkmn(pkmn)}
                                className={`flex items-center p-4 cursor-pointer text-sm ${bg} hover:bg-hover transition-colors ease-in`}>
                                <span className="flex items-center w-10 h-6">
                                    <span className={`pokesprite pokemon ${pkmn.replace(" ", "-").replace(".", "").toLowerCase()}`}></span>
                                </span>
                                <div className="flex justify-between w-full">
                                    <span>{pkmn}</span>
                                    <span>{`${info.Usage}%`}</span>
                                </div>
                            </button>
                        })}
                    </div>
                </div>
            </div>
        </>
    )
}