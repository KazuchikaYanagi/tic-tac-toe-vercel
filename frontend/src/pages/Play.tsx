import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import Game from "../components/Game";

interface UserData {
  _id: string;
  username: string;
  matches: number;
  win: number;
}

const Play: React.FC = () => {
  const navigate = useNavigate();
  const [user, setUser] = useState<UserData | null>(null);
  const [roomId, setRoomId] = useState<string>("");

  const logOut = async (): Promise<void> => {
    await fetch(`https://tic-tac-toe-7u0u.onrender.com/api/users/logout`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
      credentials: "include",
    });
    navigate("/signIn");
  };

  const loadProfile = async (): Promise<void> => {
    try {
      const res = await fetch(
        `https://tic-tac-toe-7u0u.onrender.com/api/users/play`,
        {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
          },
          credentials: "include", // include cookies
        }
      );
      const data = await res.json();
      console.log(data);

      if (!res.ok) {
        console.log(res);
        throw new Error(`HTTP error! status: ${res.status}`);
      }

      setUser(data);
    } catch (error) {
      console.log(error);
      console.error("Error loading profile:", error);
      navigate("/");
    }
  };

  useEffect(() => {
    loadProfile();
  }, []);

  return (
    <div className="min-h-screen text-stone-200 bg-stone-800">
      {user && roomId ? (
        <div></div>
      ) : (
        <div className="flex justify-around pt-24 mb-10">
          <div className="flex items-center justify-center gap-4 mt-1 text-xl font-MICRO">
            <h1 className="md:mr-5 md:text-3xl">
              <span className="uppercase">{user?.username}</span>'s Stats
            </h1>
            <table className="border border-spacing-2">
              <tr className="border border-separate">
                <th className="p-2 text-center border-4">matches</th>
                <th className="p-2 text-center border-4">wins</th>
              </tr>
              <tr className="border">
                <td className="p-2 text-center border-4">{user?.matches}</td>
                <td className="p-2 text-center border-4">{user?.win}</td>
              </tr>
            </table>
          </div>

          <button
            onClick={logOut}
            className="text-base md:text-3xl font-MICRO text-stone-500 hover:text-stone-400"
          >
            Log out
          </button>
        </div>
      )}

      <div className="pt-20 text-center ">
        <span className="pr-3 text-3xl font-MICRO">Room ID:</span>
        <input
          type="text"
          value={roomId}
          onChange={(e) => setRoomId(e.target.value)}
          className="px-2 py-1 border-none outline-none font-PIXELIFY bg-stone-600 text-stone-200"
          placeholder="Enter Room ID"
        />
      </div>

      {user && roomId && (
        <div className="mt-3">
          <Game
            userId={user._id}
            username={user.username}
            roomId={roomId}
            setRoomId={setRoomId}
          />
        </div>
      )}
    </div>
  );
};

export default Play;
