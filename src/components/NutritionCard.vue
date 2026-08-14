<template>
  <div class="nutrition-card">
    <div class="nc-header">
      <span class="nc-icon">🍽️</span>
      <span class="nc-title">今日营养目标</span>
      <span class="nc-tag" :class="dayType">{{ dayType === 'training' ? '🔥 训练日' : '💤 休息日' }}</span>
    </div>
    <div class="nc-targets">
      <div class="nc-item" v-for="item in items" :key="item.label">
        <span class="nc-value">{{ item.value }}</span>
        <span class="nc-label">{{ item.label }}</span>
        <div class="nc-bar"><div class="nc-fill" :style="{ width: item.percent + '%', background: item.color }"></div></div>
      </div>
    </div>
    <div class="nc-meals">
      <div class="nc-meal" v-for="meal in meals" :key="meal.name">
        <span class="nc-meal-name">{{ meal.name }}</span>
        <span class="nc-meal-foods">{{ meal.foods.join(' · ') }}</span>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
defineProps<{
  dayType: 'training' | 'rest'
  items: Array<{ label: string; value: string; percent: number; color: string }>
  meals: Array<{ name: string; foods: string[] }>
}>()
</script>

<style scoped>
.nutrition-card {
  background: #1a1a1a;
  border-radius: 16px;
  padding: 18px 20px;
  border: 1px solid #2a2a2a;
}
.nc-header {
  display: flex;
  align-items: center;
  gap: 10px;
  margin-bottom: 14px;
}
.nc-icon { font-size: 20px; }
.nc-title { font-size: 15px; font-weight: 600; color: #eee; }
.nc-tag {
  font-size: 11px;
  padding: 2px 12px;
  border-radius: 12px;
  margin-left: auto;
  background: #2a2a2a;
  color: #888;
}
.nc-tag.training { background: #ff7a0022; color: #ff7a00; }
.nc-tag.rest { background: #3b82f622; color: #3b82f6; }
.nc-targets { display: flex; gap: 12px; flex-wrap: wrap; margin-bottom: 14px; }
.nc-item { flex: 1; min-width: 60px; }
.nc-value { display: block; font-size: 18px; font-weight: 700; color: #fff; }
.nc-label { font-size: 11px; color: #888; }
.nc-bar { height: 4px; background: #2a2a2a; border-radius: 4px; margin-top: 4px; overflow: hidden; }
.nc-fill { height: 100%; border-radius: 4px; transition: width 0.4s; }
.nc-meals { display: flex; flex-direction: column; gap: 6px; border-top: 1px solid #2a2a2a; padding-top: 12px; }
.nc-meal { display: flex; justify-content: space-between; font-size: 13px; flex-wrap: wrap; gap: 4px; }
.nc-meal-name { color: #aaa; font-weight: 500; }
.nc-meal-foods { color: #666; }
</style>