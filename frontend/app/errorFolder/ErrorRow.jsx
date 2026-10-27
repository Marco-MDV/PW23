export default function ErrorRow({errorMessage}) {
  return (
    <div className="w-full border-2 border-red-800 bg-red-300 text-red-700 flex justify-center items-center rounded-lg text-4xl">
        {errorMessage?errorMessage:"Errore sconosciuto"}
        <svg xmlns="http://www.w3.org/2000/svg" width="40" height="40" viewBox="0 0 512 512"><path fill="none" stroke="#c10007" strokeLinecap="round" strokeLinejoin="round" strokeWidth="32" d="M85.57 446.25h340.86a32 32 0 0 0 28.17-47.17L284.18 82.58c-12.09-22.44-44.27-22.44-56.36 0L57.4 399.08a32 32 0 0 0 28.17 47.17Z"/><path fill="none" stroke="#c10007" strokeLinecap="round" strokeLinejoin="round" strokeWidth="32" d="m250.26 195.39l5.74 122l5.73-121.95a5.74 5.74 0 0 0-5.79-6h0a5.74 5.74 0 0 0-5.68 5.95Z"/><path fill="#c10007" d="M256 397.25a20 20 0 1 1 20-20a20 20 0 0 1-20 20Z"/></svg>
    </div>
  )
}
