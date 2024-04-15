import styles from './index.less';
import React, { useEffect, useRef, useState } from 'react';
import { isObject, deepMix, set } from '@antv/util';
import { Pie, measureTextWidth, P, G2 } from '@antv/g2plot';
import { Badge, Col, Row } from 'antd';
import { log } from '@antv/g2plot/lib/utils';

export default function IndexPage() {
  function renderStatistic(
    containerWidth: number,
    text: string,
    style: { fontSize: any; lineHeight?: any },
  ) {
    const textWidth = measureTextWidth(text, style);
    const textHeight = style.lineHeight || style.fontSize;
    const R = containerWidth / 2;
    // r^2 = (w / 2)^2 + (h - offsetY)^2
    let scale = 1;
    if (containerWidth < textWidth) {
      scale = Math.min(
        Math.sqrt(
          Math.abs(
            Math.pow(R, 2) /
              (Math.pow(textWidth / 2, 2) + Math.pow(textHeight, 2)),
          ),
        ),
        1,
      );
    }
    const textStyleStr = `width:${containerWidth}px;`;
    return `<div style="${textStyleStr};font-size:${scale}em;line-height:${
      scale < 1 ? 1 : 'inherit'
    };">${text}</div>`;
  }

  const color: any = [
    '#0E8E89',
    '#E19348',
    '#F383A2',
    '#247FEA',
    '#FF6B3B',
    '#626681',
    '#FFC100',
    '#9FB40F',
    '#76523B',
    '#DAD5B5',
  ];

  const [g2plotData, setG2plotData] = useState<any[]>([]);
  const data: any = [
    { type: '分类一', value: 27 },
    { type: '分类二', value: 25 },
    { type: '分类三', value: 18 },
    { type: '分类四', value: 15 },
    { type: '分类五', value: 10 },
    { type: '其他', value: 5 },
  ];
  const config: any = {
    appendPadding: 10,
    data: data,
    angleField: 'value',
    colorField: 'type',
    radius: 1,
    innerRadius: 0.64,
    meta: {
      value: {
        formatter: (v) => `${v} ¥`,
      },
    },
    label: {
      type: 'inner',
      offset: '-50%',
      style: {
        textAlign: 'center',
      },
      autoRotate: false,
      content: '{value}',
    },
    color: color,
    statistic: {
      title: {
        offsetY: -4,
        customHtml: (container, view, datum) => {
          const { width, height } = container.getBoundingClientRect();
          const d = Math.sqrt(Math.pow(width / 2, 2) + Math.pow(height / 2, 2));
          const text = datum ? datum.type : '总计';
          return renderStatistic(d, text, { fontSize: 28 });
        },
      },
      content: {
        offsetY: 4,
        style: {
          fontSize: '32px',
        },
        customHtml: (container, view, datum, data) => {
          const { width } = container.getBoundingClientRect();

          const text = datum
            ? `¥ ${datum.value}`
            : `¥ ${data.reduce((r, d) => r + d.value, 0)}`;
          return renderStatistic(width, text, { fontSize: 32 });
        },
      },
    },
    legend: false,
    // 添加 中心统计文本 交互
    interactions: [
      { type: 'element-selected' },
      { type: 'element-active' },
      { type: 'pie-statistic-active' },
    ],
  };
  const piePlot = useRef<any>(null);
  useEffect(() => {
    if (piePlot.current) {
      piePlot.current = new Pie('container', config);
      piePlot.current.render();
    }
  }, []);
  // useEffect(())
  return (
    <div>
      <Row>
        <Col span={18}>
          <div id="container" ref={piePlot} />
        </Col>
        <Col span={6} style={{ marginTop: '150px' }}>
          <div
            className={styles.legendCustom}
            onClick={() => {
              // console.log(item, 'item');
              // setG2plotData([item]);

              piePlot.current.update(config);
            }}
          >
            <span style={{ margin: '5px' }}>
              <Badge key="#52c41a" color="#52c41a" />
            </span>
            全选
          </div>
          {data?.map((item: any, index: number) => {
            return (
              <div
                key={item.type}
                onClick={() => {
                  // console.log(item, 'item');
                  // setG2plotData([item]);
                  const itemData: any = data.filter(
                    (i: { type: any }) => i.type === item.type,
                  );
                  setG2plotData(itemData);
                  piePlot.current.update({
                    data: itemData,
                    color: color[index],
                  });
                }}
                className={styles.legendCustom}
              >
                <span style={{ margin: '5px' }}>
                  <Badge key={color[index]} color={color[index]} />
                </span>
                <span>{item.type}</span>
              </div>
            );
          })}
        </Col>
      </Row>
    </div>
  );
}
