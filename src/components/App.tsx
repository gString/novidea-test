import {useMemo, useState} from "react";
import {NavButton, Container, Nav, Title} from "./App.styles";
import {PopOptimizedOrderedList, PushOptimizedOrderedList} from "../logic/classes";
import List from "./List";
import {compareFunction} from "../logic/CompareFunction";


enum LogicType {
    Pop = "POP",
    Push = "PUSH",
}

function App() {
    const [logicType, setLogicType] = useState<LogicType>(LogicType.Push);

    const popOptimizedInstance = new PopOptimizedOrderedList(compareFunction);
    const pushOptimizedInstance = new PushOptimizedOrderedList(compareFunction);

    const MemoisedPopInstance = useMemo(() => popOptimizedInstance, []);
    const MemoisedPushInstance = useMemo(() => pushOptimizedInstance, []);

  return (
    <Container>
        <Nav>
            <NavButton onClick={() => setLogicType(LogicType.Push)} disabled={logicType===LogicType.Push}>Optimized for Push</NavButton>
            <NavButton onClick={() => setLogicType(LogicType.Pop)} disabled={logicType===LogicType.Pop}>Optimized for Pop</NavButton>
        </Nav>
        <Title>Logic Optimized For {logicType}</Title>
        <List
            instance={logicType === LogicType.Push ?
                MemoisedPushInstance :
                MemoisedPopInstance } />
    </Container>
  )
}

export default App
