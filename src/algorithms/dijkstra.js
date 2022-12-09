// NOTE: Node and Vertex are completely interchangeable terms here

const WEIGHT = 1

// Function: computeShortestPath
// Let us implement Dijkstra's algorithm
// graph - instance of the DirectedGraphFromImage class
// source - a vertex that is the source (i,j) pixel coordinates
// dest - a vertex that is the destination (i,j) pixel coordinates
// sx, sy: x and y of source node
// dx, dy: x and y of destination node
export const dijkstra = (graph, source, destination) => {
    const visitedNodesInOrder = []
    const unvisitedNodes = getAllNodes(graph)
    source.distance = 0

    while (!!unvisitedNodes.length) {
        sortNodesByDistance(unvisitedNodes)
        const closestNode = unvisitedNodes.shift()
        closestNode.isProcessed = true

        if (closestNode.isWall) continue

        if (closestNode === destination) {
            visitedNodesInOrder.push(closestNode)          
            console.log('target found')
            return visitedNodesInOrder
        }
        visitedNodesInOrder.push(closestNode)
        updateUnvisitedNeighbors(closestNode, graph)
    }
}

const sortNodesByDistance = (unvisitedNodes) => {
    unvisitedNodes.sort((nodeA, nodeB) => nodeA.dist - nodeB.dist)
}

function updateUnvisitedNeighbors(node, grid) {
    const unvisitedNeighbors = getNeighbouringNodes(node, grid);
    for (const neighbor of unvisitedNeighbors) {
      neighbor.distance = node.distance + 1;
      neighbor.previousNode = node;
    }
  }


const getAllNodes = (graph) => {
    const nodes = []

    for (let col of graph) {
        for (let node of col) {
            nodes.push(node)
        }
    }

    return nodes
}

const getNeighbouringNodes = (currentNode, graph) => {
    const nodes = []

    const {col, row } = currentNode
    // Add top neighbouring node
    if (row > 0) nodes.push(graph[col][row - 1])
    // Add right neighbouring node
    if (col < graph[0].length - 1) nodes.push(graph[col + 1][row])
    // Add bottom neighbouring node
    if (row < graph.length - 1) nodes.push(graph[col][row + 1])
    // Add left neighbouring node
    if (col > 0) nodes.push(graph[col - 1][row])

    return nodes.filter(neighbour => !neighbour.isProcessed)
}

export const getShortestPath = (destinationNode) => {
    let currentNode = destinationNode
    let path = []

    while (currentNode.parent !== null) {
        path.unshift(currentNode)
        currentNode = currentNode.parent
    }

    return path
}