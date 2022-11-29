// NOTE: Node and Vertex are completely interchangeable terms here

const WEIGHT = 1

// Priority Queue used in Dijsktra's algorithm
export class PriorityQueue {
    constructor() {
        this.q = [null] // Pad it with one element to start index at 1
    }

    // Function: insert
    // Insert a vertex v of type Vertex into the queue.
    // Remember to set the field `idx_in_priority_queue` and
    // keep updating it.
    insert(v) {
        const n = this.q.length
        this.q.push(v)
        v.idxInPriorityQueue = n
        this.bubbleUp(n)
    }

    // Function: swap two elements in the priority queue.
    // Remember to swap the vertices at positions i and j
    // But also remember to update the positions of the vertices in the
    // priority queue.
    // You can use this to implement bubble_up and bubble_down
    swap(i, j) {
        let tmp = this.q[i]
        this.q[i] = this.q[j]
        this.q[i].idxInPriorityQueue = i
        this.q[j] = tmp
        this.q[j].idxInPriorityQueue = j
    }

    bubbleUp(j) {
        if (j < 1) throw new Error("Element must be greater than index 1")
        if (j >= this.q.length) throw new Error("Index out of bounds")
        if (j === 1) return
        const val = this.q[j].dist
        const parentIdx = Math.floor(j / 2)
        const parentVal = this.q[parentIdx].dist
        if (val < parentVal) {
            this.swap(j, parentIdx)
            this.bubbleUp(parentIdx)
        }

        return
    }

    // Function: bubble_down
    // Bubble down an element j until
    // min heap property is restored.
    bubbleDown(j) {
        const n = this.q.length
        const leftChildIdx = 2 * j
        const rightChildIdx = 2 * j + 1

        let childIdx = null
        let childD = null

        if (leftChildIdx >= n) {
            childIdx = leftChildIdx
            childD = this.q[leftChildIdx].d 
        } else {
            childD = Math.min(this.q[leftChildIdx].d, this.q[rightChildIdx].d)
            childIdx = Math.min(leftChildIdx, rightChildIdx)
        }

        if (this.q[j].d > childD) {
            this.swap(j, childIdx)
            this.bubbleDown(childIdx)
        }

        return
    }

    // Function: get_and_delete_min
    // Find the minimum weight vertex and delete it from the heap.
    // return the deleted vertex back
    getAndDeleteMin() {
        const n = this.q.length
        if (n <= 1) throw new Error("Heap must not be empty")
        const v = this.q[1]
        if (n > 2) {
            this.q[1] = this.q[n - 1]
            this.q[n - 1].idxInPriorityQueue = 1
            delete this.q[n - 1]
            this.bubbleDown(1)
        }

        return v
    }

    // Check if the heap is empty
    isEmpty() {
        return this.q.length === 1
    }

    // This is a useful function since in Dijkstra
    // the weight of a vertex updates on the fly.
    // We will need to call this to update the vertex weight.
    updateVertexWeight(v) {
        const j = v.idxInPriorityQueue
        const n = this.q.length
        if (j < 0 || j > n) throw new Error("j must be >= 0 and < n")

        this.bubbleDown(j)
        this.bubbleUp(j)
    }
}

// class Graph {
//     constructor(adjList, verts) {
//         this.adjList = adjList
//         this.verts = verts
//     }

//     getVertexFromCoords(i, j) {
//         if (i !== this.verts['x'] || j !== this.verts['y']) throw new Error("Vertex not found")
//         if (this.verts['x'] === i && this.verts['y'] === j) {
//             return this.verts['vertex']
//         }
//     }

//     getListOfNeighbours(vert) {
//         let coords = [vert.x, vert.y]
//         if (coords[0] === this.adjList['vertex'].x && coords[1] === this.adjList['vertex'].y) {
//             return this.adjList['vertices']
//         }
//     }
// }

// Function: computeShortestPath
// Let us implement Dijkstra's algorithm
// graph - instance of the DirectedGraphFromImage class
// source - a vertex that is the source (i,j) pixel coordinates
// dest - a vertex that is the destination (i,j) pixel coordinates
// sx, sy: x and y of source node
// dx, dy: x and y of destination node
export const dijkstra = (graph, source, destination) => {
    const Heap = new PriorityQueue()
    source.distance = 0
    Heap.insert(source)

    let totalDistance = 0

    while (!Heap.isEmpty()) {
        let u = Heap.getAndDeleteMin()
        u.processed = true

        if (u.col === destination.col && u.row === destination.row) {
            totalDistance += u.distance
            break
        }

        let neighbouringNodes = getNeighbouringNodes(graph)
        sortNodesByDistance(neighbouringNodes)
        for (let vertex in neighbouringNodes) {
            if (!vertex.processed && (u.distance + WEIGHT < vertex.distance)) {
                vertex.distance = u.distance + WEIGHT
                vertex.parent = u
                Heap.insert(vertex)
                Heap.updateVertexWeight(vertex)
            }
        }
    }

    const shortestPathArray = getShortestPath(destination)

    return {
        shortestPathArray,
        totalDistance
    }
}

const sortNodesByDistance = (unvisitedNodes) => {
    unvisitedNodes.sort((nodeA, nodeB) => nodeA.dist - nodeB.dist)
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

    return nodes
}

const getShortestPath = (destinationNode) => {
    let currentNode = destinationNode
    let path = []

    while (currentNode.parent !== null) {
        path.unshift(currentNode)
        currentNode = currentNode.parent
    }

    return path
}