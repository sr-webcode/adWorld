import { useState } from "react";
import cx from "classnames";
import styled from "styled-components";
import { Collapse, Typography, Row, Col, Checkbox, Grid } from "antd";
import { ArrowRightOutlined } from "@ant-design/icons";

import { HeadIcon } from "utils/iconUtils";
import { IAdEvents } from "types/adWorld";

interface ITrackEventProps {
  events: IAdEvents[];
}

const { Panel } = Collapse;
const { useBreakpoint } = Grid;
const { Title, Paragraph } = Typography;
const StyledCollapse = styled(Collapse)`
  cursor: pointer;
  overflow: hidden;
  .ant-collapse-item:first-child {
    border-top: 1px solid #d9d9d9 !important;
  }
  .arrow-icon {
    transition: transform 0.1s ease;
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
      @media (max-width: 950px) {
        padding: 0 40px 20px !important;
      }
      @media (max-width: 760px) {
        padding: 0 20px 20px !important;
      }
    }
  }
  border-left: 16px solid ${(props) => props.bgColor};
  @media (max-width: 760px) {
    border-left: 8px solid ${(props) => props.bgColor};
  }
`;
const StyledCheckBox = styled(Checkbox)<{ bgColor: string }>`
  .ant-checkbox-checked .ant-checkbox-inner {
    background-color: ${(props) => props.bgColor};
    width: 23px;
    height: 23px;
    @media (max-width: 760px) {
      width: 16px;
      height: 16px;
    }
    border: none;
    &::after {
      width: 8px;
      height: 14px;
      @media (max-width: 760px) {
        width: 6px;
        height: 10px;
      }
    }
  }
`;
const StyledHeader = styled.div`
  ${(props: { bgColor: string; islight: boolean }) => `
  @media (max-width: 950px){
    min-height: 70px;
  }
  min-height: 108px;
  position: relative;
  align-items: center;
  padding: 0 !important;
  padding: 0 70px !important; 
  @media (max-width: 950px){
   padding: 0 40px !important; 
  }
  @media (max-width: 760px){
   padding: 0 20px !important; 
  }
  &:hover {
      background-color: ${props.bgColor};
      .banner-header {            
        transform: translateY(-26px);
         @media (max-width: 950px){
           transform: translateY(-16px);
        }
        transition: transform 0.1s ease;
      }
      .white-text {
        color: ${!props.islight && "#FFFFFF !important"};
      }   
      .marquee-para {  
        display: block !important;
        color: ${!props.islight && "#FFFFFF !important"};
        transition: transform 0.60s linear;
        animation: bannerText 8.20s linear forwards;
      }
    }
  `}
  @keyframes bannerText {
    from {
      transform: translateX(0);
    }
    to {
      transform: translateX(-40%);
    }
  }
`;
const StyledMarqueeText = styled(Paragraph)`
  bottom: 0;
  white-space: nowrap;
`;

const TrackEvents: React.FC<ITrackEventProps> = ({ events }) => {
  const { sm, md, lg } = useBreakpoint();
  const [activePanels, setActivePanels] = useState<string[]>([]);
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

  console.log(md);

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
                data-event={title}
                islight={isLight || false}
                bgColor={!panelIsActive(idx) ? bgColor : ""}
                className="d-flex flex-column justify-content-center align-items-start"
              >
                <div className="w-100 ">
                  <Title
                    level={!lg ? (md ? 4 : 5) : 3}
                    className={cx({
                      "m-0 text-uppercase d-flex justify-content-between align-items-center w-100": true,
                      "white-text banner-header": !panelIsActive(idx),
                    })}
                  >
                    {title}
                    <ArrowRightOutlined
                      className={cx({
                        "arrow-icon": true,
                        active: panelIsActive(idx),
                        inactive: !panelIsActive(idx),
                      })}
                    />
                  </Title>
                </div>
                {!panelIsActive(idx) && (
                  <StyledMarqueeText
                    className={cx({
                      "d-none text-uppercase marquee-para position-absolute ": true,
                      "fs-24": lg,
                      "fs-16": md,
                    })}
                  >
                    {description}
                  </StyledMarqueeText>
                )}
              </StyledHeader>
            }
          >
            <Row gutter={32} onClick={() => removeActivePanel(idx)}>
              <Col xs={24} md={12}>
                <Title level={!lg ? 5 : 4} className="m-0 mb-2">
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
                      <Paragraph
                        className={cx({
                          "m-0 mb-1": true,
                          "fs-18": lg,
                          "fs-16": md,
                        })}
                      >
                        {each.text}
                      </Paragraph>
                    </div>
                  ))}
                </div>
              </Col>
              <Col xs={24} md={12} className={cx({ "mt-4": sm && !md })}>
                <Title level={!lg ? 5 : 4} className="m-0 mb-2">
                  WHO YOU WILL MEET:
                </Title>
                <div className="list">
                  {meet.map((each, idx) => (
                    <div key={idx} className="d-flex align-items-center">
                      <span className="mr-2">
                        <HeadIcon bgColor={bgColor} />
                      </span>
                      <Paragraph
                        className={cx({
                          "m-0 mb-1": true,
                          "fs-18": lg,
                          "fs-16": md,
                        })}
                        key={idx}
                      >
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
