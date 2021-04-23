import {
    UserWrapper,
    AccountWrapper,
    UserOption,
    OptionWrapper
} from "./style";

function User(props) {
    const {
        currentUser,
        options,
        onClick
    } = props;
    //const U = currentUser[0];
    return (
        <div className="User">
            <UserWrapper>
                <AccountWrapper>
                    {currentUser}
                </AccountWrapper>
                <UserOption>
                {
                    options.map((elem)=>(
                        <OptionWrapper
                            onClick={onClick}
                        >
                            {elem}
                        </OptionWrapper>
                    ))
                }
                </UserOption>
            </UserWrapper>
        </div>
    );
}

export default User;