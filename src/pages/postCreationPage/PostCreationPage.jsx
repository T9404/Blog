import React, {useEffect, useState} from "react";
import tagConverterNameToId from "../../util/converter/TagConverterNameToId";
import TagSelect from "../../shared/components/tagElement/Tag";
import PostCreationSelectGroup from "../../shared/components/postCreation/PostCreationSelectGroup";
import InternalElement from "../../shared/components/postCreation/InternalElement";
import createPost from "../../shared/api/posts/CreatePost";
import createPersonalPost from "../../shared/api/posts/CreatePersonalPost";
import notifySuccess from "../../util/notification/success/SuccessNotify";
import notifyError from "../../util/notification/error/ErrorNotify";
import {useSearchParams} from "react-router-dom";

const PostCreationPage = () => {
    let [searchParams, setSearchParams] = useSearchParams();
    const [addressArray, setAddressArray] = useState([
        [0, "", 0, ""]
    ]);
    
    const [form, setForm] = useState({
        id: '',
        title: '',
        timeReading: '',
        pictureLink: '',
        text: '',
        tags: [],
        addressGuid: ''
    });
    
    const handleTagsChange = async (selectedOptions) => {
        const selectedValues = selectedOptions.map(option => option.value);
        const idTags = await tagConverterNameToId(selectedValues);
        setForm({ ...form, tags: idTags });
    };
    
    const handleGroupChange = async (selectedOption) => {
        const selectedValues = selectedOption.value;
        setForm({...form, id: selectedValues});
    }
    
    useEffect(() => {
        console.log(addressArray)
    }, [addressArray]);
    
    useEffect(() => {
        const groupId = searchParams.get('groupId') || '';
        setForm({...form, id: groupId});
    }, []);
    
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
        
        setForm({...form, addressGuid: data[3]});
        
        setAddressArray((prevAddressArray) => {
            const newAddressArray = [...prevAddressArray];
            newAddressArray.push([newAddressArray.length, "", newAddressArray[newAddressArray.length - 1][0]]);
            return newAddressArray;
        });
    };
    
    const handleSubmitButton = async () => {
        if (!form.title || !form.timeReading || !form.text || form.tags.length === 0) {
            notifyError('Пожалуйста, заполните все поля (название, время чтения, текст поста, теги)');
            return;
        }
        
        if (isNaN(form.timeReading)) {
            notifyError('Пожалуйста, введите число в поле "Время чтения"');
            return;
        }
        
        if (form.pictureLink && form.pictureLink !== '' && !form.pictureLink.startsWith('http')) {
            notifyError('Пожалуйста, введите корректную ссылку на картинку');
            return;
        }
        
        if (form.text && form.text !== '' && form.text.length < 5) {
            notifyError('Пожалуйста, введите текст длиннее 4 символов');
            return;
        }
        
        try {
            if (form.id && form.id !== '') {
                await createPost(form);
            } else {
                await createPersonalPost(form);
            }
            
            setForm({
                title: '',
                timeReading: '',
                pictureLink: '',
                text: '',
                tags: [],
                addressGuid: '',
                id: ''
            });
            
            addressArray.splice(0, addressArray.length, [0, "", 0, ""]);
            notifySuccess("Пост успешно создан")
        } catch (error) {
            console.log(error)
            if (error.message === 'Unauthorized') {
                notifyError('Ошибка авторизации');
            }
            notifyError(error)
        }
    };
    
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
                    <PostCreationSelectGroup handleGroupChange={handleGroupChange} form={form} />
                </div>
                <div className="p-2 flex-fill bd-highlight">
                    <TagSelect handleTagsChange={handleTagsChange} arrayTagsId={searchParams.getAll('tags')} />
                </div>
            </div>
            
            
            <div className="mb-3">
                <label form="exampleFormControlTextarea1" className="form-label">Ссылка на картинку</label>
                <textarea
                    className="form-control"
                    id="exampleFormControlTextarea1"
                    rows="1"
                    onChange={e => setForm({...form, pictureLink: e.currentTarget.value})}
                    value={form.pictureLink}
                ></textarea>
            </div>
           
            <div className="mb-3">
                <label form="exampleFormControlTextarea1" className="form-label">Текст поста</label>
                <textarea
                    className="form-control"
                    id="exampleFormControlTextarea1"
                    rows="5"
                    onChange={e => setForm({...form, text: e.currentTarget.value})}
                    value={form.text}
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