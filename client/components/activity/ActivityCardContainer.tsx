import { IActivity } from "@/types";
import callApi from "@/utils/callApi";
import { format } from "date-fns";
import { useEffect, useState } from "react";
import styled from "styled-components";
const StyledCardContainer = styled.div`
  width: 100%;
  max-width: 600px;
  margin: 0 auto;
  padding: 8px;
`;
const StyledCard = styled.div`
  display: flex;
  flex-direction: column;
  background: white;
  border-radius: 8px;
  border: 1px solid #6e6e6e;

  .card-header {
    padding: 4px;
    border-bottom: 1px solid #dbdbdb;
    display: flex;
    align-items: center;
    &-title {
      color: #262626;
      flex: 1;
    }
    &-date {
      font-size: 12px;
    }
  }
  .card-content {
    padding: 4px;
  }
`;
const ActivityCardContainer = () => {
  const [data, setData] = useState<IActivity[]>([]);
  useEffect(() => {
    callApi.getActivities().then((res) => setData(res.data.docs));
  }, []);
  return (
    <StyledCardContainer>
      {data?.length > 0 &&
        data.map((item, index) => {
          return <ActivityCard data={item} />;
        })}
    </StyledCardContainer>
  );
};

export default ActivityCardContainer;

const ActivityCard = ({ data }: { data: IActivity }) => {
  return (
    <StyledCard>
      <div className="card-header">
        <div className="card-header-title">Header mẫu</div>
        <div className="card-header-date">
          {format(new Date(data.created_at as string), "dd/MM/yyyy")}
        </div>
      </div>
      <div
        className="card-content"
        dangerouslySetInnerHTML={{ __html: data._content }}
      ></div>
    </StyledCard>
  );
};
