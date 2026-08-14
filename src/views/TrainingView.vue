<template>
  <div class="training">
    <h2 class="page-title">💪 训练</h2>

    <!-- 快速入口 -->
    <div class="quick-actions">
      <button class="qa-btn" @click="showTemplate = true">📋 套用模板</button>
      <button class="qa-btn primary" @click="showPicker = true">🎯 自由编排</button>
    </div>

    <!-- 最近训练 -->
    <div class="recent-section">
      <div class="section-header">
        <span>📋 最近训练</span>
        <button class="text-btn">查看全部</button>
      </div>
      <div v-if="recentWorkouts.length === 0" class="empty-state">
        还没有训练记录，开始你的第一次训练吧！💪
      </div>
      <div v-else class="workout-list">
        <div v-for="w in recentWorkouts" :key="w.id" class="workout-item">
          <div class="wi-main">
            <span class="wi-action">{{ w.action }}</span>
            <span class="wi-detail">{{ w.bodyPart }} · {{ w.sets }}组 × {{ w.reps }}次 · {{ w.weight }}kg</span>
          </div>
          <span class="wi-date">{{ w.date }}</span>
        </div>
      </div>
    </div>

    <!-- 动作库筛选 -->
    <div class="library-section">
      <div class="section-header">
        <span>🏋️ 动作库</span>
      </div>
      <div class="filter-tabs">
        <button
          v-for="part in bodyParts"
          :key="part"
          :class="['filter-btn', { active: selectedPart === part }]"
          @click="selectedPart = part"
        >
          {{ part }}
        </button>
      </div>
      <div class="action-grid">
        <div v-for="action in filteredActions" :key="action" class="action-chip">
          {{ action }}
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, computed } from 'vue'
import { workoutStore } from '../stores/workoutStore'

const bodyParts = ['胸部', '背部', '肩部', '手臂', '腿部', '核心']
const selectedPart = ref('胸部')

const actionMap: Record<string, string[]> = {
  '胸部': ['杠铃卧推', '哑铃卧推', '上斜卧推', '双杠臂屈伸', '绳索夹胸', '蝴蝶机夹胸', '哑铃飞鸟'],
  '背部': ['引体向上', '高位下拉', '杠铃俯身划船', '单臂哑铃划船', 'T杠划船', '直臂下压', '面拉'],
  '肩部': ['站姿杠铃推举', '哑铃推举', '侧平举', '前平举', '俯身反向飞鸟', '阿诺推举'],
  '手臂': ['绳索下压', '仰卧臂屈伸', '窄距卧推', '杠铃弯举', '哑铃交替弯举', '锤式弯举'],
  '腿部': ['杠铃深蹲', '硬拉', '哈克深蹲', '保加利亚分腿蹲', '臀桥', '腿屈伸', '腿弯举'],
  '核心': ['平板支撑', '悬垂举腿', '卷腹', '俄罗斯转体'],
}

const filteredActions = computed(() => actionMap[selectedPart.value] || [])

const showTemplate = ref(false)
const showPicker = ref(false)

const recentWorkouts = computed(() => {
  return workoutStore.workouts.value.slice(0, 5)
})
</script>

<style scoped>
.training { display: flex; flex-direction: column; gap: 18px; }
.page-title { font-size: 22px; font-weight: 700; color: #fff; }
.quick-actions { display: flex; gap: 10px; }
.qa-btn {
  flex: 1;
  padding: 14px;
  border-radius: 12px;
  border: none;
  background: #1a1a1a;
  color: #ccc;
  font-weight: 600;
  font-size: 15px;
  cursor: pointer;
}
.qa-btn.primary { background: #ff7a00; color: #fff; }
.section-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  font-weight: 600;
  color: #eee;
}
.text-btn {
  background: transparent;
  border: none;
  color: #666;
  font-size: 13px;
  cursor: pointer;
}
.empty-state {
  text-align: center;
  padding: 30px 0;
  color: #555;
  font-size: 14px;
}
.workout-list { display: flex; flex-direction: column; gap: 8px; }
.workout-item {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 10px 14px;
  background: #1a1a1a;
  border-radius: 10px;
}
.wi-action { font-weight: 600; color: #eee; font-size: 14px; }
.wi-detail { font-size: 12px; color: #888; margin-left: 8px; }
.wi-date { font-size: 12px; color: #555; }
.library-section { background: #141414; border-radius: 16px; padding: 16px 18px; border: 1px solid #222; }
.filter-tabs { display: flex; flex-wrap: wrap; gap: 6px; margin: 10px 0 14px; }
.filter-btn {
  padding: 4px 14px;
  border-radius: 16px;
  border: 1px solid #2a2a2a;
  background: transparent;
  color: #888;
  font-size: 12px;
  cursor: pointer;
}
.filter-btn.active { background: #ff7a00; color: #fff; border-color: #ff7a00; }
.action-grid { display: flex; flex-wrap: wrap; gap: 8px; }
.action-chip {
  padding: 4px 14px;
  background: #1a1a1a;
  border-radius: 16px;
  font-size: 13px;
  color: #ccc;
}
</style>