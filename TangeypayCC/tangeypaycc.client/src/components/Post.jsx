import { useState } from 'react';
import { useAppData } from "../appContext";
import PostResult from '../components/PostResult';

const emptyInfo = {
    name: '',
    phoneNumber: ''
};
export default function Post() {
    const {
        isPosted,
        infoDispatch,
        isPostedDispatch
    } = useAppData();
    
    const [localInfo, setLocalInfo] = useState(emptyInfo);

    function handleChange(e) {
        e.persist();
        setLocalInfo((curInfo) => {
            return {
                ...curInfo,
                [e.target.id]: e.target.value,
            }
        });
    }

    function handleSubmit(e) {
        if (isPosted) isPostedDispatch({ type: "toggle", toggle: false });
        infoDispatch({ type: "addinfo", info: localInfo });
        isPostedDispatch({ type: "toggle", toggle: true });
    }

    return (
        <section>
            <p>Capture the name and phone number from the user and save these details by calling the /recordContactDetails endpoint.</p>
            <p>/recordContactDetails: This endpoint should accept the input of a name and phone number, save them in memory, and return an ID that can be used to retrieve the information later.</p>
            <input
                id="name"
                type="text"
                placeholder="Name"
                value={localInfo.name}
                onChange={handleChange}
            ></input>
            <br></br>
            <input
                id="phoneNumber"
                type="text"
                placeholder="Phone Number"
                value={localInfo.phoneNumber}
                onChange={handleChange}
            ></input>
            <br></br>
            <button
                onClick={handleSubmit}
            >POST</button>
            {
                isPosted && <PostResult />
            }
        </section>
    );
}