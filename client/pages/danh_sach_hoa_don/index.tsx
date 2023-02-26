import InvoiceListTable from "@/components/table/InvoiceListTable";
import MainLayout from "@/layout/MainLayout";
import { IInvoiceVar } from "@/types";
import callApi from "@/utils/callApi";
import Head from "next/head";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";

const InvoiceList = () => {
  const router = useRouter();
  const [data, setData] = useState<IInvoiceVar[]>([]);
  const [totalDocs, setTotalDocs] = useState(0);
  useEffect(() => {
    callApi
      .getInvoicesWithPagination(parseInt(router.query._page as string) || 1)
      .then((response) => {
        console.log(response.data);
        setTotalDocs(response.data.totalDocs);
        setData(response.data.docs);
      });
  }, [router.query._page]);
  return (
    <MainLayout>
      <Head>
        <title>Danh sách hoá đơn</title>
      </Head>
      <InvoiceListTable
        data={data}
        total={totalDocs}
        setData={setData}
        isChild={false}
      />
    </MainLayout>
  );
};

export default InvoiceList;
