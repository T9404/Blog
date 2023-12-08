import React, {useEffect, useState} from "react";
import getAllAuthor from "../../shared/api/author/GetAllAuthor";
import formatDateWithoutHHSS from "../../util/converter/FormatDateWithoutHHSS";
import styles from './style.module.css';
import {useNavigate} from "react-router-dom";
import LoadingComponent from "../../shared/components/loading/Loading";
import notifyError from "../../util/notification/error/ErrorNotify";

const AuthorPage = () => {
    const navigate = useNavigate();
    const [authors, setAuthors] = useState([]);
    const [bestAuthors, setBestAuthors] = useState([]);
    const [loading, setLoading] = useState(true);
    const path = process.env.PUBLIC_URL + '/assets/';
    
    useEffect(() => {
        const fetchData = async () => {
            try {
                const fetchAuthors = await getAllAuthor();
                const sortedAuthors = [...fetchAuthors].sort((a, b) => a.fullName.localeCompare(b.fullName));
                setAuthors(sortedAuthors);
                handleSort(sortedAuthors);
            } catch (error) {
                notifyError(error.message);
            } finally {
                setLoading(false);
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
    
    const getBadgeColorClass = (rating) => {
        if (rating === 1) {
            return 'bg-warning';
        } else if (rating === 2) {
            return 'bg-info';
        } else {
            return 'bg-success';
        }
    };
    
    const isBestAuthor = (author) => {
        const index = bestAuthors.findIndex((bestAuthor) =>
            bestAuthor.fullName === author.fullName && bestAuthor.created === author.created
        );
        return index !== -1 ? index + 1 : false;
    };
    
    if (loading) {
        return LoadingComponent();
    }
    
    return (
        <div className="row row-cols-1 row-cols-md-2 g-4">
            {authors.map((author) => (
                <div key={author.id} className="col">
                    <div
                        className={`card mb-3 ${styles.imageCard}`}
                        onClick={() => handleCardClick(author.fullName)}
                    >
                        <div className="row no-gutters">
                            <div className="col-md-4">
                                <div className={styles.imageCardOverlay}>
                                    <img
                                        src={path + (author.gender === 'Male' ? 'male.png' : 'female.png')}
                                        className="card-img"
                                        alt="Gender"
                                    />
                                    {isBestAuthor(author) && (
                                        <img
                                            src={path + `crown_${isBestAuthor(author)}.svg`}
                                            className={`card-img ${styles.overlay}`}
                                            alt="Overlay"
                                        />
                                    )}
                                </div>
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
                                        <div className={`badge ${getBadgeColorClass(isBestAuthor(author))} text-wrap`}>
                                            Лучший автор, Топ: {isBestAuthor(author)}
                                        </div>
                                    )}
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            ))}
        </div>
    );
};

export default AuthorPage;