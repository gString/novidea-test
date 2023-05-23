import {PopOptimizedOrderedList, PushOptimizedOrderedList} from "./classes";
import {describe, expect} from "vitest";
import {faker} from "@faker-js/faker";
import {compareFunction} from "./CompareFunction";

const numbers_10 = Array(10).fill(null).map(_ => faker.number.float());
const numbers_100 = Array(100).fill(null).map(_ => faker.number.float());

describe("PopOptimizedOrderedList performance:", () => {
    const testClass = new PopOptimizedOrderedList(compareFunction);
    const testClassLong = new PopOptimizedOrderedList(compareFunction);
    let insertTotalTime_10: number;
    let insertTotalTime_100: number;

    it("insert times should present linear growth", () => {
        performance.mark('start');
        numbers_10.forEach(value => testClass.insertItem(value));
        performance.mark('end');
        insertTotalTime_10 = performance.measure('Measurment', 'start', 'end').duration;
        console.log('insertTotalTime_10', insertTotalTime_10);
        expect(testClass.listLength()).toEqual(10);

        performance.mark('start');
        numbers_100.forEach(value => testClassLong.insertItem(value));
        performance.mark('end');
        insertTotalTime_100 = performance.measure('Measurment', 'start', 'end').duration;
        console.log('insertTotalTime_100', insertTotalTime_100);
        expect(testClassLong.listLength()).toEqual(100);

        expect(insertTotalTime_100).toBeLessThanOrEqual(10 * insertTotalTime_10);
    })
    it("remove times should be faster from insert", () => {
        performance.mark('start');
        numbers_10.forEach(_ => testClass.removeMax());
        performance.mark('end');
        const removeTotalTime_10 = performance.measure('Measurment', 'start', 'end').duration;
        console.log('removeTotalTime_10', removeTotalTime_10);
        expect(testClass.listLength()).toEqual(0);
        expect(removeTotalTime_10).toBeLessThan(insertTotalTime_10);

        performance.mark('start');
        numbers_100.forEach(_ => testClassLong.removeMax());
        performance.mark('end');
        const removeTotalTime_100 = performance.measure('Measurment', 'start', 'end').duration;
        console.log('removeTotalTime_100', removeTotalTime_100);
        expect(testClassLong.listLength()).toEqual(0);
        expect(removeTotalTime_100).toBeLessThan(insertTotalTime_100);
    })
})

describe("PushOptimizedOrderedList performance:", () => {
    const testClass = new PushOptimizedOrderedList(compareFunction);
    const testClassLong = new PushOptimizedOrderedList(compareFunction);
    it("insert times should be faster from remove, remove times should present linear growth", () => {
        //  insert
        performance.mark('start');
        numbers_10.forEach(value => testClass.insertItem(value));
        performance.mark('end');
        const insertTotalTime_10 = performance.measure('Measurment', 'start', 'end').duration;
        console.log('insertTotalTime_10', insertTotalTime_10);
        expect(testClass.listLength()).toEqual(10);

        performance.mark('start');
        numbers_100.forEach(value => testClassLong.insertItem(value));
        performance.mark('end');
        const insertTotalTime_100 = performance.measure('Measurment', 'start', 'end').duration;
        console.log('insertTotalTime_100', insertTotalTime_100);
        expect(testClassLong.listLength()).toEqual(100);

        // remove
        performance.mark('start');
        numbers_10.forEach(_ => testClass.removeMax());
        performance.mark('end');
        const removeTotalTime_10 = performance.measure('Measurment', 'start', 'end').duration;
        console.log('removeTotalTime_10', removeTotalTime_10);
        expect(testClass.listLength()).toEqual(0);
        expect(insertTotalTime_10).toBeLessThan(removeTotalTime_10);

        performance.mark('start');
        numbers_100.forEach(_ => testClassLong.removeMax());
        performance.mark('end');
        const removeTotalTime_100 = performance.measure('Measurment', 'start', 'end').duration;
        console.log('removeTotalTime_100', removeTotalTime_100);
        expect(testClassLong.listLength()).toEqual(0);
        expect(insertTotalTime_100).toBeLessThan(removeTotalTime_100);

        expect(removeTotalTime_100).toBeLessThanOrEqual(10 * removeTotalTime_10);
    })
})




