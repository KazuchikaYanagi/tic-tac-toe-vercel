import { Link } from "react-router-dom";
import Button from "../components/Button";
import heroImage from "../../public/tic-tac-toe_lg-no_background.png";
import ticTacToeImage from "../../public/tic-tac-toe_no-background.png";
import goodEffectBrainImage from "../../public/good_effect_brains.png";

const Home = () => {
  return (
    <>
      <div className="flex flex-col items-center h-screen text-center bg-red-900 justify-evenly bg-gradient-to-t from-blue-900">
        <img src={heroImage} alt="logo" className="w-60 md:w-80" />
        <Link to="/signIn">
          <Button>Login</Button>
        </Link>
      </div>

      <section className="w-full h-full p-8 bg-stone-800" id="about">
        <div className="flex flex-col items-center justify-around pt-5 md:flex-row pb-14">
          <img src={ticTacToeImage} alt="tic-tac-toe" className="w-52" />
          <article className="md:w-1/2 font-MICRO text-stone-200">
            <h1 className="py-5 text-3xl md:text-5xl">
              How to play tic-tac-toe?
            </h1>
            <p className="text-base md:text-lg font-PIXELIFY">
              The rules of Tic-Tac-Toe are very simple. The player who first
              forms a row of their marks vertically, horizontally, or diagonally
              wins. On your turn, you can place your piece anywhere you like on
              the board. Compete to see who can form a row first!
            </p>
          </article>
        </div>

        <div className="flex flex-col items-center justify-around py-5 md:flex-row-reverse">
          <img src={goodEffectBrainImage} alt="brain" className="h-auto w-52" />
          <article className="pt-5 font-MICRO text-stone-200 md:p-0">
            <h1 className="py-5 text-3xl md:text-5xl">
              How good to our brains?
            </h1>
            <ol className="text-base md:text-lg md:w-[50vw] font-PIXELIFY px-3 md:p-0">
              <li>
                Enhances Strategic Thinking:
                <p>
                  Playing Tic-Tac-Toe requires planning and anticipating your
                  opponent's moves, which helps develop strategic thinking and
                  problem-solving skills.
                </p>
              </li>
              <li>
                Improves Decision-Making Skills:
                <p>
                  The game encourages quick and thoughtful decision-making, as
                  players must choose the best moves to maximize their chances
                  of winning while blocking their opponent.
                </p>
              </li>
              <li>
                Boosts Pattern Recognition:
                <p>
                  By identifying patterns and predicting outcomes, players
                  strengthen their ability to recognize and respond to visual
                  and logical patterns, a skill applicable in many areas of
                  life.
                </p>
              </li>
            </ol>
          </article>
        </div>
      </section>
    </>
  );
};

export default Home;
