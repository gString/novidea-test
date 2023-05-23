import {PushOptimizedOrderedList, PopOptimizedOrderedList} from "./classes";
import {describe, expect} from "vitest";

const func = () => 1;
const numbersFunc = (a: number, b: number) => a - b;

const obj = {"a": 1};
const str = "test";

const addNumbers = (instance: any) => {
    instance.insertItem(33);
    instance.insertItem(2);
    instance.insertItem(12);
    instance.insertItem(79);
}

const addItems = (instance: any) => {
    instance.insertItem(null);
    instance.insertItem(str);
    instance.insertItem(obj);
}
const removeItems = (instance: any) => {
    instance.removeMax();
    instance.removeMax();
}

describe("PushOptimizedOrderedList", () => {
    it("should throw an error if initialized without a compare function", () => {
        // eslint-disable-next-line @typescript-eslint/ban-ts-comment
        // @ts-ignore - need to test error
        expect(() => new PushOptimizedOrderedList()).toThrowError();
    })
    it("should throw an error if not initialized with a compare function", () => {
        // eslint-disable-next-line @typescript-eslint/ban-ts-comment
        // @ts-ignore - need to test error
        expect(() => new PushOptimizedOrderedList("NOT a function")).toThrowError();
    })
    it("should not throw an error if not initialized with a compare function", () => {
        expect(() => new PushOptimizedOrderedList(func)).not.toThrowError();
    })
    it("should add items and be able to report correct length", () => {
        const testClass = new PushOptimizedOrderedList(func);
        addItems(testClass);
        expect(testClass.listLength()).toEqual(3);
    })
    it("should remove items from list", () => {
        const testClass = new PushOptimizedOrderedList(func);
        addItems(testClass);
        expect(testClass.listLength()).toEqual(3);
        removeItems(testClass);
        expect(testClass.listLength()).toEqual(1);
    })
    it("given the right compare function, should add and remove items predictably", () => {
        const numberTestClass = new PushOptimizedOrderedList(numbersFunc);
        addNumbers(numberTestClass);
        expect(numberTestClass.listLength()).toEqual(4);
        expect(numberTestClass.removeMax().item).toBe('79');
        expect(numberTestClass.removeMax().item).toBe('33');
        expect(numberTestClass.removeMax().item).toBe('12');
        expect(numberTestClass.removeMax().item).toBe('2');
        expect(numberTestClass.listLength()).toEqual(0);
    })

})
describe("PopOptimizedOrderedList", () => {
    it("should throw an error if initialized without a compare function", () => {
        // eslint-disable-next-line @typescript-eslint/ban-ts-comment
        // @ts-ignore - need to test error
        expect(() => new PopOptimizedOrderedList()).toThrowError();
    })
    it("should throw an error if not initialized with a compare function", () => {
        // eslint-disable-next-line @typescript-eslint/ban-ts-comment
        // @ts-ignore - need to test error
        expect(() => new PopOptimizedOrderedList("NOT a function")).toThrowError();
    })
    it("should not throw an error if not initialized with a compare function", () => {
        expect(() => new PopOptimizedOrderedList(func)).not.toThrowError();
    })
    it("should add items and be able to report correct length", () => {
        const testClass = new PopOptimizedOrderedList(func);
        addItems(testClass);
        expect(testClass.listLength()).toEqual(3);
    })
    it("should remove items from list", () => {
        const testClass = new PopOptimizedOrderedList(func);
        addItems(testClass);
        expect(testClass.listLength()).toEqual(3);
        removeItems(testClass);
        expect(testClass.listLength()).toEqual(1);
    })
    it("given the right compare function, should add and remove items predictably", () => {
        const numberTestClass = new PopOptimizedOrderedList(numbersFunc);
        addNumbers(numberTestClass);
        expect(numberTestClass.listLength()).toEqual(4);
        expect(numberTestClass.removeMax().item).toBe('79');
        expect(numberTestClass.removeMax().item).toBe('33');
        expect(numberTestClass.removeMax().item).toBe('12');
        expect(numberTestClass.removeMax().item).toBe('2');
    })

})
