import {useState} from "react";
import subscribe from "../../api/group/Subscribe";
import unsubscribe from "../../api/group/Unsubcribe";
import notifyError from "../../../util/notification/error/ErrorNotify";
import {useNavigate} from "react-router-dom";

const SubscribeButton = ({ groupId, groupRole, onUpdateSubscribers }) => {
    const [isSubscribed, setIsSubscribed] = useState(groupRole === 'Subscriber');
    const navigate = useNavigate();
    
    const subscribeToGroup = async () => {
        try {
            await subscribe(groupId);
            setIsSubscribed(true);
            if (onUpdateSubscribers) {
                onUpdateSubscribers(1);
            }
        } catch (error) {
            notifyError("Вы не авторизованы, пожалуйста, войдите заново");
            console.log(error);
        }
    }
    
    const unsubscribeFromGroup = async () => {
        try {
            await unsubscribe(groupId);
            setIsSubscribed(false);
            if (onUpdateSubscribers) {
                onUpdateSubscribers(-1);
            }
        } catch (error) {
            console.log(error);
            notifyError("Вы не авторизованы, пожалуйста, войдите заново");
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