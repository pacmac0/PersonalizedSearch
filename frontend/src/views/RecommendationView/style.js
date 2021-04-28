import styled from "styled-components";

export const RecommendationWrapper = styled.div`
    padding-top: 40px;
    display: grid;
    grid-template-columns: repeat(5, 1fr);
    grid-gap: 50px 50px;
    grid-auto-rows: 300px;
`;

export const RecommendationViewWrapper = styled.div`
    height: 100vh;
    background-color: #eee;
    padding: 20px 100px 20px 100px;
`;