class Vertex {
    constructor(x, y) {
        this.x = x
        this.y = y
        this.d = Infinity
        this.processed = false
        this.idxInPriorityQueue = -1
        this.parent = null
    }

    reset() {
        this.d = Infinity
        this.processed = false
        this.idxInPriorityQueue = -1
        this.parent = null
    }
}

// Priority Queue used in Dijsktra's algorithm
class PriorityQueue {
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
        const val = this.q[j].d
        const parentIdx = Math.floor(j / 2)
        const parentVal = this.q[parentIdx].d
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

        if (leftChildIdx >= n) {
            const childIdx = leftChildIdx
            const childD = this.q[leftChildIdx].d 
        } else {
            const childD = Math.min(this.q[leftChildIdx].d, this.q[rightChildIdx].d)
            const childIdx = Math.min(leftChildIdx, rightChildIdx)
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
}