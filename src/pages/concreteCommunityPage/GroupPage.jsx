import React, {useEffect, useState} from "react";
import getAllGroups from "../../shared/api/group/GetGroups";
import getRole from "../../shared/api/group/GetRole";
import subscribe from "../../shared/api/group/Subscribe";
import ConcreteGroup from "../../shared/components/group/ConcreteGroup";
import {useNavigate} from "react-router-dom";
import LoadingComponent from "../../shared/components/loading/Loading";

const GroupPage = () => {
    const [group, setGroup] = useState([]);
    const navigate = useNavigate();
    const [loading, setLoading] = useState(true);
    
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
                setLoading(false);
            } catch (error) {
                navigate('/login')
                localStorage.clear();
            }
        };
        
        fetchData();
    }, []);
    
    if (loading) {
        return LoadingComponent();
    }
    
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
