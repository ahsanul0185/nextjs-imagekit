import Image from "next/image";
import Header from "./components/Header";
import Videos from "./components/Videos";

export default function Home() {
  return (
    <div>
      <div  className="px-16 py-8">
        <h2 className="mb-8 text-4xl font-bold">Reels</h2>

        <Videos />
      </div>
    </div>
  );
}
