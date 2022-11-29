import Node from "./Node/Node"
import { useState, useEffect, useCallback } from 'react'
import { dijkstra } from "../algorithms/dijkstra"

const NUM_ROWS = 20
const NUM_COLS = 30
const SOURCE_NODE_ROW = 10
const SOURCE_NODE_COL = 10
const DESTINATION_NODE_ROW = 6
const DESTINATION_NODE_COL = 28

const createNode = (col, row) => {
    return {
        col,
        row,
        isSource: col === SOURCE_NODE_COL && row === SOURCE_NODE_ROW,
        isDestination: col === DESTINATION_NODE_COL && row === DESTINATION_NODE_ROW,
        distance: Infinity,
        isProcessed: false,
        isWall: false,
        parent: null,
        IdxInPriorityQueue: -1
    }
}

const createInitialGraph = () => {
    // Columns: x direction
    // Rows: y direction
    let graphNodes = []
    for (let col = 0; col < NUM_COLS; col++) {
        let currentCol = []
        for (let row = 0; row < NUM_ROWS; row++) {
            currentCol.push(createNode(col, row))
        }
        graphNodes.push(currentCol)
    }
    return graphNodes
}

const getNewGraphWithWall = (graphNodes, col, row) => {
    const newGraph = graphNodes
    const graphNode = newGraph[col][row]
    const newGraphNode = {
        ...graphNode,
        isWall: !graphNode.isWall
    }

    newGraph[col][row] = newGraphNode
    return newGraph
}

const PathfindingVisualizer = () => {
    const [graphNodes, setGraphNodes] = useState([])
    const [mousePressed, setMousePressed] = useState(false)

    const onMouseDownHandler = useCallback((col, row) => {
        const newGraphNodes = getNewGraphWithWall(graphNodes, col, row)
        setGraphNodes(newGraphNodes)
        setMousePressed((prevState) => !prevState)
    }, [graphNodes])

    const onMouseEnterHandler = useCallback((col, row) => {
        if (!mousePressed) return

        const newGraphNodes = getNewGraphWithWall(graphNodes, col, row)
        setGraphNodes(newGraphNodes)
    }, [mousePressed, graphNodes])

    const onMouseUpHandler = () => {
        setMousePressed(false)
    }

    const startVisualization = () => {
        // console.log(graphNodes[0][5]["IdxInPriorityQueue"])
        // console.log(graphNodes[0][5]["parent"])
        const sourceNode = graphNodes[SOURCE_NODE_COL][SOURCE_NODE_ROW]
        const destNode = graphNodes[DESTINATION_NODE_COL][DESTINATION_NODE_ROW]
    }

    useEffect(() => {
        const graph = createInitialGraph()
        setGraphNodes(graph)
    }, [])

    return (
        <main className="container">
            <div className="header">
                <nav className="navbar">
                    <h2>Pathfinder Algorithms</h2>
                    <ul className="settings-nav">
                        <li>
                            <select name="algorithm" id="algorithm">
                                <option value="dijskta">Dijskta</option>
                                <option value="DFS">Depth First Search</option>
                                <option value="BFS">Breadth First Search</option>
                            </select>
                        </li>
                        <li><button>Set Source Node</button></li>
                        <li><button>Set Destination Node</button></li>
                        <li><button onClick={startVisualization}>Start</button></li>
                        <li><button>Pause</button></li>
                        <li><button>Stop</button></li>
                    </ul>
                </nav>
            </div>
            <div className="grid">
                {graphNodes.map((col, colIdx) => {
                    return (
                        <div key={colIdx}>
                            {col.map((graphNode, nodeIdx) => {
                                const { col, row, distance, isSource, isDestination, isWall, parent } = graphNode;
                                return (
                                    <Node
                                        key={nodeIdx}
                                        col={row}
                                        row={col}
                                        distance={distance}
                                        isSource={isSource}
                                        isDestination={isDestination}
                                        onClick={(e) => console.log(col, row)}
                                        onMouseUp={(col, row) => onMouseUpHandler(col, row)}
                                        onMouseDown={(col, row) => onMouseDownHandler(col, row)}
                                        onMouseEnter={(col, row) => onMouseEnterHandler(col, row)}
                                        isWall={isWall}
                                        parent={parent}
                                    />
                                )
                            })}
                        </div>
                    )
                })}
            </div>
        </main>

    )
}

export default PathfindingVisualizer