import {CompareFunc} from "./classes";

const convertToString = (val: any) => {
    if (typeof val === "string") return val;
    if (typeof val === "object") return JSON.stringify(val);
    return String(val);
}

export default function DoublyLinkedList(compareFn: CompareFunc) {
    let head: Node | null = null;
    let tail: Node | null = null;
    let length = 0;
    const compare = compareFn;

    class Node {
        element: any;
        prev: any;
        next: any;

        constructor(element: any) {
            this.element = element
            this.prev = null
            this.next = null
        }
    }

    class PublicLinkedList {
        size() {
            return length
        }

        isEmpty() {
            return this.size() === 0;
        }

        insert(element: any) {
            const newNode = new Node(element);

            // no need to check order here
            if (this.isEmpty()) {
                // first node case
                head = newNode;
            } else {
                tail!.next = newNode;
                newNode.prev = tail;
            }

            tail = newNode;
            length++;
            return true;
        }

        orderedInsert(element: any) {
            const newNode = new Node(element);

            if (this.isEmpty()) {
                // first node case
                head = newNode;
                tail = newNode;
            } else {
                let currentNode = head;
                let isDone = false;

                while (!isDone) {
                    // check if found insert point
                    if (compare(currentNode!.element, newNode.element) >= 0) {
                        newNode.next = currentNode;
                        newNode.prev = currentNode!.prev;
                        if (currentNode!.prev === null) {
                            head = newNode;
                        }
                        currentNode!.prev = newNode;
                        isDone = true;
                    // if passed the whole list, insert at the end
                    } else if (tail === currentNode) {
                        newNode.prev = currentNode;
                        currentNode!.next = newNode;
                        tail = newNode;
                        isDone = true;
                    } else {
                        currentNode = currentNode!.next;
                    }
                }
            }
            length++
            return true
        }

        remove() {
            if (length < 1) {
                throw new Error('No elements to remove');
            }
            // list is already ordered, so take remove the tail
            // value of the removed node, return as feedback in the end
            const removedElement = tail!.element;
            if ( length === 1) {
                // single node case
                head = null;
                tail = null;
            } else {
                tail = tail!.prev
                tail!.next = null
            }
            length--;
            return convertToString(removedElement);
        }

        orderedRemove() {
            if (length < 1) {
                throw new Error('No elements to remove');
            }
            // value of the removed node, return as feedback in the end
            let removedElement;
            if ( length === 1) {
                // single node case
                removedElement = tail!.element;
                head = null;
                tail = null;
            } else {
                let currentNode = head!.next;
                let isDone = false;
                // set temporary candidate for removal
                let maxNode = head;

                while (!isDone) {
                    if (compare(currentNode.element, maxNode!.element) > 0) {
                        // if the current node value is "bigger", it should replace maxNode
                        maxNode = currentNode;
                    }
                    if (currentNode === tail) {
                        // we went over the whole list, no need to continue;
                        isDone = true;
                    } else {
                        currentNode = currentNode.next;
                    }
                }
                removedElement = maxNode!.element;

                // the actual removal of the node
                const prevNode = maxNode!.prev;
                const nextNode = maxNode!.next;
                if (prevNode) {
                    prevNode.next = nextNode;
                } else {
                    head = nextNode;
                }
                if (nextNode) {
                    nextNode.prev = prevNode;
                } else {
                    tail = prevNode;
                }
            }
            length--;
            return convertToString(removedElement);
        }
    }

    return new PublicLinkedList();
}
