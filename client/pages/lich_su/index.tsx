import ActivityCardContainer from "@/components/activity/ActivityCardContainer";
import MainLayout from "@/layout/MainLayout";
import Head from "next/head";

const HistoryList = () => {
  return (
    <MainLayout>
      <Head>
        <title>Lịch sử</title>
      </Head>
      <ActivityCardContainer />
    </MainLayout>
  );
};

export default HistoryList;
