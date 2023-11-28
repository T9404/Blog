import {useSearchParams} from "react-router-dom";

const GroupPage = () => {
    let [searchParams, setSearchParams] = useSearchParams();
    
    function handleSubmit(e) {
        e.preventDefault();
        const search = e.target.elements.search.value;
        setSearchParams({search: search});
    }
    
    return (
        <div>
            <form onSubmit={handleSubmit}>{/* ... */}</form>
        </div>
    );
}

export default GroupPage;
