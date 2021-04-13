import styled from "styled-components";

export const StyledHomeWrapper = styled.div`
    width: 100%;
    height: 100vh;
    display: flex;
    justify-content: center;
    align-items: center;
    background-color: #eee;
`;

export const StyledHomeContainer = styled.div`
    width: 50%;
    margin: 50px auto;
    padding: 50px;
`;

export const StyledTitleWrapper = styled.div`
    font-family: cursive;
    text-align: center;
    font-style: bold;
    font-size: 35px;
    text-shadow: 0px 4px 4px rgba(0, 0, 0, 0.25);
`;

export const StyledSearchWrapper = styled.div`
    margin-top: 10px;
    margin-bottom: 20px;
    text-align: 30px;
`;

export const StyledSearchInputBox = styled.input.attrs({
    placeholder: "Search News"
})`
    width: 320px;
    height: 40px;
    padding: 0 30px 0 30px;
    margin-top: 30px;
    margin-bottom: 30px;
    margin-left: 20px;
    margin-right: 20px;
    border-radius: 25px;
    box-sizing: border-box;
    border: none;
    outline: none;
    font-size: 15px;
    background: #eee;
    box-shadow: 0 0 10px rgba(0, 0, 0, .2);
    :hover{
      box-shadow: 0 5px 12px rgba(0, 0, 0, .2);
    }
    &::placeholder {
        color: #999;
    }
`;

