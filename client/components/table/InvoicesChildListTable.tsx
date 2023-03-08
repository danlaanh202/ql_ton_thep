import { IInvoiceVar } from "@/types";
import callApi from "@/utils/callApi";
import { useEffect, useState } from "react";
import InvoiceListTable from "./InvoiceListTable";

const InvoicesChildListTable = ({ id }: { id: string }) => {
  const [data, setData] = useState<IInvoiceVar[]>([]);

  useEffect(() => {
    if (id) {
      callApi.getInvoicesById(id).then((res) => {
        setData(res.data);
        console.log(res.data);
      });
    }
  }, [id]);
  // console.log(data);
  return (
    <div>
      <InvoiceListTable data={data} setData={setData} isChild={true} />
    </div>
  );
};

export default InvoicesChildListTable;
