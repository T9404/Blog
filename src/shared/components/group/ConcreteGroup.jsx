import subscribe from "../../api/group/Subscribe";
import unsubscribe from "../../api/group/Unsubcribe";
import {useState} from "react";
import {useNavigate} from "react-router-dom";
import SubscribeButton from "./SubscribeButton";

const ConcreteGroup = ({ group }) => {
    const navigate = useNavigate();
    
    
    const navigateToCommunities = () => {
        console.log(group.id)
        navigate(`/communities/${group.id}`);
    }
    
    return (
        <div className="card-body d-flex justify-content-between align-items-center">
            <div onClick={navigateToCommunities}>
                <h2 className="card-text">{group.name}</h2>
            </div>
            
            <SubscribeButton groupId={group.id} groupRole={group.role} />
        </div>
    )
};

export default ConcreteGroup;