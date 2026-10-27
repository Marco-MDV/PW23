export default function BoxDataRow({svg, title, value, subTitle, customBg}) {
  return (
    <div className="flex gap-4 items-center border-2 border-black/50 p-2 rounded-md hover:bg-black/10 duration-150">
        <div className={`${customBg} w-10 h-10 rounded flex items-center justify-center`}>
            {svg}
        </div>
        <div>
            <p className="text-black/50 font-bold text-xs">{title}</p>
            <p className=" font-bold text-lg">{value}</p>
            <p className="text-black/50 text-xs">{subTitle}</p>
        </div>
    </div>
  )
}
