<template>
  <div class="app-wrapper">
    <div class="app-content">
      <HomeView v-if="currentTab === 'home'" />
      <TrainingView v-else-if="currentTab === 'training'" />
      <AnalysisView v-else-if="currentTab === 'analysis'" />
      <DietView v-else-if="currentTab === 'diet'" />
      <ProfileView v-else />
    </div>
    <nav class="bottom-nav">
      <button
        v-for="tab in tabs"
        :key="tab.key"
        :class="['nav-item', { active: currentTab === tab.key }]"
        @click="currentTab = tab.key"
      >
        <span class="nav-icon">{{ tab.icon }}</span>
        <span class="nav-label">{{ tab.label }}</span>
      </button>
    </nav>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import HomeView from '../views/HomeView.vue'
import TrainingView from '../views/TrainingView.vue'
import AnalysisView from '../views/AnalysisView.vue'
import DietView from '../views/DietView.vue'
import ProfileView from '../views/ProfileView.vue'

const tabs = [
  { key: 'home', icon: '🏠', label: '首页' },
  { key: 'training', icon: '💪', label: '训练' },
  { key: 'analysis', icon: '📊', label: '分析' },
  { key: 'diet', icon: '🍽️', label: '饮食' },
  { key: 'profile', icon: '👤', label: '个人' },
]

const currentTab = ref('home')
</script>

<style>
* { margin: 0; padding: 0; box-sizing: border-box; }
body {
  font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif;
  background: #0d0d0d;
  color: #eee;
  min-height: 100vh;
}
.app-wrapper {
  max-width: 480px;
  margin: 0 auto;
  min-height: 100vh;
  display: flex;
  flex-direction: column;
  background: #0d0d0d;
  position: relative;
  padding-bottom: 70px;
}
.app-content {
  flex: 1;
  padding: 16px 16px 80px;
  overflow-y: auto;
}
.bottom-nav {
  position: fixed;
  bottom: 0;
  left: 50%;
  transform: translateX(-50%);
  width: 100%;
  max-width: 480px;
  display: flex;
  justify-content: space-around;
  background: #141414;
  border-top: 1px solid #2a2a2a;
  padding: 8px 0 12px;
  z-index: 100;
}
.nav-item {
  display: flex;
  flex-direction: column;
  align-items: center;
  background: transparent;
  border: none;
  color: #666;
  cursor: pointer;
  padding: 4px 12px;
  transition: color 0.2s;
  min-width: 52px;
}
.nav-item.active { color: #ff7a00; }
.nav-icon { font-size: 20px; }
.nav-label { font-size: 10px; margin-top: 2px; }
</style>