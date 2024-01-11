import useFetch from '../services/useFetch';
import { useAppData } from "../appContext";

export default function PostResult() {
    const {
        info
    } = useAppData();
    const { data, error, loading } = useFetch('recordContactDetails', 'post', info);

    return (
        <div className="result">
            {
                loading ?
                    <>
                        <p>Please wait...</p>
                    </>
                    :
                    <>
                        <p>Id: {data.id}</p>
                    </>
            }
        </div>
    );
}