<template>
  <li class="dms-card">
    <div class="dms-header">
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
          Lvl {{ character.level }} | {{ character.race.name }}
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
          {{ character.hitPointInfo.current }}/{{
            character.hitPointInfo.maximum
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
    <div class="ddb-campaigns-character-card-footer">
      <div class="ddb-campaigns-character-card-footer-links">
        <a
          :href="'/profile/' + character.userName + '/characters/' + character.characterId"
          class="
            ddb-campaigns-character-card-footer-links-item
            ddb-campaigns-character-card-footer-links-item-view
          "
          >View</a
        >
        <a
          :href="'/profile/' + character.userName + '/characters/' + character.characterId + '/builder'"
          class="
            ddb-campaigns-character-card-footer-links-item
            ddb-campaigns-character-card-footer-links-item-edit
          "
          >Edit</a
        >

        <a
          class="
            modal-link
            ddb-campaigns-character-card-footer-links-item
            ddb-campaigns-character-card-footer-links-item-deactivate
          "
          :href="'/campaigns/' + character.campaign.id + '/deactivate-character/' + character.characterId"
          data-title="Deactivate Character"
          data-confirm-message="Are you sure you want to deactivate this character?"
          data-modal-class="t-deactivate-character-modal"
          >Deactivate</a
        >

        <a
          class="
            modal-link
            ddb-campaigns-character-card-footer-links-item
            ddb-campaigns-character-card-footer-links-item-remove
          "
          :href="'/campaigns/' + character.campaign.id + '/remove-character/' + character.characterId"
          data-title="Remove Character"
          data-confirm-message="Are you sure you want to remove this character?"
          data-modal-class="t-remove-character-modal"
          >Remove</a
        >
      </div>
    </div>
  </li>
</template>

<script lang="ts">
import { CharacterData } from "../models/CharacterData";
import { defineComponent, PropType } from "vue";

export default defineComponent({
  name: "CharacterCard",
  props: {
    character: {
      type: Object as PropType<CharacterData>,
      require: true,
    },
  },
});
</script>

<style lang="scss">
.dms-character-container {
  .dms-card {
    background: rgb(27, 27, 27);
    padding: 10px;
    color: white;
    .dms-header {
      width: 100%;
      display: flex;
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
}
</style>
