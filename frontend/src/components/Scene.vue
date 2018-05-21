<template>
  <div>
    <side-navigation :is-open="sidenavOpen" />
    <div 
      v-if="sidenavOpen" 
      class="scene-overlay" 
      @click="toggleNavigation()" />
    <div class="scene">
      <div class="scene__header">
        <span 
          class="scene__header-nav-btn" 
          @click="toggleNavigation">
          <i class="fa fa-bars" />
        </span>
        <slot name="scene-header-title" />
        <slot name="scene-header-right-btn" />
      </div>
      <slot 
        class="scene__body" 
        name="scene-body" />
      <slot 
        class="scene__footer" 
        name="scene-footer" />
    </div>
  </div>
</template>

<script>
import SideNavigation from "./SideNavigation"

export default {
  components: {
    SideNavigation
  },
  data() {
    return {
      sidenavOpen: false
    }
  },
  methods: {
    toggleNavigation() {
      this.sidenavOpen = !this.sidenavOpen
    }
  }
};
</script>
