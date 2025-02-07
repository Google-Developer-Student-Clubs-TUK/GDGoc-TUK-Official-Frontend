import Title from "./_components/_home/Title";
import Header from "./_components/_layout/Header";
import HomeFooter from "./_components/_layout/HomeFooter";

export default function Home() {
  return (
    <div className="flex h-[400vh]">
      <Header />
      <Title />

      <HomeFooter />
    </div>
  );
}
