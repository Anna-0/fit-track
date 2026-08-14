<template>
  <div class="analysis">
    <h2 class="page-title">📊 数据分析</h2>

    <div class="stats-grid">
      <div class="stat-box">
        <span class="stat-big">{{ totalWorkouts }}</span>
        <span class="stat-label">总训练次数</span>
      </div>
      <div class="stat-box">
        <span class="stat-big">{{ totalDuration }}</span>
        <span class="stat-label">总时长(min)</span>
      </div>
      <div class="stat-box">
        <span class="stat-big">{{ avgDuration }}</span>
        <span class="stat-label">平均时长</span>
      </div>
    </div>

    <div class="chart-section">
      <div ref="trendChart" class="chart-container"></div>
    </div>
    <div class="chart-section">
      <div ref="bodyChart" class="chart-container"></div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, computed, onMounted, watch, nextTick } from 'vue'
import * as echarts from 'echarts'
import { workoutStore } from '../stores/workoutStore'

const trendChart = ref<HTMLDivElement | null>(null)
const bodyChart = ref<HTMLDivElement | null>(null)
let trendInstance: echarts.ECharts | null = null
let bodyInstance: echarts.ECharts | null = null

const workouts = computed(() => workoutStore.workouts.value)

const totalWorkouts = computed(() => workouts.value.length)
const totalDuration = computed(() => workouts.value.reduce((s, w) => s + w.duration, 0))
const avgDuration = computed(() => totalWorkouts.value ? Math.round(totalDuration.value / totalWorkouts.value) : 0)

const renderTrend = () => {
  if (!trendChart.value) return
  if (!trendInstance) {
    trendInstance = echarts.init(trendChart.value)
  }
  const dates: string[] = []
  const counts: number[] = []
  const durations: number[] = []
  for (let i = 13; i >= 0; i--) {
    const d = new Date()
    d.setDate(d.getDate() - i)
    const ds = d.toISOString().split('T')[0]
    dates.push(ds)
    const dayWorkouts = workouts.value.filter(w => w.date === ds)
    counts.push(dayWorkouts.length)
    durations.push(dayWorkouts.reduce((s, w) => s + w.duration, 0))
  }
  trendInstance.setOption({
    tooltip: { trigger: 'axis' },
    legend: { data: ['训练次数', '时长(min)'], textStyle: { color: '#888' } },
    grid: { left: 40, right: 20, top: 30, bottom: 30 },
    xAxis: { type: 'category', data: dates, axisLabel: { color: '#666', fontSize: 10 } },
    yAxis: [{ type: 'value', minInterval: 1, axisLabel: { color: '#666' } }],
    series: [
      { name: '训练次数', type: 'bar', data: counts, color: '#ff7a00', barWidth: '30%' },
      { name: '时长(min)', type: 'line', data: durations, color: '#00d4aa', smooth: true },
    ]
  })
  trendInstance.resize()
}

const renderBody = () => {
  if (!bodyChart.value) return
  if (!bodyInstance) {
    bodyInstance = echarts.init(bodyChart.value)
  }
  const parts: Record<string, number> = {}
  workouts.value.forEach(w => { parts[w.bodyPart] = (parts[w.bodyPart] || 0) + 1 })
  const data = Object.entries(parts).map(([name, value]) => ({ name, value }))
  bodyInstance.setOption({
    tooltip: { trigger: 'item' },
    legend: { textStyle: { color: '#888' } },
    series: [{
      type: 'pie',
      radius: ['40%', '70%'],
      data: data,
      label: { color: '#aaa', formatter: '{b}\n{d}%' },
      itemStyle: { borderRadius: 6, borderColor: '#141414', borderWidth: 2 }
    }]
  })
  bodyInstance.resize()
}

watch(workouts, () => {
  nextTick(() => { renderTrend(); renderBody() })
}, { deep: true })

onMounted(() => {
  nextTick(() => { renderTrend(); renderBody() })
  window.addEventListener('resize', () => {
    trendInstance?.resize()
    bodyInstance?.resize()
  })
})
</script>

<style scoped>
.analysis { display: flex; flex-direction: column; gap: 18px; }
.page-title { font-size: 22px; font-weight: 700; color: #fff; }
.stats-grid { display: grid; grid-template-columns: repeat(3, 1fr); gap: 12px; }
.stat-box {
  background: #141414;
  border-radius: 12px;
  padding: 16px;
  text-align: center;
  border: 1px solid #222;
}
.stat-big { display: block; font-size: 28px; font-weight: 700; color: #ff7a00; }
.stat-label { font-size: 12px; color: #666; }
.chart-section {
  background: #141414;
  border-radius: 12px;
  padding: 16px;
  border: 1px solid #222;
}
.chart-container { width: 100%; height: 240px; }
</style>