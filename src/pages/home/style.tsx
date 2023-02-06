import styled from 'styled-components';
import { lightGreen } from '../../constant/variable';
const Styled = styled.div`
  .home {
    margin-top: 100px;
  }
  .posts {
    margin-top: 50px;
    display: flex;
    flex-direction: column;
    gap: 150px;
  }
  .post {
    display: flex;
    gap: 100px;
  }
  .post:nth-child(2n + 1) {
    flex-direction: row-reverse;
  }

  .img {
    flex: 2;
    position: relative;
  }
  .img::after {
    content: '';
    width: 100%;
    height: 100%;
    background-color: ${lightGreen};
    position: absolute;
    top: 20px;
    left: -20px;
    z-index: -1;
  }

  .img img {
    width: 100%;
    max-height: 400px;
    object-fit: cover;
  }

  .content {
    flex: 3;
    display: flex;
    flex-direction: column;
    justify-content: flex-start;
    gap: 20px;
  }
  .content h1 {
    font-size: 48px;
  }

  .content p {
    font-size: 18px;
  }

  .content button {
    width: max-content;
    padding: 10px 20px;
    border: none;
    cursor: pointer;
    background-color: white;
    border: 1px solid teal;
    color: teal;
  }
  .content button:hover {
    border: 1px solid white;
    background-color: ${lightGreen};
    color: black;
  }
`;
export default Styled;
