// import { useState } from "react"

const Node = (props) => {
    const {
        col,
        row,
        distance,
        isSource,
        isDestination,
        isWall,
        parent,
        onMouseDown,
        onMouseEnter,
        onMouseUp,
        onClick
    } = props
    // const [isSource, setIsSource] = useState(false)
    // const [isDestination, setIsDestination] = useState(false)

    const nodeClass = isSource ? 'node-source' : isDestination ? 'node-destination' : isWall ? 'node-wall' : ''

    return (
        <div
            className={`node ${nodeClass}`}
            id={`node-${row}-${col}`}
            distance={distance}
            onMouseDown={() => onMouseDown(row, col)}
            parent={parent}
            onMouseEnter={() => onMouseEnter(row, col)}
            onMouseUp={() => onMouseUp()}
            onClick={onClick}
        >
        </ div>
    )
}

export default Node