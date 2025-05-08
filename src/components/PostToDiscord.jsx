import React, { useState } from "react";
import { sendMessageToChannel } from "./discord";

const PostToDiscord = ({ accessToken, guilds }) => {
  const [message, setMessage] = useState("");
  const [selectedGuild, setSelectedGuild] = useState(null);
  const [selectedChannel, setSelectedChannel] = useState(null);

  const handlePostMessage = async () => {
    if (!selectedChannel || !message) return;
    try {
      await sendMessageToChannel(accessToken, selectedChannel, message);
      alert("Message sent successfully!");
    } catch (error) {
      console.error("Error posting message:", error);
    }
  };

  const handleGuildSelection = (guildId) => {
    const guild = guilds.find((g) => g.id === guildId);
    if (guild) {
      setSelectedGuild(guild);
      setSelectedChannel(guild.id);
    }
  };

  return (
    <div>
      <h2>Post Message to Discord</h2>
      {guilds.length > 0 && (
        <div>
          <select
            onChange={(e) => handleGuildSelection(e.target.value)}
            value={selectedGuild ? selectedGuild.id : ""}
          >
            <option value="">Select a Guild</option>
            {guilds.map((guild) => (
              <option key={guild.id} value={guild.id}>
                {guild.name}
              </option>
            ))}
          </select>
        </div>
      )}

      {selectedGuild && (
        <div>
          <textarea
            rows="4"
            value={message}
            onChange={(e) => setMessage(e.target.value)}
            placeholder="Write your message here"
          />
          <button onClick={handlePostMessage}>Post Message</button>
        </div>
      )}
    </div>
  );
};

export default PostToDiscord;
