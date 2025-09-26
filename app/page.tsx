import Latest from "@/section/home/Latest";
import Hero from "@/section/home/Hero";
import Featured from "@/section/home/Featured";
import Category from "@/section/home/Category";
import Cta from "@/components/Cta";
export default function Home() {
  return (
    <div>
      <Hero />
      <Latest />
      <Featured />
      <Category />
      <Cta />
    </div>
  );
}
