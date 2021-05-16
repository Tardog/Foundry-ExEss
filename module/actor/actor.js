/**
 * Extend the base Actor entity by defining a custom roll data structure which is ideal for the Simple system.
 * @extends {Actor}
 */
export class ExaltedessenceActor extends Actor {

  /**
   * Augment the basic actor data with additional dynamic data.
   */
  prepareData() {
    super.prepareData();

    const actorData = this.data;
    const data = actorData.data;
    const flags = actorData.flags;

    // Make separate methods for each Actor type (character, npc, etc.) to keep
    // things organized.
    if (actorData.type === 'character') this._prepareCharacterData(actorData);
  }

  /**
   * Prepare Character type specific data
   */
  _prepareCharacterData(actorData) {
    const data = actorData.data;

    // Make modifications to data here. For example:
    // Calculate current wound penalty and total health for individual wound levels.
    let totalHealth = 0;
    let currentPenalty = 0;
    for (let [key, health_level] of Object.entries(data.health.levels)) {
      if(data.health.damage > totalHealth) {
        currentPenalty = health_level.penalty
      }
      totalHealth += health_level.value;
    }
    data.health.total = totalHealth;
    data.health.penalty = currentPenalty;
  }

}