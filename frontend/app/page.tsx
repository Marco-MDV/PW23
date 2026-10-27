import NavbarElements from "./components/NavbarElements"
import MainElements from "./components/MainElements"
import Link from "next/link";
export default function Home() {
  return (
    <>
      <header>
        <nav className="flex">
          <NavbarElements/>
        </nav>
      </header>
      <main className="bg-white text-black p-4">
        <MainElements/>
      </main>
      <footer className="border-t border-t-black/50 bg-white text-black flex flex-col gap-2 items-center">
        <p className="text-2xl">
          Developed by <span className="font-bold text-purple-700">MDV</span>
        </p>
        <div className="flex gap-4 font-bold">
          <Link href="https://github.com/Marco-MDV" className="hover:text-purple-700 duration-300">Github</Link>
          <Link href="https://www.linkedin.com/in/marco-de-vincentiis-98299a217/" className="hover:text-purple-700 duration-300">Linkedin</Link>
          <Link href="https://marcodv.com/" className="hover:text-purple-700 duration-300">Personal website</Link>
        </div>
      </footer>
    </>
  );
}
