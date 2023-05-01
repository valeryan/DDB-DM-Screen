<template>
  <div class="dms-header" v-if="character">
    <div
      class="dms-header-background"
      :style="
        'background-image: url(' + getBackdrop(character.decorations) + ');'
      "
    ></div>
    <div class="dms-character">
      <div class="dms-portrait">
        <div
          class="dms-portrait-image"
          :style="
            'background-image: url(' + getAvatar(character.decorations) + ');'
          "
        ></div>
        <div
          class="dms-portrait-frame"
          :style="
            'background-image: url(' + getFrame(character.decorations) + ');'
          "
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
import { CharacterData, Decorations } from "../models/CharacterData";
import { defineComponent, PropType } from "vue";
import { appStore } from "../store/app-store";
import { constants } from "../utils";

export default defineComponent({
  name: "CharacterCardHeader",
  methods: {
    getAvatar(decorations: Decorations) {
      return decorations.avatar.avatarUrl ?? constants.defaultAvatarUrl;
    },
    getFrame(decorations: Decorations) {
      return decorations.avatar.frameUrl;
    },
    getBackdrop(decorations: Decorations) {
      return decorations.backdrop.backdropAvatarUrl;
    },
  },
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
  .dms-header-background {
    position: absolute;
    top: 0;
    right: 0;
    left: 0;
    bottom: 0;
    background-repeat: no-repeat;
    background-size: cover;
    background-position: top;
    &::after {
      content: "";
      position: absolute;
      top: 0;
      right: 0;
      left: 0;
      bottom: 0;
      background-color: rgba(0, 0, 0, 0.4);
      backdrop-filter: blur(1px);
    }
  }
  .dms-character {
    position: relative;
    z-index: 1;
    width: 100%;
    display: flex;
    margin: 10px 0;
    .dms-portrait {
      flex: 0 0 auto;
    }
    .dms-portrait-image {
      background-position: center center;
      background-size: cover;
      border-radius: 50%;
      border: none;
      height: 60px;
      width: 60px;
      margin-right: 10px;
    }
    .dms-portrait-frame {
      position: absolute;
      background-size: contain;
      background-repeat: no-repeat;
      width: 85px;
      height: 85px;
      top: -13px;
      left: -13px;
      overflow: hidden;
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
    position: relative;
    z-index: 1;
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
