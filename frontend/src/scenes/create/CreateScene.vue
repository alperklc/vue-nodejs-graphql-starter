<template>
  <scene>
    <div slot="scene-header-title">
      Create new record
    </div>
    <span
      class="scene__header-right-btn"
      slot="scene-header-right-btn"
      @click="goBack">
      <i class="fa fa-times" />
    </span>
    <div
      slot="scene-body"
      class="scene__body">
      <label class="scene-body__field-container">
        <span>Date</span>
        <input
          class="scene-body__field-input"
          type="text"
          v-model="record.date" >
      </label>
      <label class="scene-body__field-container">
        <span>Description</span>
        <input
          class="scene-body__field-input"
          type="text"
          v-model="record.description" >
      </label>
      <toast-message ref="toastr"/>
    </div>
    <div
      slot="scene-footer"
      class="scene__footer scene__footer--create-scene">
      <button
        @click="save()"
        class="scene__footer-button scene__footer-button--save">
        Create
      </button>
    </div>
  </scene>
</template>

<script>
import data from "@/data";
import router from "@/router";
import Scene from "@/components/Scene";
import ToastMessage from "@/components/ToastMessage";

export default {
  components: {
    Scene,
    ToastMessage
  },
  data() {
    return {
      record: {
        date: new Date().toISOString().substr(0, 10),
        description: undefined
      }
    };
  },
  computed: {
    mutation() {
      return data.createRecord;
    }
  },
  methods: {
    save() {
      this.$apollo
        .mutate({
          mutation: this.mutation,
          variables: this.record
        })
        .then(() => {
          this.$refs.toastr.display(
            "Record has been successfully created.",
            this.goBack
          );
        })
        .catch(() => {
          this.$refs.toastr.display(
            "Something went wrong. Please try again later."
          );
        });
    },
    goBack() {
      router.go(-1)
    },
  }
};
</script>
