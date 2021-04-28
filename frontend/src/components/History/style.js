import styled from "styled-components";

export const HistoryWrapper = styled.div`
    position: fixed;
    top:170px;
    left:50px;
    width: 20%;
    height: 60%;
    overflow: scroll;
    padding: 10px;
    border: 1px solid rgba(0, 0, 0, 0.1);
`;

export const SingleHistoryWrapper = styled.div`
    font-family: Georgia;
    font-size: 18px;
    text-align: justify;
    text-justify: inter-word;
    padding: 5px 3px 5px 10px;
`;

export const HistoryOwner = styled.div`
    font-family: Georgia;
    font-size: 20px;
    padding-bottom: 20px;
`;