import { useState } from "react"
import BaseStats from "./BaseStats"
import InfoList from "./InfoList"
import Footer from "./Footer"

export default function InfoDisplay({ pkmn, data, format, rating, setCurrentPkmn }) {

    function normalizeFormat(format) {
        const parts = format.split("_")
        const f = parts[0].toUpperCase()
        const gen = parts[2]
        let year
        let regulation
        let date
        let mm
        let yy
        if (f === "VGC") {
            year = parts[3]
            regulation = parts[5].toUpperCase()
            mm = parts[6]
            yy = parts[7]
        } else if (f === "OU") {
            mm = parts[2]
            yy = parts[3]
        }
        date = mm[0].toUpperCase() + mm.slice(1) + " " + yy
        return [`[${f}] Gen ${gen} ${year} ${regulation ? "Regulation " + regulation : ""}`.trim(), date]
    }
    const [normFormat, date] = normalizeFormat(format)
    return (
        <>
            <div className="flex flex-col h-screen text-white bg-background">
                <div className="flex w-full p-2">
                    <div className="flex items-center">
                        <span className="flex items-center h-6 ml-4">
                            <span className={`pokesprite big pokemon ${pkmn.replace(" ", "-").replace(".", "").toLowerCase()}`}></span>
                        </span>
                        <div className="flex flex-col items-center w-45 p-2 md:text-small">
                            <span>{pkmn}</span>
                            <span>{data.Usage}% Usage</span>
                            <div className="flex items-center mt-2 gap-5">
                                {data["Types"].map((type) => <span key={type} className={`type big ${type}`}></span>)}
                            </div>
                        </div>
                    </div>
                    <div className="flex flex-col justify-center text-sm">
                        <span>{normFormat}</span>
                        <span>Rating - {rating}+</span>
                        <span>{date}</span>
                    </div>
                </div>

                <div className="overflow-y-auto">
                    <div className="p-8 bg-itemTwo">
                        <div className="flex flex-wrap justify-center p-8 gap-5 bg-background">
                            {<BaseStats data={data["Base Stats"]} />}
                            {<InfoList title={"Abilities"} data={data["Abilities"]} />}
                            {<InfoList title={"Items"} data={data["Items"]} />}
                            {<InfoList title={"Spreads"} data={data["Spreads"]} />}
                            {<InfoList title={"Moves"} data={data["Moves"]} />}
                            {<InfoList title={"Tera Types"} data={data["Tera Types"]} />}
                            {<InfoList title={"Teammates"} data={data["Teammates"]} setCurrentPkmn={setCurrentPkmn} />}
                        </div>
                    </div>
                    <Footer />
                </div>
            </div>
        </>
    )
}