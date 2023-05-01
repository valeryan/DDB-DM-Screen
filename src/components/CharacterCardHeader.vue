<template>
  <div class="dms-header" v-if="character">
    <div class="dms-character">
      <div class="dms-portrait">
        <div
          class="dms-portrait-image"
          :style="'background-image: url(' + character.avatarUrl + ');'"
        ></div>
      </div>
      <div class="dms-info">
        <div class="dms-info-primary">
          {{ character.name }}
        </div>
        <div class="dms-info-secondary">
          Lvl {{ character.level }} | {{ character.race?.name }}
        </div>
        <div class="dms-info-secondary">
          <template v-for="cl in character.classes" :key="cl.name"
            >{{ cl.name }}
            {{
              cl.subclassName != null ? "/ " + cl.subclassName : ""
            }}</template
          >
        </div>
        <div class="dms-info-secondary">Player: {{ character.userName }}</div>
      </div>
      <div class="dms-health">
        <div class="dms-health-hp">
          {{ character.hitPointInfo?.current }}/{{
            character.hitPointInfo?.maximum
          }}
        </div>
        <div class="dms-health-label">Hit Points</div>
      </div>
    </div>
    <div class="dms-stats">
      <div class="dms-stat-block">
        <div class="dms-stat-value">{{ character.passivePerception }}</div>
        <div class="dms-stat-label">Passive Perception</div>
      </div>
      <div class="dms-stat-block">
        <div class="dms-stat-value">{{ character.passiveInvestigation }}</div>
        <div class="dms-stat-label">Passive Investigation</div>
      </div>
      <div class="dms-stat-block">
        <div class="dms-stat-value">{{ character.passiveInsight }}</div>
        <div class="dms-stat-label">Passive Insight</div>
      </div>
      <div class="dms-stat-block">
        <div class="dms-stat-value">{{ character.armorClass }}</div>
        <div class="dms-stat-label">Armor Class</div>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { CharacterData } from "../models/CharacterData";
import { defineComponent, PropType } from "vue";
import { appStore } from "../store/app-store";

export default defineComponent({
  name: "CharacterCardHeader",
  props: {
    character: {
      type: Object as PropType<CharacterData>,
      require: true,
    },
  },
  setup: () => {
    return {
      appState: appStore.getState(),
    };
  },
});
</script>
<style lang="scss">
.dms-header {
  position: relative;
  padding: 10px;
  background-color: rgb(27, 27, 27);
  color: #fff;
  .dms-character {
    width: 100%;
    display: flex;
    margin: 10px 0;
    .dms-portrait {
      flex: 0 0 auto;
    }
    .dms-portrait-image {
      background-position: center center;
      background-size: cover;
      border-radius: 3px;
      height: 60px;
      width: 60px;
      margin-right: 10px;
    }
    .dms-info {
      flex: 1 1 100%;
      min-width: 0;
      padding-right: 10px;
    }
    .dms-health {
      text-align: center;
    }
  }

  .dms-stats {
    width: 100%;
    display: flex;
    margin: 10px 0;
    .dms-stat-block {
      text-align: center;
      max-width: 25%;
      width: 25%;
      margin: 0 15px;
    }
    .dms-stat-label {
      word-spacing: 100vw;
    }
  }
}
</style>
