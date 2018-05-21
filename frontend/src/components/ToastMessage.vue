<template>
  <div
    v-if="visible"
    class="toast-message-container">
    <div class="toast-message">
      <span>{{ message }}</span>
    </div>
  </div>
</template>

<script>
export default {
  props: {
    duration: { type: Number, default: 2000 }
  },
  data() {
    return {
      visible: false,
      message: ""
    };
  },
  methods: {
    display (message, callback) {
      this.message = message
      this.visible = true
      setTimeout(() => {
        this.visible = false
        this.message = ""
        callback()
      }, this.duration)
    }
  }
};
</script>
