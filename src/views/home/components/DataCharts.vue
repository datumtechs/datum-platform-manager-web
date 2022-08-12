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

const { t } = useI18n()

const setMaxOfCharts = (arr: Array<any>) => {
    let maxPrivacy = 0, maxNoPrivacy = 0
    arr.forEach((ele: any) => {
        if (ele.privacyStatsValue > maxPrivacy) maxPrivacy = ele.privacyStatsValue
        if (ele.noPrivacyStatsValue > maxNoPrivacy) maxNoPrivacy = ele.noPrivacyStatsValue
    })
    return {
        maxAxis: Math.max(Math.ceil(maxPrivacy), Math.ceil(maxNoPrivacy))
    }
}

const initCharts = () => {
    const { maxAxis } = setMaxOfCharts(props.chartsData)
    // const hideAxis = maxPrivacy >= maxNoPrivacy ? 'noPrivacyStatsValue' : 'privacyStatsValue'
    // const maxAxis = Math.max(maxPrivacy, maxNoPrivacy)

    const chart = new Chart({
        container: 'container',
        autoFit: true,
        width: 755,
        height: 500,
        padding: [60, 40, 40, 40],
    })
    chart.data(props.chartsData);
    // chart.data(noPrivacyList.value);
    chart.scale(
        {
            statsTime: {
                type: 'time',
                tickCount: 15,
                mask: 'MM-DD'
            },
            privacyStatsValue: {
                nice: true,
                min: 0,
                max: maxAxis//maxPrivacy
            },
            noPrivacyStatsValue: {
                nice: true,
                min: 0,
                max: maxAxis//maxNoPrivacy
            }
        }
    );

    // chart.axis('noPrivacyStatsValue', false);


    chart.tooltip({
        showCrosshairs: true,
        shared: true,
        showMarkers: true,
        // title: (title, datum) => {
        //     // console.log(title)
        //     // console.log(datum)
        //     return `${title} ${t('common.computeTimes')}`
        // },
        itemTpl: `
        <div style="margin-bottom: 10px;list-style:none;">
            <span style="background-color:{color};" class="g2-tooltip-marker"></span>
            {name} : {value} ${t('common.times')}
        </div>
        `
    });
    const view2 = chart.createView();
    chart
        .line()
        .position('statsTime*privacyStatsValue')
        .shape('smooth').color('#1890ff').tooltip('privacyStatsValue', (privacyStatsValue) => {
            return {
                name: t('common.privacy'),
                value: privacyStatsValue
            }
        });;
    chart
        .line()
        .position('statsTime*noPrivacyStatsValue')
        .shape('smooth').color('#2fc25b').tooltip('noPrivacyStatsValue', (noPrivacyStatsValue) => {
            return {
                name: t('common.nonPrivacy'),
                value: noPrivacyStatsValue
            }
        });

    view2.annotation().text({
        content: '趋势线',
        position: ['min', 'min'],
        style: {
            fill: '#8c8c8c',
            fontSize: 14,
            fontWeight: 300
        },
        offsetY: -140
    });
    chart.render();
}

onMounted(() => {
    // props.chartsData.length > 0 && classification(props.chartsData)
    initCharts()
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