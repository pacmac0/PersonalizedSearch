import styled from "styled-components";

export const UserWrapper = styled.div`
    position: absolute;
    right: 100px;
    top: 100px;
    width: 100px;
    text-align: center;
`;

export const UserOption = styled.div`
    background-color: rgba(230,230,230,0.3);
    padding: 10px 10px 15px 10px;
    margin-top: 10px;
    border-radius: 15px;
    
    transition: 0.2s;
    &:hover{
        box-shadow: 0 8px 16px 0 rgba(230,230,230,0.5);
        box-shadow: 0 2px 4px 0 rgba(0,0,0,0.2);
    }
`;

export const AccountWrapper = styled.div`
    width: 36px;
    height: 36px;
    line-height: 36px;
    font-size: 20px;
    font-family: Georgia;
    background: #cccccc;
    border-radius: 50%;
    text-align: center;
    margin: auto auto;
`;

export const OptionWrapper = styled.div`
    line-height: 25px;
    cursor: pointer;
    font-family: Georgia;
    :hover {
        text-shadow: 0px 2px 2px rgba(0, 0, 0, 0.25);
    }
`;