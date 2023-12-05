import getConcreteCommunity from "../shared/api/community/GetConcreteCommunity";

const convertCommunityIdToName = async (communityId) => {
    try {
        const response = await getConcreteCommunity(communityId);
        return response.name;
    } catch (error) {
        throw error;
    }
}

export default convertCommunityIdToName;