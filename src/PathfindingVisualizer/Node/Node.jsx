// import { useState } from "react"

const Node = ({ isSource, isDestination }) => {
    // const [isSource, setIsSource] = useState(false)
    // const [isDestination, setIsDestination] = useState(false)

    const nodeClass = isSource ? 'node-source' : isDestination && 'node-destination'

    return (
        <div className={`node ${nodeClass}`} onClick={() => !isSource}></ div>
    )
}

export default Node