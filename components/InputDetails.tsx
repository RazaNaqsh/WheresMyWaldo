import React, { useState } from "react";
import { useRouter } from "next/navigation";
import { formatTime } from "@/utils/Functions";

interface InputDetailsProps {
  setGameWon: React.Dispatch<React.SetStateAction<boolean>>;
  seconds: number;
}

const InputDetails: React.FC<InputDetailsProps> = ({ seconds, setGameWon }) => {
  const router = useRouter();

  const [winner, setWinner] = useState<string>("");

  const submitWinner = async (e: React.FormEvent) => {
    e.preventDefault();
    console.log(seconds);
    try {
      const response = await fetch("/api/score", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ name: winner, seconds }),
      });

      if (response.ok) {
        const data = await response.json();
        console.log(data);

        setGameWon(false);
        router.push("/Leaderboards");
      } else {
        alert(response.statusText);
        console.error("Error saving winner:", response.statusText);
      }
    } catch (error) {
      console.error("Error saving winner:", error);
    }
  };

  return (
    <div className="fixed top-0 left-0 w-full h-full bg-black bg-opacity-50 flex justify-center items-center z-50">
      <div className="bg-black p-8 rounded shadow-md">
        <h2
          className=" text-center text-white t
        ext-2xl font-semibold mb-4"
        >
          You Completed the game in {formatTime(seconds)} min
        </h2>
        <h2
          className=" text-center text-white t
        ext-xl font-semibold mb-4"
        >
          Enter Your Name
        </h2>
        <div>
          <form onSubmit={submitWinner}>
            <input
              type="text"
              placeholder="name..."
              className="bg-gray-100 w-[350px] px-3 py-2 rounded-md my-4 text-black"
              name="winner"
              value={winner}
              onChange={(e) => setWinner(e.target.value)}
            />

            <button className="block m-auto bg-blue-500 hover:bg-blue-600 text-white py-2 px-4 rounded">
              Submit
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default InputDetails;
