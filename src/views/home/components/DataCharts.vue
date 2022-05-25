<template>
    <div class="p-20px" id="container">
        <p class="chart-title">{{ t('home.dayTrend') }}</p>
    </div>
</template>

<script setup lang='ts'>
import { Chart } from '@antv/g2';

const props = defineProps({
    chartsData: {
        type: Array as any,
        default: () => []
    }
})

console.log(props.chartsData);


const { t } = useI18n()
const initCharts = () => {
    console.log(props.chartsData);

    const chart = new Chart({
        container: 'container',
        autoFit: true,
        width: 755,
        height: 500,
        padding: [60, 40, 40, 40],
    })
    chart.data(props.chartsData);
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
        itemTpl: `
        <div style="margin-bottom: 10px;list-style:none;">
            <span style="background-color:{color};" class="g2-tooltip-marker"></span>
            ${t('common.computeTimes')} : {value}
        </div>
        `
    });

    chart
        .line()
        .position('statsTime*statsValue')
        .shape('smooth');
    chart.render();
}

onMounted(() => {
    initCharts() //  queryData()
})

</script>

<style scoped lang='scss'>
#container {
    position: relative;
    width: 795px;
    height: 435px;

    .chart-title {
        min-width: 200px;
        position: absolute;
        top: 15px;
        font-family: DINPro-Bold, Ali-Bold;
        font-size: 16px;
    }
}
</style>