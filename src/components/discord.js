import axios from "axios";

export const getUserGuilds = async (accessToken) => {
    try {
        console.log("accessToken : ", accessToken);
        const response = await axios.get("https://discord.com/api/v10/users/@me/guilds", {
            headers: {
                Authorization: `Bearer ${accessToken}`,
            },
        });
        return response.data;
    } catch (error) {
        console.error("Error fetching user guilds:", error);
        throw error;
    }
};


export const sendMessageToChannel = async (accessToken, channelId, message) => {
    try {

        console.log("accessToken : ",accessToken);
        console.log("channelId : ",channelId);
        console.log("message : ",message);
        
        const response = await axios.post(
            `https://discord.com/api/v10/channels/${channelId}/messages`,
            { content: message },
            {
                headers: {
                    Authorization: `Bearer ${accessToken}`,
                },
            }
        );
        console.log("response.data : ", response.data);
        return response.data;
    } catch (error) {
        console.error("Error sending message to Discord channel:", error);
        throw error;
    }
};
