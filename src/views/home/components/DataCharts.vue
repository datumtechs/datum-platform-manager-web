<template>
    <div class="p-20px" id="container">
        <p class="chart-title">{{ t('home.dayTrend') }}</p>
    </div>
</template>

<script setup lang='ts'>
import { Chart } from '@antv/g2';
import { getTaskTrend } from '@/api/home'

const { t } = useI18n()
const initCharts = (data: any) => {
    const chart = new Chart({
        container: 'container',
        autoFit: true,
        width: 755,
        height: 500,
        padding: [60, 40, 20, 40],
        // syncViewPadding: true,
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


const queryData = () => {
    getTaskTrend({}).then((res: any) => {
        const { code, data } = res
        if (code === 10000) {
            initCharts(data)
        }
    })

}

onMounted(() => {
    queryData()
})

</script>

<style scoped lang='scss'>
#container {
    position: relative;

    .chart-title {
        min-width: 200px;
        position: absolute;
        top: 15px;
        font-family: DINPro-Bold, Ali-Bold;
        font-size: 16px;
    }
}
</style>