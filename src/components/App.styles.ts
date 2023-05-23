import styled from "styled-components";

const PURPLE = "#5e63c0";
export const Container = styled.div`
  height: 80vh;
  width: 80vw;
`;
export const Nav = styled.nav`
    margin-top: 50px;
`;
export const Title = styled.h1`
  color: ${PURPLE};
  font-size: 3.2rem;
  line-height: 1.1;

`;
export const NavButton = styled.button`
    margin-right: 30px;
`;

export const Form = styled.form`
  display: flex;
  margin-top: 50px;
`;
export const Input = styled.input`
  width: 400px;
  margin-right: 60px;
`;

export const Feedback = styled.p`
  color: ${PURPLE};
  font-size: 1rem;
  font-weight: bold;
  
  span {
    color: white;
  }
`;

export const FeedbackBox = styled.footer`
  margin-top: 30px;
    background-color: #222;
  border: 1px solid black;
  padding: 20px;
  border-radius: 20px;
  height: 100px;
  max-width: 605px;
`;
