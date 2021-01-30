import { useEffect, useState } from "react";
import cx from "classnames";
import styled from "styled-components";
import { Typography, Spin, Grid } from "antd";

import { IAdEvents } from "types/adWorld";
import TrackEvents from "components/TrackEvents";

const { Title } = Typography;
const { useBreakpoint } = Grid;
const StyledHeader = styled.div`
  padding-top: 70px;
  margin-bottom: 50px;
`;

const App = () => {
  const [loading, setLoading] = useState(false);
  const { sm, lg } = useBreakpoint();
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
        <Title level={lg ? 2 : 3} className={cx({ "m-0 px-2": true, " mb-3": sm })}>
          EXPLORE AD WORLD TRACKS
        </Title>
        <Title level={4} className={cx({ "m-0": true, "d-none": !sm })}>
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
