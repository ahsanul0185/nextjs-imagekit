import Image from "next/image";
import Header from "./components/Header";
import Video from "./components/Video";

export default function Home() {
  return (
    <div>
      {/* <Header/> */}
      <div  className="px-16 py-8">
        <h2 className="mb-3 text-4xl font-bold">Reels</h2>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8">
        {new Array(6).fill(0).map((_, idx) => <Video key={idx}/>)}
      </div>
      </div>
    </div>
  );
}
