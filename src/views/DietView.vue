<template>
  <div class="diet">
    <h2 class="page-title">🍽️ 饮食规划</h2>

    <div class="day-toggle">
      <button
        v-for="type in ['training', 'rest']"
        :key="type"
        :class="['toggle-btn', { active: dayType === type }]"
        @click="dayType = type"
      >
        {{ type === 'training' ? '🔥 训练日' : '💤 休息日' }}
      </button>
    </div>

    <NutritionCard
      :day-type="dayType"
      :items="nutritionItems"
      :meals="todayMeals"
    />

    <div class="food-tracker">
      <div class="ft-header">
        <span>📝 自主记录饮食</span>
        <button class="ft-btn">+ 添加食物</button>
      </div>
      <div class="ft-empty">今日还没有记录，添加你的第一餐吧！</div>
    </div>

    <div class="water-tracker">
      <div class="wt-header">
        <span>💧 饮水打卡</span>
        <span class="wt-count">{{ waterCount }}/8 杯</span>
      </div>
      <div class="wt-buttons">
        <button v-for="i in 8" :key="i" class="wt-btn" :class="{ done: i <= waterCount }" @click="waterCount = i">
          {{ i }}
        </button>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import NutritionCard from '../components/NutritionCard.vue'

const dayType = ref<'training' | 'rest'>('training')
const waterCount = ref(4)

const nutritionItems = ref([
  { label: '热量', value: '2450 kcal', percent: 75, color: '#ff7a00' },
  { label: '蛋白质', value: '160g', percent: 80, color: '#00d4aa' },
  { label: '碳水', value: '280g', percent: 70, color: '#3b82f6' },
  { label: '脂肪', value: '70g', percent: 60, color: '#ff6b6b' },
])

const todayMeals = ref([
  { name: '早餐', foods: ['燕麦 50g', '鸡蛋 2个', '牛奶 200ml'] },
  { name: '午餐', foods: ['糙米 150g', '鸡胸肉 200g', '西兰花 100g'] },
  { name: '晚餐', foods: ['红薯 200g', '牛肉 150g', '菠菜 80g'] },
])
</script>

<style scoped>
.diet { display: flex; flex-direction: column; gap: 16px; }
.page-title { font-size: 22px; font-weight: 700; color: #fff; }
.day-toggle { display: flex; gap: 8px; }
.toggle-btn {
  flex: 1;
  padding: 10px;
  border-radius: 10px;
  border: 1px solid #2a2a2a;
  background: transparent;
  color: #888;
  font-weight: 600;
  cursor: pointer;
}
.toggle-btn.active { background: #ff7a00; color: #fff; border-color: #ff7a00; }
.food-tracker, .water-tracker {
  background: #141414;
  border-radius: 16px;
  padding: 16px 18px;
  border: 1px solid #222;
}
.ft-header, .wt-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  font-weight: 600;
  color: #eee;
}
.ft-btn {
  padding: 4px 14px;
  border-radius: 8px;
  border: none;
  background: #2a2a2a;
  color: #ccc;
  cursor: pointer;
  font-size: 12px;
}
.ft-empty {
  text-align: center;
  padding: 20px 0;
  color: #555;
  font-size: 14px;
}
.wt-count { font-size: 14px; color: #888; font-weight: 400; }
.wt-buttons { display: flex; gap: 6px; margin-top: 10px; flex-wrap: wrap; }
.wt-btn {
  width: 36px; height: 36px;
  border-radius: 50%;
  border: 1px solid #2a2a2a;
  background: transparent;
  color: #666;
  cursor: pointer;
  font-size: 13px;
  transition: all 0.2s;
}
.wt-btn.done { background: #3b82f6; color: #fff; border-color: #3b82f6; }
</style>