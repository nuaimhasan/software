import { useRef, useState } from "react";
import { FaPrint } from "react-icons/fa";
import FullInvoice from "./FullInvoice";

import { Print } from "print-react";
import DueCurrentInvoice from "./DueCurrentInvoice";
import DueInvoice from "./DueInvoice";
import { useParams } from "react-router-dom";
import { useSingleClientQuery } from "../../../../Redux/client/clientApi";

export default function MakeInvoice() {
  const { id } = useParams();
  const componentRef = useRef();
  const [activeInvoice, setActiveInvoice] = useState(1);
  let query = {};
  query["role"] = "seo";
  query["id"] = id;
  const { data, isLoading } = useSingleClientQuery({ ...query });
  const client = data?.data;

  if (isLoading) return <div>Loading...</div>;

  return (
    <section>
      <div className="flex items-center justify-between">
        <div className="flex gap-2 text-sm">
          <button
            onClick={() => setActiveInvoice(1)}
            className={`rounded bg-base-100 px-4 py-2 shadow ${activeInvoice == 1 ? "bg-primary text-base-100" : "text-neutral"}`}
          >
            Full Details
          </button>
          <button
            onClick={() => setActiveInvoice(2)}
            className={`rounded bg-base-100 px-4 py-2 shadow ${activeInvoice == 2 ? "bg-primary text-base-100" : "text-neutral"}`}
          >
            Due Only
          </button>
          <button
            onClick={() => setActiveInvoice(3)}
            className={`rounded bg-base-100 px-4 py-2 shadow ${activeInvoice == 3 ? "bg-primary text-base-100" : "text-neutral"}`}
          >
            Due & Current Month
          </button>
        </div>

        <div className="flex gap-3">
          <button
            onClick={async () => {
              await componentRef.current.openPrintDialog();
            }}
            className="rounded bg-primary px-3.5 py-3 text-base-100"
          >
            <FaPrint />
          </button>
        </div>
      </div>

      {/* invoice */}

      <Print ref={componentRef} printWidth="100%" marginTop={0} marginLeft={0}>
        {activeInvoice == 1 && (
          <FullInvoice ref={componentRef} client={client} />
        )}
        {activeInvoice == 2 && <DueInvoice ref={componentRef}  client={client} />}
        {activeInvoice == 3 && <DueCurrentInvoice ref={componentRef}  client={client} />}
      </Print>
    </section>
  );
}
