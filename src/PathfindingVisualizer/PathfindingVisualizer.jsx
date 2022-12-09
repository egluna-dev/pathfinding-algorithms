import Node from "./Node/Node"
import { useState, useEffect, useCallback } from 'react'
import { dijkstra, getShortestPath } from "../algorithms/dijkstra"

const NUM_ROWS = 40
const NUM_COLS = 40
const SOURCE_NODE_ROW = 2
const SOURCE_NODE_COL = 2
const DESTINATION_NODE_ROW = 35
const DESTINATION_NODE_COL = 29

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
        idxInPriorityQueue: -1
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

    const dijkstraAnimation = (visitedNodesSequence, shortestPathSequence) => {
        for (let i = 0; i < visitedNodesSequence.length; i++) {
            if (i === visitedNodesSequence.length) {
                setTimeout(() => {
                    shortesPathAnimation(shortestPathSequence)
                }, (10 * i))
                return
            }

            setTimeout(() => {
                const node = visitedNodesSequence[i]
                document.getElementById(`node-${node.row}-${node.col}`).className = 'node node-processed'
            }, (10 * i))
        }
    }

    const shortesPathAnimation = (shortestPathSequence) => {
        for (let i = 0; i < shortestPathSequence.length; i++) {
            setTimeout(() => {
                const node = shortestPathSequence[i]
                document.getElementById(`node-${node.row}-${node.col}`).className = 'node node-shortest-path'
            })
        }
    }

    const startDijkstraVisualization = () => {
        // console.log(graphNodes[0][5]["IdxInPriorityQueue"])
        // console.log(graphNodes[0][5]["parent"])
        const sourceNode = graphNodes[SOURCE_NODE_COL][SOURCE_NODE_ROW]
        const destNode = graphNodes[DESTINATION_NODE_COL][DESTINATION_NODE_ROW]

        const visitedNodesSequence = dijkstra(graphNodes, sourceNode, destNode)
        const shortestPathSequence = getShortestPath(destNode)

        dijkstraAnimation(visitedNodesSequence, shortestPathSequence)
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
                        <li><button onClick={startDijkstraVisualization}>Start</button></li>
                        <li><button>Pause</button></li>
                        <li><button>Stop</button></li>
                        <li><button>Reset</button></li>
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