<template>
    <div class="py-40px" id="container"></div>
</template>

<script setup lang='ts'>
import { Chart } from '@antv/g2';
import { getTaskTrend } from '@/api/home'

// const chart = new Chart({
//     container: 'container',
//     autoFit: true,
//     width: 600,
//     height: 300,
// });

const initCharts = (data: any) => {
    if (data.length === 0) return
    const chart = new Chart({
        container: 'container',
        autoFit: true,
        width: 755,
        height: 355,
    });
    chart.data(data);
    chart.scale({
        Date: {
            tickCount: 100
        },
        Close: {
            nice: true,
        }
    });
    chart.axis('Date', {
        label: {
            formatter: text => {
                const dataStrings = text.split('.');
                return dataStrings[2] + '-' + dataStrings[1] + '-' + dataStrings[0];
            }
        }
    });

    chart.line().position('Date*Close');
    // // annotation
    // const { min, max } = findMaxMin(data);
    // chart.annotation().dataMarker({
    //     top: true,
    //     position: [max.Date, max.Close],
    //     text: {
    //         content: '全部峰值：' + max.Close,
    //     },
    //     line: {
    //         length: 30,
    //     }
    // });
    // chart.annotation().dataMarker({
    //     top: true,
    //     position: [min.Date, min.Close],
    //     text: {
    //         content: '全部谷值：' + min.Close,
    //     },
    //     line: {
    //         length: 50,
    //     }
    // });
    chart.render();
}


const queryData = () => {
    getTaskTrend({}).then((res: any) => {
        const { code, data } = res

        if (code === 10000) {
            initCharts(data)
        }
    })
}

function findMaxMin(data: any) {
    let maxValue = 0;
    let minValue = 50000;
    let maxObj = null;
    let minObj = null;
    for (const d of data) {
        if (d.Close > maxValue) {
            maxValue = d.Close;
            maxObj = d;
        }
        if (d.Close < minValue) {
            minValue = d.Close;
            minObj = d;
        }
    }
    return { max: maxObj, min: minObj };
}
watchEffect(() => {
    queryData()
})
// fetch('https://gw.alipayobjects.com/os/antvdemo/assets/data/nintendo.json')
//     .then(res => res.json())
//     .then(data => {
//         const chart = new Chart({
//             container: 'container',
//             autoFit: true,
//             width: 755,
//             height: 355,
//         });
//         chart.data(data);
//         chart.scale({
//             Date: {
//                 tickCount: 100
//             },
//             Close: {
//                 nice: true,
//             }
//         });
//         chart.axis('Date', {
//             label: {
//                 formatter: text => {
//                     const dataStrings = text.split('.');
//                     return dataStrings[2] + '-' + dataStrings[1] + '-' + dataStrings[0];
//                 }
//             }
//         });

//         chart.line().position('Date*Close');
//         // // annotation
//         // const { min, max } = findMaxMin(data);
//         // chart.annotation().dataMarker({
//         //     top: true,
//         //     position: [max.Date, max.Close],
//         //     text: {
//         //         content: '全部峰值：' + max.Close,
//         //     },
//         //     line: {
//         //         length: 30,
//         //     }
//         // });
//         // chart.annotation().dataMarker({
//         //     top: true,
//         //     position: [min.Date, min.Close],
//         //     text: {
//         //         content: '全部谷值：' + min.Close,
//         //     },
//         //     line: {
//         //         length: 50,
//         //     }
//         // });
//         chart.render();
//     });

</script>

<style scoped lang='scss'>
</style>