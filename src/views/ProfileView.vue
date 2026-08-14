<template>
  <div class="profile">
    <div class="profile-header">
      <div class="profile-avatar">👤</div>
      <div class="profile-name">健身爱好者</div>
      <div class="profile-since">加入 2026-08-01</div>
    </div>

    <div class="card">
      <div class="card-title">📋 身体档案</div>
      <div class="field-row">
        <span class="field-label">身高</span>
        <span class="field-value">175 cm</span>
      </div>
      <div class="field-row">
        <span class="field-label">体重</span>
        <span class="field-value">72.5 kg</span>
      </div>
      <div class="field-row">
        <span class="field-label">体脂</span>
        <span class="field-value">14%</span>
      </div>
      <div class="field-row">
        <span class="field-label">训练目标</span>
        <span class="field-value">增肌</span>
      </div>
    </div>

    <div class="card">
      <div class="card-title">⚙️ 设置</div>
      <div class="field-row">
        <span class="field-label">单位</span>
        <span class="field-value">kg / cm</span>
      </div>
      <div class="field-row">
        <span class="field-label">主题</span>
        <span class="field-value">深色模式</span>
      </div>
      <div class="field-row">
        <span class="field-label">离线存储</span>
        <span class="field-value">✅ 已启用</span>
      </div>
      <button class="danger-btn">📤 导出所有数据</button>
    </div>
  </div>
</template>

<script setup lang="ts">
</script>

<style scoped>
.profile { display: flex; flex-direction: column; gap: 16px; }
.profile-header {
  text-align: center;
  padding: 20px 0 10px;
}
.profile-avatar {
  font-size: 56px;
  margin-bottom: 8px;
}
.profile-name { font-size: 22px; font-weight: 700; color: #fff; }
.profile-since { font-size: 13px; color: #666; }
.card {
  background: #141414;
  border-radius: 16px;
  padding: 16px 18px;
  border: 1px solid #222;
}
.card-title { font-weight: 600; color: #eee; margin-bottom: 12px; }
.field-row {
  display: flex;
  justify-content: space-between;
  padding: 8px 0;
  border-bottom: 1px solid #1a1a1a;
}
.field-label { color: #888; font-size: 14px; }
.field-value { color: #eee; font-weight: 500; }
.danger-btn {
  margin-top: 12px;
  padding: 10px;
  width: 100%;
  border-radius: 10px;
  border: 1px solid #ff4d4f44;
  background: #2a1a1a;
  color: #ff6b6b;
  cursor: pointer;
  font-weight: 600;
}
</style>