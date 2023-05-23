import React, {ReactElement, useEffect, useRef, useState} from "react";
import {Feedback, FeedbackBox, Form, Input, NavButton} from "./App.styles";
import {PopOptimizedOrderedList, PushOptimizedOrderedList} from "../logic/classes";

type ClassType = PopOptimizedOrderedList | PushOptimizedOrderedList;
type Props = {
    instance: ClassType;
}

export default function List({instance}: Props): ReactElement {
    const [listItem, setListItem] = useState('');
    const [listLength, setListLength] = useState(0);
    const [feedbackMsg, setFeedbackMsg] = useState('');
    const inputRef = useRef<HTMLInputElement>(null);

    const handlePush = (e: React.MouseEvent<HTMLButtonElement>) => {
        e.preventDefault();
        let result;
        // should not result in error, but better safe than sorry
        try {
            result = instance.insertItem(listItem);
        } catch (e) {
            // ToDo: handle errors
            return;
        }
        setFeedbackMsg(`Item ${listItem} added to list`);
        setListLength(result.length);
        setListItem('');
        inputRef!.current!.focus();
    }

    const handlePop = (e: React.MouseEvent<HTMLButtonElement>) => {
        e.preventDefault();
        let result;
        // should not result in error, but better safe than sorry
        try {
            result = instance.removeMax();
        } catch (e) {
            // ToDo: handle errors
            return;
        }
        setFeedbackMsg(`Item ${result.item} removed from list`);
        setListLength(result.length);
        setListItem('');
        inputRef!.current!.focus();
    }

    useEffect(() => {
        setListLength(instance.listLength);
        setFeedbackMsg('');
    }, [instance]);

    return (
        <>
            <Form>
                <Input autoFocus type="text" value={listItem} ref={inputRef}
                       onChange={e => setListItem(e.target.value)}/>
                <NavButton onClick={handlePush} disabled={!listItem.length}>Push</NavButton>
                <NavButton onClick={handlePop} disabled={!listLength}>Pop</NavButton>
            </Form>
            <FeedbackBox>
                <Feedback>List size: <span>{listLength}</span></Feedback>
                {Boolean(feedbackMsg.length) && <Feedback><span>{feedbackMsg}</span></Feedback>}
            </FeedbackBox>
        </>
    );
}