<template>
  <scene>
    <div
      slot="scene-header-title"
      class="scene__title">
      <div class="scene__header-search">
        <input
          placeholder="Tap here to search..."
          v-model="q" />
        <span class="scene__header-search-clear">
          <i
            v-if="!!q" class="fa fa-times"
            @click="q = undefined" />
        </span>
      </div>
    </div>
    <div
      slot="scene-body"
      class="scene__body">
      <div
        v-if="isLoading"
        class="loading-indicator">
        <i class="fa fa-spinner fa-spin" />
      </div>
      <ul
        v-else
        class="records-list">
        <li
          class="records-list__item"
          v-for="item in items"
          :key="item.id"
          @click="$router.push({path: `records/${item.id}`})">
          <span class="records-list__item-description">{{ item.description }}</span>
          <small>
            <span class="records-list__item-date">{{ item.date }}</span>
          </small>
        </li>
      </ul>
    </div>
    <div
      slot="scene-footer"
      class="scene__footer">
      <span
        class="scene__footer-add-btn"
        @click="$router.push({path: 'new'})">
        <i class="fa fa-plus" />
      </span>
    </div>
  </scene>
</template>

<script>
import data from "@/data";
import Scene from "@/components/Scene";

export default {
  components: {
    Scene
  },
  data() {
    return {
      loading: 0,
      q: undefined
    };
  },
  computed: {
    isLoading() {
      return this.loading > 0;
    }
  },
  apollo: {
    items: {
      query() {
        return data.queryRecords;
      },
      variables() {
        return {
          keyword: this.q || "",
          // TODO: add date time picker to the UI
          dateGreaterThanEqual: "1999-12-31",
          dateLessThanEqual: "2018-08-08"
        };
      },
      loadingKey: "loading",
      fetchPolicy: "network-only"
    }
  }
};
</script>
