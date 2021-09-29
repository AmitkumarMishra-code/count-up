import { useEffect, useState } from "react"
import Block from "./Block"
const ceilingAmount = 10000000000
export default function App() {
    const [amount, setAmount] = useState(100000000)

    useEffect(() => {
        let intervalId = setInterval(() => {
            if (amount < ceilingAmount) {
                setAmount(amount + 100000000)
            }
            else {
                clearInterval(intervalId)
            }
        }, 1000)
        return () => clearInterval(intervalId)
    }, [amount])

    const resetHandler = () => {
        setAmount(100000000)
    }

    const formatAmountString = (amount) => {
        let amountString = amount.toString().split('').reverse().join('')
        let newString = ''
        for (let i = 0; i < amountString.length; i++) {
            if ((i + 1) % 3 === 0) {
                newString += amountString[i] + ','
            }
            else {
                newString += amountString[i]
            }
        }
        if(newString[newString.length-1] === ','){
            newString = newString.substring(0, newString.length-1)
        }
        return newString.split('').reverse().join('')
    }

    return (
        <div className="container">
            <h3>Amount Till Now</h3>
            <div className="amount">
                <p>{`$ `}</p> {formatAmountString(amount).split(',').map((value, idx) => <Block key={idx} value={value} />)}
            </div>

            {
                amount === ceilingAmount &&
                <button onClick = {resetHandler}>Reset</button>
            }
        </div>
    )
}