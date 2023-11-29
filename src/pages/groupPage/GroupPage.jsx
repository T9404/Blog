import {useEffect, useState} from "react";
import getAllGroups from "../../shared/api/group/GetGroups";
import getRole from "../../shared/api/group/GetRole";
import subscribe from "../../shared/api/group/Subscribe";
import ConcreteGroup from "../../shared/api/group/ConcreteGroup";
import {useNavigate} from "react-router-dom";

const GroupPage = () => {
    const [group, setGroup] = useState([]);
    const navigate = useNavigate();
    
    useEffect(() => {
        const fetchData = async () => {
            try {
                const fetchedGroups = await getAllGroups();
                const groupsWithRoles = await Promise.all(
                    fetchedGroups.map(async (group) => {
                        const role = await getRole(group.id);
                        return { ...group, role };
                    })
                );
                setGroup(groupsWithRoles);
            } catch (error) {
                navigate('/login')
                localStorage.clear();
            }
        };
        
        fetchData();
    }, []);
    
    
    
    return (
        <div>
            <div>
                <div className="card-body">
                    {group.map((group) => (
                        <div key={group.id} className="card mb-3 bg-light">
                            <ConcreteGroup group={group}/>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
};

export default GroupPage;
