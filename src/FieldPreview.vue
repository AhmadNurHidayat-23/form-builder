<script setup lang="ts">
import type { Field } from './model';
defineProps<{ field: Field }>();
</script>
<template>
  <fieldset v-if="field.type === 'radio'" class="stack"><legend>{{ field.label }}{{ field.required ? ' *' : '' }}</legend><label v-for="option in field.options" :key="option" class="check"><input type="radio" :name="field.name" :value="option" :required="field.required">{{ option }}</label></fieldset>
  <label v-else-if="field.type === 'checkbox'" class="check"><input type="checkbox" :name="field.name" value="true" :required="field.required">{{ field.label }}{{ field.required ? ' *' : '' }}</label>
  <label v-else>{{ field.label }}{{ field.required ? ' *' : '' }}
    <select v-if="field.type === 'select'" :name="field.name" :required="field.required"><option value="">Pilih…</option><option v-for="option in field.options" :key="option" :value="option">{{ option }}</option></select>
    <textarea v-else-if="field.type === 'textarea'" :name="field.name" :placeholder="field.placeholder" :required="field.required" :minlength="field.minLength ? +field.minLength : undefined" />
    <input v-else :type="field.type" :name="field.name" :placeholder="field.placeholder" :required="field.required" :min="field.type === 'number' ? field.min : undefined" :max="field.type === 'number' ? field.max : undefined" :minlength="field.type !== 'number' && field.minLength ? +field.minLength : undefined" :pattern="field.type !== 'number' ? field.pattern || undefined : undefined" :step="field.type === 'number' ? 'any' : undefined">
  </label>
</template>
