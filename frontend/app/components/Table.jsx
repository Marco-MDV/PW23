
import BoxTableDue from "./BoxTableDue";
import BoxTableUno from "./BoxTableUno";

export default function Table({ data }) {
  return (
    <div className="grid w-full min-w-0 max-w-full grid-cols-1 gap-4 pt-8 lg:grid-cols-2">
      <div className="flex w-full min-w-0 flex-col gap-4">
        <BoxTableUno data={data} />
      </div>

      <div className="flex w-full min-w-0 flex-col gap-4 justify-between">
        <BoxTableDue data={data} />
      </div>
    </div>
  );
}
