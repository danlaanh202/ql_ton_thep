import PersonTable from "@/components/table/PersonTable";
import MainLayout from "@/layout/MainLayout";
import { IPerson } from "@/types";
import callApi from "@/utils/callApi";
import Head from "next/head";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";

const PersonList = () => {
  const router = useRouter();
  const [data, setData] = useState<IPerson[]>([]);
  const [totalDocs, setTotalDocs] = useState(0);
  useEffect(() => {
    callApi
      .getPeopleWithPagination(parseInt(router.query._page as string) || 1)
      .then((res) => {
        // console.log(res.data);
        setTotalDocs(res.data.totalDocs);
        setData(res.data.docs);
      });
  }, [router.query._page]);
  return (
    <MainLayout>
      <Head>
        <title>Danh sách khách hàng</title>
      </Head>
      <PersonTable total={totalDocs} data={data} setData={setData} />
    </MainLayout>
  );
};

export default PersonList;
