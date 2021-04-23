import styled from "styled-components";

export const UserWrapper = styled.div`
    position: absolute;
    right: 100px;
    top: 100px;
    width: 100px;
    text-align: center;
`;

export const UserOption = styled.div`
    background-color: #e6e6e6;
    padding: 10px 10px 15px 10px;
    margin-top: 10px;
    border-radius: 15px;
`;

export const AccountWrapper = styled.div`
    width: 36px;
    height: 36px;
    line-height: 36px;
    font-size: 20px;
    background: #cccccc;
    border-radius: 50%;
    text-align: center;
    margin: auto auto;
`;

export const OptionWrapper = styled.div`
    line-height: 25px;
    cursor: pointer;
    :hover {
        text-shadow: 0px 2px 2px rgba(0, 0, 0, 0.25);
    }
`;