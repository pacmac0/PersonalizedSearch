import styled from "styled-components";
import { Button } from "react-bootstrap";

export const StyledDetailsView = styled.div`
    width: 100%auto;
    height: 100vh;
    background-color: #eee;
    display: flex;
    justify-content: center;
    align-items: center;
`;

export const ContentWrapper = styled.div`
    width: 60%;
`;

export const RecommendationWrapper = styled.div`

`;

export const StyledNewsTitle = styled.div`
    font-family: cursive;
    font-size: 35px;
    font-weight: bold;
    margin-bottom: 20px;
`;

export const StyledContent = styled.div`
    font-size: 20px;
    font-family: 'Courier New', Courier, monospace;
    text-align: left;
`;

export const StyledReturnWrapper = styled.div`
    position: absolute;
    top: 30px;
    left: 50px;
    width: 30px;
    height: 30px;
    line-height:35px;
    text-align: center;
    background-color: rgba(204,204,204,0.4);
    box-sizing: border-box;
    border-radius: 50%;
    :hover {
        box-shadow: 0 5px 10px rgba(0, 0, 0, .2);
        cursor: pointer;
    }
`;
