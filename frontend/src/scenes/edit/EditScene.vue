<template>
  <scene>
    <div slot="scene-header-title">
      Edit record
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
        @click="deleteRecord()"
        class="scene__footer-button scene__footer-button--delete">
        Delete
      </button>
      <button
        @click="saveChanges()"
        class="scene__footer-button scene__footer-button--save">
        Save
      </button>
    </div>
  </scene>
</template>

<script>
import data from "@/data";
import gql from "graphql-tag";

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
        date: undefined,
        description: undefined
      },
      initialRecord: undefined
    };
  },
  computed: {
    recordId() {
      return this.$router.currentRoute.path.split("/").pop();
    }
  },
  created() {
    this.loadRecord();
  },
  watch: {
    initialRecord() {
      this.record = Object.assign({}, this.initialRecord);
    }
  },
  methods: {
    loadRecord() {
      this.$apollo
        .query({
          query: data.getRecordById,
          variables: {
            id: this.recordId
          }
        })
        .then(({ data }) => {
          this.initialRecord = data.record;
        })
        .catch(() => {
          this.$refs.toastr.display(
            "Something went wrong. Please try again later."
          );
        });
    },
    saveChanges() {
      // TODO: disable save button if the record doesn't have any change
      this.$apollo
        .mutate({
          mutation: data.updateRecord,
          variables: this.record
        })
        .then(() => {
          this.$refs.toastr.display(
            "Record has been successfully updated.",
            this.goBack
          );
        })
        .catch(() => {
          this.$refs.toastr.display(
            "Something went wrong. Please try again later."
          );
        });
    },
    deleteRecord() {
      this.$apollo
        .mutate({
          mutation: data.deleteRecord,
          variables: {
            id: this.record.id
          }
        })
        .then(() => {
          this.$refs.toastr.display(
            "Record has been successfully deleted.",
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
      router.go(-1);
    }
  }
};
</script>

<style>
.scene__footer-button {
  width: 50%;
}

.scene__footer-button:first {
  float: left;
}

.scene__footer-button:nth-child(2) {
  float: right;
}
</style>
