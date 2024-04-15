// import styles from './index.less';
// import React, { useEffect } from 'react';
// import { isObject, deepMix } from '@antv/util';
// import { Pie, measureTextWidth, P, G2 } from '@antv/g2plot';

// export default function IndexPage() {
//   // 自定义图形
//   G2.registerShape('interval', 'hill', {
//     draw(info, container) {
//       const { points, style, defaultStyle = {} } = info;

//       console.log(JSON.stringify(info), container, 'info');
//       let path = [
//         ['M', points[0].x, points[0].y],
//         ['L', (points[1].x + points[2].x) / 2, points[1].y],
//         ['L', points[3].x, points[3].y],
//         ['Z'],
//       ];
//       console.log('====================================');
//       console.log(JSON.stringify(path));
//       console.log('====================================');
//       path = this.parsePath(path);
//       console.log('====================================');
//       console.log(JSON.stringify(path), this);
//       console.log('====================================');
//       return container.addShape('path', {
//         attrs: {
//           path,
//           ...defaultStyle,
//           ...style,
//         },
//       });
//     },
//   });

//   // 1. 定义配置
//   const defaultOptions: any = {
//     columnWidthRatio: 1.2,
//   };

//   // 2. adaptor 实现
//   function adaptor(params: { chart: any; options: any }) {
//     const { chart, options } = params;
//     const { data, xField, yField, columnWidthRatio, columnStyle, theme } =
//       options;

//     // 数据
//     chart.data(data);

//     // 几何图形
//     const i = chart
//       .interval()
//       .position(`${xField}*${yField}`)
//       .shape('hill')
//       .style(`${xField}*${yField}`, (x, y) => {
//         return typeof columnStyle === 'function'
//           ? columnStyle({ [xField]: x, [yField]: y })
//           : columnStyle;
//       });

//     // 设置重叠比率
//     chart.theme(
//       deepMix({}, isObject(theme) ? theme : G2.getTheme(theme), {
//         columnWidthRatio: columnWidthRatio,
//       }),
//     );

//     const gap = (1 / data.length / 2) * columnWidthRatio; // 左右预留
//     chart.scale({
//       genre: {
//         range: [gap, 1 - gap],
//       },
//     });

//     return params;
//   }

//   // 3. G2Plot 上使用
//   const data = [
//     { genre: 'Sports', sold: 275 },
//     { genre: 'Strategy', sold: 115 },
//     { genre: 'Action', sold: 120 },
//     { genre: 'Shooter', sold: 350 },
//     { genre: 'Other', sold: 150 },
//   ];
//   useEffect(() => {
//     const hill = new P(
//       'container',
//       {
//         data,
//         appendPadding: 16,
//         meta: {
//           genre: {
//             alias: '游戏种类', // 列定义，定义该属性显示的别名
//           },
//           sold: {
//             alias: '销售量',
//           },
//         },
//         xField: 'genre',
//         yField: 'sold',
//         columnStyle: {
//           fillOpacity: 0.3,
//         },
//       },
//       adaptor,
//       defaultOptions,
//     ); // 引入上述的封装，或者将上述代码发包

//     hill.render();
//     hill.on('plot:click', (...args: any) => {
//       console.log(...args, 'args');
//     });
//   }, []);
//   return (
//     <div>
//       <div id="container" />
//     </div>
//   );
// }
