<template>
  <div class="home">
    <!-- 顶部信息栏 -->
    <header class="home-header">
      <div class="user-info">
        <div class="avatar">👤</div>
        <div>
          <div class="user-name">健身爱好者</div>
          <div class="user-status">{{ statusText }}</div>
        </div>
      </div>
      <div class="header-actions">
        <button class="icon-btn">🔔</button>
        <button class="icon-btn">⚙️</button>
      </div>
    </header>

    <!-- 核心进度卡片 -->
    <section class="card progress-card">
      <div class="progress-row">
        <ProgressRing :value="weekCount" :total="planCount" />
        <div class="progress-stats">
          <div class="stat-item">
            <span class="stat-number">{{ weekDuration }}</span>
            <span class="stat-label">本周时长(min)</span>
          </div>
          <div class="stat-item">
            <span class="stat-number">{{ weekSets }}</span>
            <span class="stat-label">本周组数</span>
          </div>
          <div class="stat-item">
            <span class="stat-number">{{ remaining }}</span>
            <span class="stat-label">还差{{ remaining }}次达标</span>
          </div>
        </div>
      </div>
      <div class="progress-actions">
        <button class="btn-primary">▶ 开始今日训练</button>
        <button class="btn-secondary">📝 编辑计划</button>
      </div>
    </section>

    <!-- 身体数据快照 -->
    <section class="card snapshot-card">
      <div class="snapshot-header">
        <span>📏 身体数据</span>
        <button class="btn-sm">+ 新增测量</button>
      </div>
      <div class="snapshot-grid">
        <div v-for="m in measurements" :key="m.label" class="snapshot-item">
          <span class="snapshot-value">{{ m.value }}</span>
          <span class="snapshot-label">{{ m.label }}</span>
          <span class="snapshot-trend" :class="m.trend">{{ m.trend === 'up' ? '↑' : '↓' }}</span>
        </div>
      </div>
    </section>

    <!-- 快速创建训练 -->
    <section class="card quick-card">
      <div class="quick-header">
        <span>⚡ 快速创建训练</span>
        <span class="quick-sub">自选部位 · 编排动作</span>
      </div>
      <div class="quick-options">
        <button class="quick-btn template">📋 套用模板</button>
        <button class="quick-btn free">🎯 自由编排</button>
      </div>
    </section>

    <!-- PR高光 -->
    <section class="card pr-card">
      <div class="pr-header">🏆 个人纪录</div>
      <div class="pr-grid">
        <div v-for="pr in prList" :key="pr.name" class="pr-item">
          <span class="pr-name">{{ pr.name }}</span>
          <span class="pr-weight">{{ pr.weight }}kg</span>
          <span class="pr-date">{{ pr.date }}</span>
        </div>
      </div>
    </section>

    <!-- 饮食推荐 -->
    <NutritionCard
      :day-type="dayType"
      :items="nutritionItems"
      :meals="todayMeals"
    />

    <!-- 恢复提示 -->
    <section class="card recovery-card">
      <span class="recovery-icon">💡</span>
      <span class="recovery-text">腿部训练后建议休息 48~72 小时</span>
    </section>
  </div>
</template>

<script setup lang="ts">
import { ref, computed } from 'vue'
import ProgressRing from '../components/ProgressRing.vue'
import NutritionCard from '../components/NutritionCard.vue'
import { workoutStore } from '../stores/workoutStore'

const weekCount = computed(() => workoutStore.getThisWeekCount())
const planCount = ref(4)
const weekDuration = computed(() => workoutStore.getThisWeekDuration())
const weekSets = computed(() => workoutStore.getThisWeekSets())
const remaining = computed(() => Math.max(0, planCount.value - weekCount.value))

const statusText = computed(() => {
  const h = new Date().getHours()
  if (h < 12) return '☀️ 上午好，今天训练了吗？'
  if (h < 18) return '🌤️ 下午好，保持专注！'
  return '🌙 晚上好，好好恢复！'
})

const measurements = ref([
  { label: '体重', value: '72.5kg', trend: 'down' },
  { label: '胸围', value: '106cm', trend: 'up' },
  { label: '臂围', value: '38cm', trend: 'up' },
  { label: '体脂', value: '14%', trend: 'down' },
])

const prList = ref([
  { name: '深蹲', weight: 140, date: '2026-08-10' },
  { name: '卧推', weight: 100, date: '2026-08-08' },
  { name: '硬拉', weight: 160, date: '2026-08-05' },
])

const dayType = ref<'training' | 'rest'>('training')

const nutritionItems = [
  { label: '热量', value: '2450 kcal', percent: 75, color: '#ff7a00' },
  { label: '蛋白质', value: '160g', percent: 80, color: '#00d4aa' },
  { label: '碳水', value: '280g', percent: 70, color: '#3b82f6' },
  { label: '脂肪', value: '70g', percent: 60, color: '#ff6b6b' },
]

const todayMeals = ref([
  { name: '早餐', foods: ['燕麦 50g', '鸡蛋 2个', '牛奶 200ml'] },
  { name: '午餐', foods: ['糙米 150g', '鸡胸肉 200g', '西兰花 100g'] },
  { name: '晚餐', foods: ['红薯 200g', '牛肉 150g', '菠菜 80g'] },
])
</script>

<style scoped>
.home { display: flex; flex-direction: column; gap: 16px; }
.home-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 4px 0 8px;
}
.user-info { display: flex; align-items: center; gap: 12px; }
.avatar {
  width: 44px; height: 44px;
  border-radius: 50%;
  background: #2a2a2a;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 22px;
}
.user-name { font-size: 16px; font-weight: 600; color: #fff; }
.user-status { font-size: 12px; color: #888; }
.header-actions { display: flex; gap: 8px; }
.icon-btn {
  background: transparent;
  border: none;
  color: #888;
  font-size: 20px;
  cursor: pointer;
  padding: 4px;
}
.card {
  background: #141414;
  border-radius: 16px;
  padding: 18px 20px;
  border: 1px solid #222;
}
.progress-row {
  display: flex;
  gap: 20px;
  align-items: center;
  flex-wrap: wrap;
}
.progress-stats {
  flex: 1;
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 8px 12px;
}
.stat-item { display: flex; flex-direction: column; }
.stat-number { font-size: 22px; font-weight: 700; color: #fff; }
.stat-label { font-size: 11px; color: #888; }
.progress-actions {
  display: flex;
  gap: 10px;
  margin-top: 14px;
  flex-wrap: wrap;
}
.btn-primary {
  flex: 1;
  padding: 12px;
  background: #ff7a00;
  color: #fff;
  border: none;
  border-radius: 10px;
  font-weight: 600;
  font-size: 15px;
  cursor: pointer;
  min-width: 120px;
}
.btn-secondary {
  padding: 12px 18px;
  background: #2a2a2a;
  color: #ccc;
  border: 1px solid #333;
  border-radius: 10px;
  font-size: 14px;
  cursor: pointer;
}
.snapshot-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 12px;
  font-weight: 600;
  color: #eee;
}
.btn-sm {
  background: #2a2a2a;
  border: none;
  color: #ccc;
  padding: 4px 14px;
  border-radius: 8px;
  font-size: 12px;
  cursor: pointer;
}
.snapshot-grid {
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  gap: 8px;
}
.snapshot-item { display: flex; flex-direction: column; align-items: center; }
.snapshot-value { font-size: 18px; font-weight: 700; color: #fff; }
.snapshot-label { font-size: 11px; color: #666; }
.snapshot-trend { font-size: 12px; }
.snapshot-trend.up { color: #00d4aa; }
.snapshot-trend.down { color: #ff6b6b; }
.quick-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 12px;
  font-weight: 600;
  color: #eee;
}
.quick-sub { font-size: 12px; color: #666; font-weight: 400; }
.quick-options { display: flex; gap: 10px; }
.quick-btn {
  flex: 1;
  padding: 12px;
  border-radius: 10px;
  border: none;
  font-weight: 600;
  font-size: 14px;
  cursor: pointer;
}
.quick-btn.template { background: #2a2a2a; color: #ccc; }
.quick-btn.free { background: #ff7a00; color: #fff; }
.pr-header { font-weight: 600; color: #eee; margin-bottom: 10px; }
.pr-grid { display: flex; gap: 12px; flex-wrap: wrap; }
.pr-item {
  background: #1a1a1a;
  padding: 8px 14px;
  border-radius: 10px;
  display: flex;
  align-items: center;
  gap: 8px;
}
.pr-name { font-size: 13px; color: #aaa; }
.pr-weight { font-size: 16px; font-weight: 700; color: #ff7a00; }
.pr-date { font-size: 11px; color: #555; }
.recovery-card {
  display: flex;
  align-items: center;
  gap: 10px;
  background: #1a1a2a;
  border-color: #2a2a3a;
}
.recovery-icon { font-size: 18px; }
.recovery-text { font-size: 13px; color: #999; }
</style>