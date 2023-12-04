import {useState} from "react";
import subscribe from "../../api/group/Subscribe";
import unsubscribe from "../../api/group/Unsubcribe";

const SubscribeButton = ({ groupId, groupRole }) => {
    const [isSubscribed, setIsSubscribed] = useState(groupRole === 'Subscriber');
    
    const subscribeToGroup = async () => {
        try {
            await subscribe(groupId);
            setIsSubscribed(true);
        } catch (error) {
            console.log(error);
        }
    }
    
    const unsubscribeFromGroup = async () => {
        try {
            await unsubscribe(groupId);
            setIsSubscribed(false);
        } catch (error) {
            console.log(error);
        }
    }
    
    return (
        <>
            {!isSubscribed && groupRole !== 'Administrator' && (
                <button type="button" className="btn btn-primary" onClick={subscribeToGroup}>
                    Подписаться
                </button>
            )}
            
            {isSubscribed && groupRole !== 'Administrator' && (
                <button type="button" className="btn btn-danger" onClick={unsubscribeFromGroup}>
                    Отписаться
                </button>
            )}
        </>
    )
}

export default SubscribeButton;