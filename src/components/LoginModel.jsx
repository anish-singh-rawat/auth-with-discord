import axios from "axios";
import { useEffect, useState } from "react";
import { FaDiscord } from "react-icons/fa";
import { getUserGuilds } from "./discord";
import PostToDiscord from "./PostToDiscord";
const LoginModel = () => {
  const [accessToken, setAccessToken] = useState(null);
  const [guilds, setGuilds] = useState([]);

  const DISCORD_CLIENT_ID = "1369556722527502460";
  const BASE_URL = "http://localhost:5173";
  const REDIRECT_URI = `${BASE_URL}`;
  const DISCORD_OAUTH_URL = `https://discord.com/oauth2/authorize?client_id=${DISCORD_CLIENT_ID}&response_type=code&redirect_uri=${encodeURIComponent(REDIRECT_URI)}&scope=identify+guilds+guilds.join+guilds.members.read`;
  

  const handleDiscordLogin = async () => {
    window.location.href = DISCORD_OAUTH_URL;
  };

  const fetchData = async () => {
    const params = new URLSearchParams(window.location.search);
    const code = params.get("code");
    if (code) {
      console.log("first",code);
      try {
        const formData = new URLSearchParams({
          client_id: import.meta.env.VITE_client_id,
          client_secret: import.meta.env.VITE_client_secret,
          grant_type: "authorization_code",
          code: code.toString(),
          redirect_uri: "http://localhost:5173",
        });

        const output = await axios.post("https://discord.com/api/v10/oauth2/token",
          formData, {
          headers: {
              'Content-Type': 'application/x-www-form-urlencoded'
          }
      });
        console.log("output  : ",output);

        const access_token = output.data.access_token;
        setAccessToken(access_token);
        const userGuilds = await getUserGuilds(access_token);
        console.log("userGuilds : ",userGuilds);
        setGuilds(userGuilds);
      } catch (error) {
        console.log("Error during Discord authentication:", error);
      }
    }
  };

  useEffect(() => {
    fetchData();
  }, []);
  

  return (
    <div className="flex flex-col items-center justify-center text-white ">
    <div className="bg-black bg-opacity-70 rounded-lg p-8 shadow-xl w-5/6 md:w-2/4">
      <div className="flex flex-col items-center mb-6">
        <p className="text-3xl font-bold mb-4">Sign In using Discord</p>
        <p className="text-lg">Join our community of developers and get exclusive updates and support.</p>
      </div>

      <div
        className="flex justify-center items-center cursor-pointer mt-6 "
        onClick={handleDiscordLogin}
      >
        <div
          className="text-white h-12 flex justify-center items-center rounded-md font-bold text-xl cursor-pointer	"
          style={{
            backgroundColor: '#7289da',
            border: '1px solid #2c2f38',
            width : '100px',
          }}
        >
          <FaDiscord className="mr-3 text-white text-2xl" /> Discord
        </div>
      </div>

    </div>
    {
      guilds.length > 0 && <PostToDiscord accessToken={accessToken} guilds={guilds}/>
    }
  </div>
  );
};

export default LoginModel;
