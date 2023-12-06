import Select from 'react-select'
import React, {useEffect, useState} from "react";
import Loading from "../loading/Loading";
import searchAddress from "../../api/address/SearchAddress";
import AsyncSelect from "react-select/async";

const InternalElement = ({data, index, handleChangeAddress}) => {
    const [post, setPost] = useState();
    const [loading, setLoading] = useState(true);
    
    const [form, setForm] = useState({
        id: data[0],
        text: data[1],
        next: data[2]
    });
    
    useEffect(() => {
        const fetchData = async () => {
            try {
                const postData = await searchAddress(data[2]);
                setPost(postData);
                setLoading(false)
            } catch (error) {
                console.error('Error fetching post:', error);
            }
        }
        
        fetchData().then();
    }, [data]);
    
    
    if (loading) {
        return <Loading/>;
    }
    
    const changeText = (selectedOption) => {
        handleChangeAddress(index, [selectedOption.value, selectedOption.label, form.next]);

        setForm({
            ...form,
            text: selectedOption.label,
            id: selectedOption.value,
        });
    };
    
    const loadOptions = (inputValue, callback) => {
        searchAddress(form.next, inputValue)
            .then((postData) => {
                setPost(postData);
                callback(postData.map((post) => ({ value: post.objectId, label: post.text })));
            })
            .catch((error) => {
                console.error('Error fetching post:', error);
            });
    };
    
    return (
        <div>
            {(post && post.length > 0 || index === 0) && (
                <>
                <div>
                    <p>{post[0].objectLevelText}</p>
                </div>
                <AsyncSelect
                    cacheOptions
                    defaultOptions
                    loadOptions={loadOptions}
                    onInputChange={(inputValue) => console.log('Input changed:', inputValue)}
                    onChange={changeText}
                    value={{
                        value: form.text,
                        label: form.text,
                    }}
                />
                </>
            )}
        </div>
    )
}

export default InternalElement;