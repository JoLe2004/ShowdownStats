import { useEffect, useState } from "react"
import PokeList from "../components/PokeList"
import InfoDisplay from "../components/InfoDisplay"
import Loading from "../components/Loading"

export default function Index() {
    const [currentPkmn, setCurrentPkmn] = useState("")
    const [data, setData] = useState({})
    const [rating, setRating] = useState("1760")
    const [format, setFormat] = useState(`vgc_gen_9_2026_regulation_f_december_2025`)

    useEffect(() => {
        async function load() {
            const f = format + "_" + rating
            const res = await fetch(`/json/${f}.json`)
            const data = await res.json()
            setData(data)
            if (!currentPkmn || !data[currentPkmn]) {
                const highestUsage = Object.keys(data)[0]
                setCurrentPkmn(highestUsage)
            }
        }
        load()
    }, [format, rating])

    return (
        <>
            {Object.keys(data).length > 0 ? (
                <main className="flex bg-background">
                    <InfoDisplay pkmn={currentPkmn} data={data[currentPkmn]} format={format} rating={rating} setCurrentPkmn={setCurrentPkmn} />
                    <PokeList
                        data={data}
                        setCurrentPkmn={setCurrentPkmn}
                        setFormat={setFormat}
                        setRating={setRating}
                    />
                </main>
            ) : (
                <Loading />
            )}
        </>
    )
}