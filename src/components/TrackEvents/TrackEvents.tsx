import styled from "styled-components";
import { Collapse, Typography } from "antd";

import { IAdEvents } from "types/adWorld";

interface ITrackEventProps {
  events: IAdEvents[];
}

const { Panel } = Collapse;
const { Title } = Typography;

const StyledPanel = styled(Panel)``;

const TrackEvents: React.FC<ITrackEventProps> = ({ events }) => {
  return (
    <Collapse defaultActiveKey={["1"]} expandIconPosition="right">
      <StyledPanel header={<Title level={3}>Header</Title>} key="1">
        <p>test</p>
      </StyledPanel>
    </Collapse>
  );
};
export default TrackEvents;
