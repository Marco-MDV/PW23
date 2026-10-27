export default function NavbarElements() {
  return (
    <>
      <div className="hidden md:flex items-center gap-3 px-3 py-4 bg-lime-600  ">
        <svg
          width="20"
          height="20"
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 512 512"
          fill="#000000"
        >
          <path
            d="M80 352c0 19.198 13.864 24.531 26.667 36.271v38.396c0 11.729 9.599 21.334 21.333 21.334h21.333c11.734 0 21.334-9.604 21.334-21.334v-21.333h170.666v21.333c0 11.729 9.604 21.334 21.334 21.334H384c11.729 0 21.333-9.604 21.333-21.334v-38.396C418.136 376.531 432 370.136 432 352V148.334C432 73.667 349.864 64 256 64S80 73.667 80 148.334V352zm80 15.989c-18.136 0-32-13.864-32-32 0-18.135 13.864-32 32-32s32 13.865 32 32c0 18.136-13.864 32-32 32zm192 0c-18.136 0-32-13.864-32-32 0-18.135 13.864-32 32-32s32 13.865 32 32c0 18.136-13.864 32-32 32zm32-122.656H128V138.667h256v106.666z"
            fill="#FFF"
          />
        </svg>
        <p className="text-white font-bold text-lg">PW23</p>
      </div>
      <div className="px-3 py-4 bg-white w-full text-black flex justify-between">
        <div>
          <h1 className="text-2xl font-bold">Dashboard risultati logistici</h1>
          <p className="text-black/50">
            Pianificazione e confronto economico dei percorsi di consegna
          </p>
          <div className="flex gap-5">
            <p className="font-bold border-r border-black/50 pr-5">
              Velotto S.r.l
            </p>
            <p className="text-black/50">Via Luigi Volpicella 214, Napoli</p>
          </div>
        </div>
        <div className="hidden md:flex justify-center items-center gap-4">
          <svg
            width="25"
            height="25"
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 512 512"
            fill="#000000"
            aria-hidden="true"
          >
            <path d="M96.9 270.3V363c0 2.9 1.5 5.5 4 7l132 75.9c5.3 3.1 12-.8 12-7v-93.8c0-2.9-1.5-5.5-4-7l-132-74.9c-5.4-2.9-12 1-12 7.1z" />
            <path d="M280.9 445.9L413 370c2.5-1.4 4-4.1 4-7v-93.7c0-6.2-6.6-10-12-7l-132 75.9c-2.5 1.4-4 4.1-4 7V439c-.1 6.1 6.6 10 11.9 6.9z" />
            <path d="M249 65.1L37 188.9c-5.4 3.1-5.4 10.8 0 13.9l212 117.8c4.9 2.8 11 2.8 15.9 0L453 212.9c5.3-3.1 7 .8 7 7v153.4c0 6.8 3.9 10 11 10 4.4 0 10-3.2 10-10V201.5c0-2.9-1.5-5.5-4-7L264.9 65.1c-4.9-2.8-11-2.8-15.9 0z" />
          </svg>
          <div>
            <p className="text-md text-black/50 font-bold">
              Progetto universitario
            </p>
            <p className="text-md text-black/50">Logistica e Trasporti</p>
          </div>
        </div>
      </div>
    </>
  );
}
