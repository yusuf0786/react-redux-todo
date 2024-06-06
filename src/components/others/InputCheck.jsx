import { useState } from "react"

export function InputCheck({inputChecked=false, onClickFunction, optionalValueSend}) {
    const [inputCheck, setInputCheck] = useState(inputChecked)
    return <input type="checkbox" checked={inputCheck ? "checked": ""} onChange={(e) => setInputCheck(e.target.checked)} onClick={onClickFunction ? () => onClickFunction(optionalValueSend) : null} />
}