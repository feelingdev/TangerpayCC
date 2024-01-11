import useFetch from '../services/useFetch';
import { useAppData } from "../appContext";

export default function PostResult() {
    const {
        infoFetch
    } = useAppData();
    const { data, error, loading } = useFetch(`retrieveContactDetails?id=${infoFetch.id}`, 'get');

    return (
        <div className="result">
            {
                loading ?
                    <>
                        <p>Please wait...</p>
                    </>
                    : error ?
                        <>
                            <p>Information doesn't exist.</p>
                        </>
                        :  <>
                            <p>Name: {data.name}</p>
                            <p>Phone Number: {data.phoneNumber}</p>
                           </>
            }
        </div>
    );
}