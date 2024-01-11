import { useState } from 'react';
import { useAppData } from "../appContext";
import GetResult from '../components/GetResult';

const emptyInfo = {
    id:''
};
export default function Post() {
    const {
        isFetched,
        infoFetchDispatch,
        isFetchedDispatch
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
        if (isFetched) isFetchedDispatch({ type: "toggle", toggle: false });
        infoFetchDispatch({ type: "addinfo", info: localInfo });
        isFetchedDispatch({ type: "toggle", toggle: true });
    }

    return (
        <section className="alt">
            <p>Retrieve the contact details by calling the /retrieveContactDetails endpoint providing an ID and display them on a screen.</p>
            <p>/retrieveContactDetails:
                This endpoint should accept an ID and return the corresponding name and contact number.</p>
            <input
                id="id"
                type="text"
                placeholder="Id"
                value={localInfo.id}
                onChange={handleChange}
            ></input>
            <br></br>
            <button
                onClick={handleSubmit}
            >GET</button>
            {
                isFetched && <GetResult />
            }
        </section>
    );
}