"use client";

import Chart from "chart.js/auto";
import { useEffect, useRef } from "react";

export default function CompanySizeBarChart({
  dates,
  data,
}: {
  dates: string[];
  data: number[];
}) {
  const ref = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    if (!ref.current) return;
    const chart = new Chart(ref.current, {
      type: "bar",
      options: {
        responsive: true,
        maintainAspectRatio: false,
        resizeDelay: 100,
        scales: {
          y: {
            stacked: true,
            ticks: {
              callback: function (value, index, ticks) {
                return `${value}%`;
              },
            },
          },
        },
      },
      data: {
        labels: dates,
        datasets: [
          {
            label: "% Adopted",
            data,
            backgroundColor: "#2c55ffcc",
            stack: "Stack 0",
          },
          {
            label: "% Not Adopted",
            data: data.map((d) => 100 - d),
            backgroundColor: "#ccd6ff66",
            stack: "Stack 0",
          },
        ],
      },
    });

    return () => {
      chart.destroy();
    };
  }, [dates, data]);

  return (
    // <div className="relative md:mx-auto w-80 h-40 sm:w-[30rem] sm:h-60 lg:w-[40rem] lg:h-80 2xl:w-[48rem] 2xl:h-96">
    // <div className="relative w-full h-40 sm:h-60 lg:h-80 2xl:h-96">
    //   <canvas ref={ref}></canvas>
    // </div>
    <div className="relative w-full h-40 sm:h-60 lg:h-80 2xl:h-96">
      <canvas ref={ref} className="max-w-full"></canvas>
    </div>
  );
}
