<template>
    <div class="p-20px" id="container"></div>
</template>

<script setup lang='ts'>
import { Chart } from '@antv/g2';
import { getTaskTrend } from '@/api/home'
import { useFormatDay } from '@/hooks'


const chartData = ref([])
const initCharts = (data: any) => {
    const data1 = [
        {
            statsTime: 1,
            statsValue: 1
        },
        {
            statsTime: 2,
            statsValue: 2
        },
        {
            statsTime: 3,
            statsValue: 3
        },
        {
            statsTime: 4,
            statsValue: 4
        },
        {
            statsTime: 5,
            statsValue: 5
        },
        {
            statsTime: 6,
            statsValue: 6
        },
        {
            statsTime: 7,
            statsValue: 7
        },
        {
            statsTime: 8,
            statsValue: 8
        },
    ];

    const chart = new Chart({
        container: 'container',
        autoFit: true,
        width: 755,
        height: 500,
        padding: 40,
    });

    chart.data(data);
    chart.scale(
        {
            statsTime: {
                type: 'time',
                tickCount: 15,
                mask: 'MM-DD'
            },
            statsValue: {
                nice: true,
                min: 0
            }
        }
    );

    chart.tooltip({
        showCrosshairs: true,
        shared: true,
    });

    // chart.axis('statsTime', {
    //     label: {
    //         formatter: (val) => {
    //             return useFormatDay(+val)
    //         },
    //     },
    // });

    chart
        .line()
        .position('statsTime*statsValue')
        .shape('smooth');


    chart.render();
}


const queryData = () => {
    getTaskTrend({}).then((res: any) => {
        const { code, data } = res
        if (code === 10000) {
            // chartData.value = data
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
onMounted(() => {
    queryData()
})

</script>

<style scoped lang='scss'>
</style>