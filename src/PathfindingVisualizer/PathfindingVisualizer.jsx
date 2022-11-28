import Node from "./Node/Node"
import { useState, useEffect } from 'react'

const PathfindingVisualizer = () => {
    const [nodes, setNodes] = useState([])
    const [source, setSource] = useState()
    // const [mouseHover, setMouseHover] = useState(false)
    const createGrid = () => {
        // Row: x
        // Column: y
        let nodes = []
        for (let row = 0; row < 40; row++) {
            let currentRow = []
            for (let col = 0; col < 50; col++) {
                const currentNode = {
                    row,
                    col,
                    isSource: row === 10 && col === 5,
                    isDestination: row === 10 && col === 45
                }
                currentRow.push(currentNode)
            }
            nodes.push(currentRow)
        }
        setNodes(nodes)
    }

    console.log(nodes[1])


    useEffect(() => {
        createGrid()
    }, [])

    return (
        <main className="container">
            <div className="header">
                <nav className="navbar">
                    <h2>Tinh's App</h2>
                    <ul className="settings">
                        <li>
                            <select name="algorithm" id="algorithm">
                                <option value="dijskta">Dijskta</option>
                                <option value="DFS">Depth First Search</option>
                                <option value="BFS">Breadth First Search</option>
                            </select>
                        </li>
                        <li><button>Set Source Node</button></li>
                        <li><button>Set Destionation Node</button></li>
                        <li><button>Start</button></li>
                        <li><button>Pause</button></li>
                        <li><button>Stop</button></li>
                    </ul>
                </nav>
            </div>
            <div className="grid">
                {nodes.map((row, rowIdx) => {
                    return (
                        <div key={rowIdx}>
                            {row.map((node, nodeIdx) => {
                                const { isSource, isDestination } = node;
                                return (
                                    <Node
                                        key={nodeIdx}
                                        isSource={isSource}
                                        isDestination={isDestination}
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