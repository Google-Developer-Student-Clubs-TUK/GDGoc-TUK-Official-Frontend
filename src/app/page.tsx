import Title from "./_components/_home/Title";
import Header from "./_components/_layout/Header";
import HomeFooter from "./_components/_layout/HomeFooter";

export default function Home() {
  return (
    <div className="flex h-screen justify-center items-center">
      <Header />
      <Title />
      <HomeFooter />
    </div>
  );
}
