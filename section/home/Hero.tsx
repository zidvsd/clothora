import ShopButton from "@/components/buttons/ShopButton";
import ViewLatestButton from "@/components/buttons/ViewLatestButton";
export default function Hero() {
  return (
    <div className="bg-home-background">
      <div className="flex  flex-col items-center custom-container justify-center text-center py-48">
        <h1 className="text-4xl lg:text-6xl font-light text-center leading-loose">
          Refined Simplicity
        </h1>
        <p className="text-neutral-600 font-light">
          Thoughtfully designed essentials that transcend seasons and trends
        </p>
        <div className="flex flex-row items-center justify-center gap-4 mt-4">
          <ShopButton />
          <ViewLatestButton />
        </div>
      </div>
    </div>
  );
}
