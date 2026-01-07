import { useState, useRef } from "react"
import Tooltip from "./Tooltip"

export default function InfoList({ title, data, setCurrentPkmn }) {
    const [tooltip, setTooltip] = useState({ visible: false, element: "", x: 0, y: 0 })

    function onMouseEnter(key, e) {
        setTooltip({ visible: true, element: key, x: e.clientX, y: e.clientY })
    }

    function onMouseMove(e) {
        setTooltip(prev => ({ ...prev, x: e.clientX, y: e.clientY }))
    }

    function onMouseLeave() {
        setTooltip({ visible: false, element: "", x: 0, y: 0 })
    }

    return (
        <>
            <div className="flex flex-col items-center w-fit">
                <h2 className="mb-2 text-2xl font-bold">{title}</h2>
                <div className="w-80 h-60 md:w-100 overflow-x-auto bg-list [box-shadow:8px_8px_24px_rgba(0,0,0,0.9)]">
                    {Object.entries(data).map(([key, value], index) => {
                        const bg = index % 2 === 0 ? "bg-itemOne" : "bg-itemTwo"
                        const commonProps = {
                            onMouseEnter: (e) => onMouseEnter(key, e),
                            onMouseMove: (e) => onMouseMove(e),
                            onMouseLeave: () => onMouseLeave(),
                            className: `flex justify-between items-center p-2 ${bg} hover:bg-hover transition-colors ease-in cursor-pointer`
                        };

                        return <div key={key}>
                            {title === "Teammates" && (
                                <button onClick={() => setCurrentPkmn(key)} {...commonProps} className={`w-full ${commonProps.className}`}>
                                    <div className="flex w-full">
                                        <span className="flex items-center w-10 h-6">
                                            <span className={`pokesprite pokemon ${key.trim().replace(" ", "-").replace(".", "").toLowerCase()}`}></span>
                                        </span>
                                        <div className="flex justify-between w-full">
                                            <span>{key}</span>
                                            <span>{value}</span>
                                        </div>
                                    </div>
                                </button>
                            )}
                            {title === "Items" && (
                                <div {...commonProps}>
                                    <span className="flex items-center w-10 h-6">
                                        <span className={`pokesprite item ${key.trim().replace(" ", "-").replace(/[.']/g, "").toLowerCase()}`}></span>
                                    </span>
                                    <div className="flex justify-between w-full">
                                        <span>{key}</span>
                                        <span>{value}</span>
                                    </div>
                                </div>
                            )}

                            {(title === "Tera Types") && (
                                <div {...commonProps}>
                                    <span className={`type ${key !== "Other" && "shift"} ${key.toLowerCase()}`}>{key === "Other" && "Other"}</span>
                                    <span>{value}</span>
                                </div>
                            )}

                            {(title === "Abilities" || title === "Spreads" || title === "Moves") && (
                                <div {...commonProps}>
                                    <span>{key.trim().replace(":", " ")}</span>
                                    <span>{value}</span>
                                </div>
                            )}
                        </div>
                    })}
                    <Tooltip title={title} tooltip={tooltip} />
                </div>
            </div>
        </>
    )
}