import axios from "axios";
import { useEffect } from "react";
import { FaDiscord } from "react-icons/fa";
const LoginModel = () => {

  const DISCORD_CLIENT_ID = "1369556722527502460";
  const BASE_URL = "http://localhost:5173";
  const REDIRECT_URI = `${BASE_URL}/api/auth/discord/redirect`;
  const DISCORD_OAUTH_URL = `https://discord.com/oauth2/authorize?client_id=${DISCORD_CLIENT_ID}&response_type=code&redirect_uri=${encodeURIComponent(REDIRECT_URI)}&scope=identify+connections+email+gdm.join+guilds.join`;
  

  const handleDiscordLogin = async () => {
    window.location.href = DISCORD_OAUTH_URL;
  };

  useEffect(() => {
    const fetchData = async ()=>{
      const params = new URLSearchParams(window.location.search);
      const code = params.get('code');
      console.log("code : ",code);
      if (code) {
          try {
              const formData = new URLSearchParams({
                  client_id: import.meta.env.VITE_client_id,
                  client_secret: import.meta.env.VITE_client_secret,
                  grant_type: 'authorization_code',
                  code: code.toString(),
                  redirect_uri: "http://localhost:5173/api/auth/discord/redirect"
              })
              const output = await axios.post("https://discord.com/api/v10/oauth2/token",
                  formData, {
                  headers: {
                      'Content-Type': 'application/x-www-form-urlencoded'
                  }
              });
              console.log("output : ",output);
              if (output.data) {
                  try {
                      const access = output.data.access_token;
                      const userinfo = await axios.get("https://discord.com/api/v10/users/@me", {
                          headers: {
                              'Authorization': `Bearer ${access}`,
                          }
                      });
                      console.log("userinfo.data : ", userinfo.data);
                      console.log("output.data", output.data)
                  } catch (error) {
                      console.log("err : ", error);
                  }
              }
          } catch (error) {
              console.log("error: ", error)
          }
  
      }
    }
    fetchData();
    
  },[])
  

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
  </div>
  );
};

export default LoginModel;
