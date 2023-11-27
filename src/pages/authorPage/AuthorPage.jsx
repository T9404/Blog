import {useEffect, useState} from "react";
import getAllAuthor from "../../shared/api/author/GetAllAuthor";
import formatDateWithoutHHSS from "../../util/FormatDateWithoutHHSS";
import styles from './style.module.css';
import {useNavigate} from "react-router-dom";

const AuthorPage = () => {
    const navigate = useNavigate();
    const [authors, setAuthors] = useState([]);
    const [bestAuthors, setBestAuthors] = useState([]);
    
    const path = process.env.PUBLIC_URL + '/assets/';
    
    useEffect(() => {
        const fetchData = async () => {
            try {
                const fetchAuthors = await getAllAuthor();
                const sortedAuthors = [...fetchAuthors].sort((a, b) => a.fullName.localeCompare(b.fullName));
                setAuthors(sortedAuthors);
                handleSort(sortedAuthors);
            } catch (error) {
                console.log(error);
            }
        };
        
        fetchData();
    }, []);
    
    const handleCardClick = (authorName) => {
        navigate(`/?page=1&pageSize=5&search=${authorName}&sorting=CreateDesc`);
    }
    
    const handleSort = (fetchAuthors) => {
        const authorsCopy = [...fetchAuthors];
        
        const popularitySort = (a, b) => {
            if (a.posts > b.posts) {
                return -1;
            }
            if (a.posts < b.posts) {
                return 1;
            }
            if (a.likes > b.likes) {
                return -1;
            }
            if (a.likes < b.likes) {
                return 1;
            }
            return 0;
        };
        
        setBestAuthors(authorsCopy.sort(popularitySort).slice(0, 3));
    };
    
    const isBestAuthor = (author) => {
        const index = bestAuthors.findIndex((bestAuthor) =>
            bestAuthor.fullName === author.fullName && bestAuthor.created === author.created
        );
        return index !== -1 ? index + 1 : false;
    };
    
    return (
        <div>
            <h1>Authors</h1>
            <div>
                {authors.map((author) => (
                    <div
                        className={`card mb-3 ${styles.imageCard}`}
                        key={author.id}
                        onClick={() => handleCardClick(author.fullName)}
                    >
                        <div className="row no-gutters">
                            <div className="col-md-4">
                                <img
                                    src={path + (author.gender === 'Male' ? 'male.png' : 'female.png')}
                                    className="card-img"
                                    alt="Gender"
                                />
                            </div>
                            <div className="col-md-8">
                                <div className="card-body">
                                    <h5 className="card-title">
                                        {author.fullName} <em>Создан {formatDateWithoutHHSS(author.created)}</em>
                                    </h5>
                                    <p className="card-text">
                                        <strong>Дата рождения:</strong> {formatDateWithoutHHSS(author.birthDate)}
                                    </p>
                                    <div className="badge bg-primary text-wrap">
                                        Постов {author.posts}, Лайков {author.likes}
                                    </div>
                                    {isBestAuthor(author) && (
                                        <div className="badge bg-success text-wrap">Лучший автор, Топ: {isBestAuthor(author)}</div>
                                    )}
                                </div>
                            </div>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default AuthorPage;