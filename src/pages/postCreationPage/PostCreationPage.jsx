import React, {useState} from "react";
import tagConverter from "../../shared/components/tagConverter/TagConverter";
import TagSelect from "../../shared/components/tagConverter/Tag";
import PostCreationSelectGroup from "../../shared/components/postCreation/PostCreationSelectGroup";

const PostCreationPage = () => {
    
    const [form, setForm] = useState({
        searchQuery: '',
        sorting: 'CreateDesc',
        minReadingTime: '',
        maxReadingTime: '',
        pageSize: 5,
        onlyMyCommunities: false,
        tags: [],
        address: []
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
                        onChange={e => setForm({...form, searchQuery: e.currentTarget.value})}
                        value={form.searchQuery}
                    />
                </div>
                <div className="p-2 flex-fill bd-highlight">
                    <input
                        type="text"
                        className="form-control"
                        placeholder="Время чтения"
                        aria-label="Recipient's username"
                        aria-describedby="button-addon2"
                        onChange={e => setForm({...form, minReadingTime: e.currentTarget.value})}
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
                <textarea className="form-control" id="exampleFormControlTextarea1" rows="1"></textarea>
            </div>
           
            <div className="mb-3">
                <label form="exampleFormControlTextarea1" className="form-label">Текст поста</label>
                <textarea className="form-control" id="exampleFormControlTextarea1" rows="5"></textarea>
            </div>
            
            <div className="mb-3">
                <h1>Адрес</h1>
                
            </div>
            
            <div className="d-flex flex-column">
                <button
                    type="button"
                    className="btn btn-primary align-self-end w-auto"
                    onClick={() => {}}
                >
                    Создать пост
                </button>
            </div>
            
        </div>
    );
}

export default PostCreationPage;