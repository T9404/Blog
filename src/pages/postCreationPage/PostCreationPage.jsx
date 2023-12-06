import React, {useEffect, useState} from "react";
import tagConverter from "../../shared/components/tagConverter/TagConverter";
import TagSelect from "../../shared/components/tagConverter/Tag";
import PostCreationSelectGroup from "../../shared/components/postCreation/PostCreationSelectGroup";
import InternalElement from "../../shared/components/postCreation/InternalElement";

const PostCreationPage = () => {
    const [addressArray, setAddressArray] = useState([
        [0, "", 0]
    ]);
    
    const [form, setForm] = useState({
        title: '',
        timeReading: '',
        pictureLink: '',
        text: '',
        tags: [],
        addressGuid: ''
    });
    
    const handleTagsChange = async (e) => {
        const selectedOptions = Array.from(e.target.selectedOptions).map(option => option.value);
        const idTags = await tagConverter(selectedOptions);
        setForm({...form, tags: idTags});
    }
    
    const handleGroupChange = async (e) => {
        const selectedOption = e.target.value;
        console.log(selectedOption);
    }
    
    useEffect(() => {
        console.log(addressArray)
        
    }, [addressArray]);
    
    const changeAddressFunction = (index, data) => {
        setAddressArray((prevAddressArray) => {
            const newAddressArray = [...prevAddressArray];
            newAddressArray[index] = data;
            return newAddressArray;
        });
        
        setAddressArray((prevAddressArray) => {
            const newAddressArray = [...prevAddressArray];
            newAddressArray.splice(index + 1);
            return newAddressArray;
        });
        
        setAddressArray((prevAddressArray) => {
            const newAddressArray = [...prevAddressArray];
            newAddressArray.push([newAddressArray.length, "", newAddressArray[newAddressArray.length - 1][0]]);
            return newAddressArray;
        });
        
        setForm({...form, addressGuid: addressArray[addressArray.length - 1][2]});
    };
    
    const handleSubmitButton = () => {
        console.log(form);
    }
    
    return (
        <div className="border p-4">
            <h1>Написать новый пост</h1>
            
            <div className="d-flex flex-column flex-md-row bd-highlight">
                <div className="p-2 flex-fill bd-highlight">
                    <input
                        type="text"
                        className="form-control"
                        placeholder="Название"
                        aria-label="Recipient's username"
                        aria-describedby="button-addon2"
                        onChange={e =>
                            setForm({...form, title: e.currentTarget.value})}
                        value={form.title}
                    />
                </div>
                <div className="p-2 flex-fill bd-highlight">
                    <input
                        type="text"
                        className="form-control"
                        placeholder="Время чтения"
                        aria-label="Recipient's username"
                        aria-describedby="button-addon2"
                        onChange={e =>
                            setForm({...form, timeReading: e.currentTarget.value})}
                        value={form.timeReading}
                    />
                </div>
            </div>
            
            <label className={`form-check-label`} htmlFor="flexCheckDefault">
                Группа
            </label>
            <div className="d-flex flex-column flex-md-row bd-highlight">
                <div className="p-2 flex-fill bd-highlight">
                    <PostCreationSelectGroup handleGroupChange={handleGroupChange} />
                </div>
                <div className="p-2 flex-fill bd-highlight">
                    <TagSelect handleTagsChange={handleTagsChange} />
                </div>
            </div>
            
            
            <div className="mb-3">
                <label form="exampleFormControlTextarea1" className="form-label">Ссылка на картинку</label>
                <textarea
                    className="form-control"
                    id="exampleFormControlTextarea1"
                    rows="1"
                    onChange={e => setForm({...form, pictureLink: e.currentTarget.value})}
                ></textarea>
            </div>
           
            <div className="mb-3">
                <label form="exampleFormControlTextarea1" className="form-label">Текст поста</label>
                <textarea
                    className="form-control"
                    id="exampleFormControlTextarea1"
                    rows="5"
                    onChange={e => setForm({...form, text: e.currentTarget.value})}
                ></textarea>
            </div>
            
            <div className="mb-3">
                <h1>Адрес</h1>
                {addressArray.map((address, index) => (
                    <div key={index}>
                        <div className="d-flex flex-column flex-md-row bd-highlight">
                            <div className="p-2 flex-fill bd-highlight">
                                <InternalElement data={address} index={index} handleChangeAddress={changeAddressFunction} />
                            </div>
                        </div>
                    </div>
                ))}
            </div>
            
            <div className="d-flex flex-column">
                <button
                    type="button"
                    className="btn btn-primary align-self-end w-auto"
                    onClick={handleSubmitButton}
                >
                    Создать пост
                </button>
            </div>
            
        </div>
    );
}

export default PostCreationPage;