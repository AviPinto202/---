import { useState } from "react";
import { MdModeEdit } from "react-icons/md";

const EditInput = (props) => {
    const [isDisabled, setIsDisabled] = useState(true);

    const UndisabledInput = () => {
        setIsDisabled(!isDisabled)
    };

    return (
        <div className="editInput">
            <input type='text' id={props.id} disabled={isDisabled} defaultValue={props.valueof}
                onChange={(e) => props.set(e.target.value)} />
            <MdModeEdit onClick={UndisabledInput} />
        </div>
    );
}
// 

export default EditInput;