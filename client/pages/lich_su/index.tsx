import ActivityCardContainer from "@/components/activity/ActivityCardContainer";
import MainLayout from "@/layout/MainLayout";
import Head from "next/head";

const index = () => {
  return (
    <MainLayout>
      <Head>
        <title>Lịch sử</title>
      </Head>
      <ActivityCardContainer />
    </MainLayout>
  );
};

export default index;
