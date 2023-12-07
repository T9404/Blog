import getAddressChain from "../../api/address/GetAddress";
import { useEffect, useState } from "react";

const ConcreteAddress = ({ objectGuid }) => {
    const [addressChain, setAddressChain] = useState([]);
    
    useEffect(() => {
        const fetchData = async () => {
            try {
                const fetchAddressChain = await getAddressChain(objectGuid);
                setAddressChain(fetchAddressChain);
            } catch (error) {
                console.error("Error fetching data:", error);
            }
        };
        
        fetchData();
    }, [objectGuid]);
    
    return (
        <div>
            {addressChain.length > 0 && (
                <>
                    {addressChain.map((address, index) => (
                        <span key={index}>
                            {index > 0 ? ', ' : ''} {address.text}
                        </span>
                    ))}
                </>
            )}
        </div>
    
    );
};

export default ConcreteAddress;