// import { useState } from "react"

const Node = (props) => {
    const {
        col,
        row,
        isSource,
        isDestination,
        isWall,
        parent,
        onClick,
        onMouseDown
        // onMouseEnter,
        // onMouseUp,
    } = props
    // const [isSource, setIsSource] = useState(false)
    // const [isDestination, setIsDestination] = useState(false)

    const nodeClass = isSource ? 'node-source' : isDestination ? 'node-destination' : isWall ? 'node-wall' : ''

    return (
        <div
            className={`node ${nodeClass}`}
            onClick={onClick}
            id={`node-${row}-${col}`}
            onMouseDown={() => onMouseDown(row, col)}
            parent={parent}
        // onMouseEnter={() => onMouseEnter(row, col)}
        // onMouseUp={() => onMouseUp()}
        >
        </ div>
    )
}

export default Node