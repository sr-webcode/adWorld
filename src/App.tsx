import { useEffect, useState } from "react";
import styled from "styled-components";
import { Typography, Spin } from "antd";

import { IAdEvents } from "types/adWorld";
import TrackEvents from "components/TrackEvents";

const { Title } = Typography;
const StyledHeader = styled.div`
  padding-top: 70px;
  margin-bottom: 50px;
`;

const App = () => {
  const [loading, setLoading] = useState(false);
  const [trackEvents, setTrackEvents] = useState<IAdEvents[]>([]);
  const fetchAdEvents = async () => {
    setLoading(true);
    try {
      const adRequest = await fetch(
        "https://adworld-cms.istackmanila.com/tracks"
      );
      const trackEvents = await adRequest.json();
      setTrackEvents(trackEvents);
    } catch (error) {
      console.log(error);
    }
    setLoading(false);
  };
  useEffect(() => {
    fetchAdEvents();
  }, []);

  return (
    <div>
      <StyledHeader className="text-center">
        <Title level={2} className="m-0 mb-3">
          EXPLORE AD WORLD TRACKS
        </Title>
        <Title level={5} className="m-0">
          IT'S LIKE 13 EVENTS IN ONE.
        </Title>
      </StyledHeader>
      {loading && (
        <div className="py-5 w-100 d-flex justify-content-center">
          <Spin />
        </div>
      )}
      {Boolean(trackEvents.length) && <TrackEvents events={trackEvents} />}
    </div>
  );
};
export default App;
