import styled from 'styled-components';
import { lightGreen } from '../../constant/variable';
const Styled = styled.div`
  .auth {
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    height: 100vh;
    background-color: ${lightGreen};
  }
  .auth h1 {
    font-size: 20px;
    color: teal;
    margin-bottom: 20px;
  }

  .auth form {
    display: flex;
    flex-direction: column;
    padding: 50px;
    background-color: white;
    width: 200px;
    gap: 20px;
  }
  form input {
    padding: 10px;
    border: none;
    border-bottom: 1px solid gray;
  }

  form button {
    padding: 10px;
    border: none;
    background-color: teal;
    cursor: pointer;
    color: white;
  }

  form p {
    font-size: 12px;
    color: red;
    text-align: center;
  }

  form span {
    font-size: 12px;
    text-align: center;
  }
`;
export default Styled;
