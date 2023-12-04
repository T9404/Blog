import {useNavigate, useParams} from "react-router-dom";
import {useEffect, useState} from "react";
import getConcreteCommunity from "../../shared/api/community/GetConcreteCommunity";
import subscribe from "../../shared/api/group/Subscribe";
import unsubscribe from "../../shared/api/group/Unsubcribe";
import SubscribeButton from "../../shared/components/group/SubscribeButton";
import getRole from "../../shared/api/group/GetRole";

const ConcreteCommunityPage = () => {
    const { id } = useParams();
    const [community, setCommunity] = useState();
    const path = process.env.PUBLIC_URL + '/assets/';
    const navigate = useNavigate();
    const [role, setRole] = useState();
    
    
    useEffect( () => {
        const fetchData = async () => {
            try {
                const communityData = await getConcreteCommunity(id);
                setCommunity(communityData);
            } catch (error) {
                navigate('/login')
                localStorage.clear();
            }
        }
        
        const fetchRole = async () => {
            try {
                const roleData = await getRole(id);
                setRole(roleData);
            } catch (error) {
                navigate('/login')
                localStorage.clear();
            }
        }
        
        fetchData();
        fetchRole().then(r => console.log(role));
    }, []);
    
    
    const isAdministrator = () => {
        return community.administrators.some((admin) => admin.email === localStorage.getItem('email'));
    }
    
    return (
        <div>
            {community && (
                <div>
                    <div className="card-header d-sm-flex justify-content-between">
                        <h1>Группа {community.name}</h1>
                        <div className="card-header d-sm-flex justify-content-between">
                            {isAdministrator() && <button className="btn btn-primary m-1">Написать пост</button>}
                            <SubscribeButton groupRole={role} groupId={community.id}/>
                        </div>
                    </div>
                    
                    
                    <p>👥 {community.subscribersCount} подписчиков</p>
                    <p>Тип сообщества: {community.isClosed ? "Закрытое" : "Открытое"}</p>
                    <h3>Администраторы</h3>
                    <div>
                        {community.administrators.map((admin) => (
                            <p>
                                <img
                                    src={path + (admin.gender === 'Male' ? 'male.png' : 'female.png')}
                                    className="card-img"
                                    alt="Gender"
                                />
                                {admin.fullName}
                            </p>
                        ))}
                    </div>
                    {/* Add more properties as needed */}
                </div>
            )}
        </div>
    );
}

export default ConcreteCommunityPage;