import React, { useEffect, useState, useRef } from 'react';
import { Col, Row, Card, Button } from 'antd';
import Data from './data.json';
import PieDemo from './components/pieDemo';

const PieDemoIndex = () => {
  // const data: any =
  const [antvData, setAntvData] = useState<{
    secondFloorData?: any[];
    rawData?: any[];
    threeFloorData: any[];
  }>({
    secondFloorData: [],
    rawData: [],
    threeFloorData: [],
  });

  const secondPiePlot = useRef<any>();
  const threePiePlot = useRef<any>();
  // console.log(Data[0].data[0].data, 'Data[0].data[0].data');
  const antvDataRef = useRef<any>({});
  // const secondFloorData = Data[0].data;
  // const threeFloorData = Data[0].data[0].data;
  const secondUpDataRef = useRef<any>([]);
  const threeUpDataRef = useRef<any>([]);
  const [secondUpData, setSecondUpData] = useState<any[]>([]);
  const [threeUpData, setThreeUpData] = useState<any[]>([]);
  // console.log(antvDataRef, 'antvDataRef');

  const getDate = async () => {
    return Data;
  };

  // const checkDatakey = (checkData: any) => {
  //   const objKeys = Object.keys(checkData);
  //   console.log('checkData>>:', checkData);
  //   return objKeys.every(
  //     (item) => checkData[item].length > 0 && !!checkData[item],
  //   );
  // };

  useEffect(() => {
    console.log(Data, 'data');
    (async () => {
      const rawData: any = await getDate();
      if (rawData && rawData[0].data && rawData[0].data[0].data) {
        const secondFloorData = rawData[0].data;
        const threeFloorData = rawData[0].data[0].data;
        setAntvData({
          rawData: rawData,
          secondFloorData,
          threeFloorData,
        });
      }
    })();
  }, []);

  return (
    <>
      {antvData?.secondFloorData?.length > 0 && (
        <div>
          <Card
            bordered
            extra={
              <>
                {Data?.map((item: any, i: number) => {
                  // console.log(item, 'item');
                  return (
                    <Button
                      key={item?.type}
                      type="link"
                      onClick={() => {
                        console.log(item, 'item');
                        const data: any[] = [item];

                        // data.push(item);
                        console.log(data, 'itemData');
                        setSecondUpData(data);
                        setThreeUpData(item.data);
                        // secondUpDataRef.current = data;
                        // threeUpDataRef.current = item.data;
                        console.log(secondUpData, threeUpData);
                        setAntvData({
                          rawData: antvData.rawData,
                          secondFloorData: data,
                          threeFloorData: item.data,
                        });
                      }}
                    >
                      {item.type}
                    </Button>
                  );
                })}
              </>
            }
          >
            <Row>
              <Col span={12}>
                <PieDemo
                  data={antvData?.secondFloorData}
                  id="container1"
                  ref={secondPiePlot}
                  Data={secondUpData}
                  setThreeUpData={setThreeUpData}
                />
              </Col>
              <Col span={12}>
                <PieDemo
                  data={antvData.threeFloorData}
                  id="container2"
                  ref={threePiePlot}
                  Data={threeUpData}
                />
              </Col>
            </Row>
          </Card>
        </div>
      )}
    </>
  );
};

export default PieDemoIndex;
