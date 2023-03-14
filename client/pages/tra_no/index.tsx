import DebtContainer from "@/components/debt/DebtContainer";
import MainLayout from "@/layout/MainLayout";
import Head from "next/head";

const PayDebt = () => {
  return (
    <MainLayout>
      <Head>
        <title>Trả nợ</title>
      </Head>
      <DebtContainer />
    </MainLayout>
  );
};

export default PayDebt;
