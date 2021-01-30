import { useState } from "react";
import cx from "classnames";
import styled from "styled-components";
import { Collapse, Typography, Row, Col, Checkbox } from "antd";

import { IAdEvents } from "types/adWorld";
import { HeadIcon, ArrowIcon } from "utils/iconUtils";

interface ITrackEventProps {
  events: IAdEvents[];
}

const { Panel } = Collapse;
const { Title, Paragraph } = Typography;
const StyledCollapse = styled(Collapse)`
  cursor: pointer;
  overflow: hidden;
  .ant-collapse-item:first-child {
    border-top: 1px solid #d9d9d9 !important;
  }
  .panel {
    transition: transform 0.12s linear;
  }
  .active {
    transform: rotate(-90deg);
  }
  .inactive {
    transform: rotate(0);
  }
`;
const StyledPanel = styled(Panel)<{ bgColor: string }>`
  .ant-collapse-header {
    padding: 0 !important;
  }
  .ant-collapse-content-box {
    padding: 0;
    .ant-row {
      padding: 0 70px 40px !important;
    }
  }
  border-left: 16px solid ${(props) => props.bgColor};
`;
const StyledCheckBox = styled(Checkbox)<{ bgColor: string }>`
  .ant-checkbox-checked .ant-checkbox-inner {
    background-color: ${(props) => props.bgColor};
    width: 23px;
    height: 23px;
    border: none;
    &::after {
      width: 8px;
      height: 14px;
    }
  }
`;
const StyledHeader = styled.div`
  min-height: 108px;
  align-items: center;
  padding: 0 !important;
  padding: 0 70px !important;
  ${(props: { bgColor: string; islight: boolean }) => `
    &:hover {
      background-color: ${props.bgColor};
      .white-text {
        color: ${!props.islight && "#FFFFFF !important"};
      }
      .marquee-para {
        display: block !important;
      }
    }
  `}
`;

const TrackEvents: React.FC<ITrackEventProps> = ({ events }) => {
  const [activePanels, setActivePanels] = useState<string[]>([]);
  const [activeHoverEvent, setActiveHoverEvent] = useState("");
  const onChangePanels = (key: string | string[]) => {
    if (key instanceof Array) setActivePanels(key);
  };
  const removeActivePanel = (index: number) => {
    const filteredPanels = activePanels.filter(
      (panelIdx) => panelIdx !== index.toString()
    );
    setActivePanels(filteredPanels);
  };
  const panelIsActive = (index: number) => {
    return activePanels.includes(index.toString());
  };

  // const onPanelHeaderHover = (e: React.MouseEvent) => {
  //   const eventTargetName = e.currentTarget.getAttribute("data-event") || "";
  //   setActiveHoverEvent(eventTargetName);
  // };

  return (
    <StyledCollapse
      bordered={false}
      className="bg-white"
      expandIcon={() => <span />}
      onChange={onChangePanels}
      activeKey={activePanels}
    >
      {events.map(
        ({ meet, title, learn, bgColor, isLight, description }, idx) => (
          <StyledPanel
            bgColor={bgColor}
            key={idx.toString()}
            header={
              <StyledHeader
                islight={isLight || false}
                bgColor={!panelIsActive(idx) ? bgColor : ""}
                className="d-flex flex-column justify-content-center align-items-start"
              >
                <div className="w-100 d-flex justify-content-between">
                  <Title
                    level={3}
                    className={cx({
                      "m-0 text-uppercase": true,
                      "white-text": !panelIsActive(idx),
                    })}
                  >
                    {title}
                  </Title>
                  <span
                    className={cx({
                      "d-flex align-items-center panel": true,
                      active: panelIsActive(idx),
                      inactive: !panelIsActive(idx),
                    })}
                  >
                    <ArrowIcon
                      fillWhite={
                        !panelIsActive(idx) &&
                        activeHoverEvent === title &&
                        !isLight
                      }
                    />
                  </span>
                </div>
                {!panelIsActive && (
                  <Paragraph className="d-none fs-18 text-uppercase white-text marquee-para">
                    {description}
                  </Paragraph>
                )}
              </StyledHeader>
            }
          >
            <Row gutter={32} onClick={() => removeActivePanel(idx)}>
              <Col xs={24} md={12}>
                <Title level={5} className="m-0 mb-2">
                  WHAT YOU WILL LEARN:
                </Title>
                <div className="list">
                  {learn.map((each, idx) => (
                    <div key={idx} className="d-flex align-items-center mb-2">
                      <StyledCheckBox
                        checked
                        className="mr-2"
                        bgColor={bgColor}
                      />
                      <Paragraph className="fs-18 mb-0">{each.text}</Paragraph>
                    </div>
                  ))}
                </div>
              </Col>
              <Col xs={24} md={12}>
                <Title level={5} className="m-0 mb-2">
                  WHO YOU WILL MEET:
                </Title>
                <div className="list">
                  {meet.map((each, idx) => (
                    <div key={idx} className="d-flex align-items-center">
                      <span className="mr-2">
                        <HeadIcon bgColor={bgColor} />
                      </span>
                      <Paragraph className="fs-18 m-0 mb-1" key={idx}>
                        {each.text}
                      </Paragraph>
                    </div>
                  ))}
                </div>
              </Col>
            </Row>
          </StyledPanel>
        )
      )}
    </StyledCollapse>
  );
};
export default TrackEvents;
