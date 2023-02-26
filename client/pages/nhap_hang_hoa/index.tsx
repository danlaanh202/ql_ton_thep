import WareForm from "@/components/form/WareForm";
import ChoosenType from "@/components/ware/ChoosenType";
import UpdateWareAmount from "@/components/ware/UpdateWareAmount";
import MainLayout from "@/layout/MainLayout";
import Head from "next/head";
import { useRouter } from "next/router";
import React, { useEffect, useState } from "react";
type Type1 = "old" | "new" | "unset";
const index = () => {
  const router = useRouter();
  const [type1, setType1] = useState<Type1>("unset");
  useEffect(() => {
    setType1(router.query.type as Type1);
  }, [router]);
  return (
    <MainLayout>
      <Head>
        <title>Danh sách hàng hoá</title>
      </Head>
      {type1 === "unset" && <ChoosenType />}
      {type1 === "old" && <UpdateWareAmount />}
      {type1 === "new" && <WareForm />}
    </MainLayout>
  );
};

export default index;
