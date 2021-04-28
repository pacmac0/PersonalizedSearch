import {User} from "../components";
import {PnewsModel} from "../model";
import {useModelProperty} from "../model";
function UserPresenter(props) {
    const model = props.model;
    const currentUser = useModelProperty(model,"currentUser");
    return (
        <User 
            currentUser={currentUser[0]}
            options={model.getUsersList()}
            onClick={(e)=>{model.changeUser(e.target.textContent);window.location.reload();}}
        />
    );
}

export default UserPresenter;