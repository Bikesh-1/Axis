import SoftAurora from "../components/SoftAurora";
export default function Herosection() {
  return (
    <div className="relative z-10 flex items-center justify-center w-full h-screen overflow-hidden bg-black text-white">

      {/* Aurora Background */}
      <div className="absolute inset-0">
        <SoftAurora
          speed={0.6}
          scale={1.5}
          brightness={1}
          color1="#f7f7f7"
          color2="#e100ff"
          noiseFrequency={2.5}
          noiseAmplitude={1}
          bandHeight={0.5}
          bandSpread={1}
          octaveDecay={0.1}
          layerOffset={0}
          colorSpeed={1}
          enableMouseInteraction={true}
          mouseInfluence={0.25}
        />
      </div>
      <div className="absolute w-full top-0 left-0 flex items-center justify-between p-2">
        <img className="w-40" src="https://ik.imagekit.io/jwt52yyie/e33394b1-1bae-47ad-b3ac-a7d1723e23db.png?updatedAt=1779300879872" alt="" />
        <div className=" px-4 py-1 rounded-full border border-white/20 bg-white/5 backdrop-blur-md text-sm text-gray-300">
          Organize Everything Smarter
        </div>
        <div className="flex items-center justify-center gap-8">
          <button className=" text-white px-5 py-2 rounded-xl font-semibold hover:scale-105 transition duration-300 shadow-lg cursor-pointer border-white border">
            Explore
          </button>
          <button className="bg-white text-black px-5 py-2 rounded-xl font-semibold hover:scale-105 transition duration-300 shadow-lg cursor-pointer">
            Login
          </button>
        </div>

      </div>
      <div className="relative z-20 flex flex-col items-center justify-center text-center px-4">
        <h1 className="text-4xl md:text-6xl font-bold tracking-tight">
          EVERYTHING IMPORTANT.
          <span className="italic font-black text-transparent bg-clip-text bg-gradient-to-r from-white via-violet-200 to-violet-400 underline underline-offset-8">
            ONE PLACE.
          </span>

        </h1>

        <p className="mt-6 max-w-2xl text-white text-lg md:text-xl">
          Store your important links, media, notes, and resources in one clean and organized space.
        </p>
        <div className="flex items-center justify-center gap-8 mt-10">
          <button className=" text-white px-5 py-2 rounded-xl font-semibold hover:scale-105 transition duration-300 shadow-lg cursor-pointer border-white border">
            Contact Us
          </button>
          <button className="bg-white text-black px-5 py-2 rounded-xl font-semibold hover:scale-105 transition duration-300 shadow-lg cursor-pointer">
            How its Work?
          </button>
        </div>
      </div>
    </div>
  );
}