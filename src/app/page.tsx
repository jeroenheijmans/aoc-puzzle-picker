"use client";

import { Complexities, Puzzle, getRandomPuzzle } from "@/puzzles";
import { getRandom } from "@/utils";
import Link from "next/link";
import { useState } from "react";

const complexityColor: Record<Complexities, string> = {
  beginner: "text-sky-500",
  intermediate: "text-lime-600",
  advanced: "text-yellow-500",
  nightmare: "text-red-600",
};

export default function Home() {
  const [puzzle, setPuzzle] = useState<Puzzle>();
  const [complexity, setComplexity] = useState<Complexities>();
  const years = [2015, 2016, 2017, 2018, 2019, 2020, 2021, 2022];
  const days = Array.from({ length: 25 }, (_, i) => i + 1);

  const handleClick = async (name: Complexities) => {
    setComplexity(name);
    const puzzle: Puzzle = {
      url: "",
      name: "",
      year: 0,
      day: 0,
      complexity: 0,
      noSolutionDiff: 0,
    };

    setPuzzle(puzzle);

    const incrementTime = 150;

    let timer = setInterval(() => {
      const year = getRandom(years);
      const day = getRandom(days);
      setPuzzle({ ...puzzle, year, day });
    }, incrementTime);

    setTimeout(async () => {
      clearInterval(timer);

      setPuzzle(await getRandomPuzzle(name));
    }, 3000);
  };

  return (
    <main className="flex min-h-screen flex-col justify-between py-24 px-48">
      <div>
        <div className="text-3xl font-bold pb-16">
          Advent of Code Random Puzzle Picker
        </div>
        <div className="text-xl font-bold">Pick a complexity</div>
        <div className="flex flex-row gap-4 pt-8 pb-16">
          <button
            type="button"
            className="block border border-sky-500 rounded-md text-sky-500 px-3.5 py-2.5 text-lg font-semibold hover:text-white shadow-sm hover:bg-sky-400 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-sky-600"
            onClick={async () => handleClick("beginner")}
          >
            Beginner
          </button>
          <button
            type="button"
            className="block border border-lime-600 rounded-md text-lime-600 px-3.5 py-2.5 text-lg font-semibold hover:text-white shadow-sm hover:bg-lime-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-lime-600"
            onClick={async () => handleClick("intermediate")}
          >
            Intermediate
          </button>
          <button
            type="button"
            className="block border border-yellow-500 rounded-md text-yellow-500 px-3.5 py-2.5 text-lg font-semibold hover:text-white shadow-sm hover:bg-yellow-400 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-yellow-600"
            onClick={async () => handleClick("advanced")}
          >
            Advanced
          </button>
          <button
            type="button"
            className="block border border-red-600 rounded-md text-red-600 px-3.5 py-2.5 text-lg font-semibold hover:text-white shadow-sm hover:bg-red-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-red-600"
            onClick={async () => handleClick("nightmare")}
          >
            Nightmare
          </button>
        </div>
        {puzzle && (
          <div>
            {puzzle.url ? (
              <div>
                <div>
                  I&apos;ve selected{" "}
                  <a
                    href={puzzle.url}
                    target="_blank"
                    className={
                      (complexity ? complexityColor[complexity] : "") +
                      " font-bold"
                    }
                  >
                    {puzzle.year} day {puzzle.day}
                  </a>{" "}
                  for you.
                </div>
                <div className="text-sm pt-2">
                  (complexity score: {puzzle.complexity};{" "}
                  {puzzle.noSolutionDiff == 0 ? (
                    <span>
                      the average number of people have submitted a solution
                    </span>
                  ) : (
                    <span>
                      {Math.abs(puzzle.noSolutionDiff)}{" "}
                      {puzzle.noSolutionDiff < 0 ? "more" : "less"} people have
                      submitted a solution than average
                    </span>
                  )}
                  )
                </div>
                <div className="pt-8">
                  <a
                    className="underline text-sky-500"
                    href={puzzle.url}
                    target="_blank"
                  >
                    Take me to it!
                  </a>
                </div>
              </div>
            ) : (
              <div>
                <div>
                  Looking for {complexity} puzzles; examining: {puzzle.year} day{" "}
                  {puzzle.day}.
                </div>
              </div>
            )}
          </div>
        )}
      </div>

      <div>
        <Link href="about" className="underline">
          About
        </Link>
      </div>
    </main>
  );
}
