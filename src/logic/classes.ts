import DoublyLinkedList from "./DoublyLinkedList";

export type CompareFunc = (a: any, b:any)=>number;
type Response = {
    list: string;
    length: number;
    item?: string;
}

abstract class BaseOrderedList {

    constructor(compareFn: CompareFunc) {
        if (arguments.length === 0) {
            throw new Error("Need compareFn");
        }
        if (arguments.length === 0 || typeof compareFn !== "function") {
            throw new Error("Arg compareFn is not a function");
        }
    }
}

export class PopOptimizedOrderedList extends BaseOrderedList {
    #list: any;
    constructor(compareFn: CompareFunc) {
      super(compareFn);
      this.#list = DoublyLinkedList(compareFn);
    }
    insertItem(item: any):Response {
        this.#list.orderedInsert(item);
        return {
            list: this.stringifyList(),
            length: this.listLength(),
        }
    }

    removeMax():Response {
        const item = this.#list.remove();
        return {
            list: this.stringifyList(),
            length: this.listLength(),
            item,
        }
    }

    stringifyList = () => this.#list.toString()
    listLength = () => this.#list.size()
}

export class PushOptimizedOrderedList extends BaseOrderedList {
    #list: any;
    constructor(compareFn: CompareFunc) {
        super(compareFn);
        this.#list = DoublyLinkedList(compareFn);
    }

    insertItem(item: any):Response {
        this.#list.insert(item);
        return {
            list: this.stringifyList(),
            length: this.listLength(),
        }
    }

    removeMax():Response {
        const item = this.#list.orderedRemove();
        return {
            list: this.stringifyList(),
            length: this.listLength(),
            item
        }
    }

    stringifyList = () => this.#list.toString()
    listLength = () => this.#list.size()
}

