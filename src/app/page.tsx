import BgGradient from "@/components/common/BgGradient";
import HeroSection from "@/components/home/HeroSection";

export default function Home() {
  return (
    <div className="relative w-full">
      <BgGradient />
      <div className="flex flex-col w-full">
        <HeroSection />
      </div>
    </div>
  );
}
