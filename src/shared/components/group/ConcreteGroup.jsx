import subscribe from "../../api/group/Subscribe";
import unsubscribe from "../../api/group/Unsubcribe";
import {useState} from "react";

const ConcreteGroup = ({ group }) => {
    const [isSubscribed, setIsSubscribed] = useState(group.role === 'Subscriber');
    
    const subscribeToGroup = async () => {
        try {
            await subscribe(group.id);
            setIsSubscribed(true);
        } catch (error) {
            console.log(error);
        }
    }
    
    const unsubscribeFromGroup = async () => {
        try {
            await unsubscribe(group.id);
            setIsSubscribed(false);
        } catch (error) {
            console.log(error);
        }
    }
    
    return (
        <div className="card-body d-flex justify-content-between align-items-center">
            <div>
                <h2 className="card-text">{group.name}</h2>
            </div>
            
            {!isSubscribed && group.role !== 'Administrator' && (
                <button type="button" className="btn btn-primary" onClick={subscribeToGroup}>
                    Subscribe
                </button>
            )}
            
            {isSubscribed && group.role !== 'Administrator' && (
                <button type="button" className="btn btn-danger" onClick={unsubscribeFromGroup}>
                    Unsubscribe
                </button>
            )}
        </div>
    )
};

export default ConcreteGroup;