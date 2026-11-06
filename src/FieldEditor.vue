<script setup lang="ts">
import type { Field } from './model';
defineProps<{ field: Field }>();
</script>
<template><div class="stack"><label>Label<input v-model="field.label"></label><label>Nama field<input v-model="field.name"></label><label>Placeholder<input v-model="field.placeholder"></label><label class="check"><input v-model="field.required" type="checkbox">Wajib diisi</label>
<label v-if="['select','radio'].includes(field.type)">Pilihan (satu per baris)<textarea :value="field.options.join(String.fromCharCode(10))" @input="field.options = ($event.target as HTMLTextAreaElement).value.split(String.fromCharCode(10)).filter(Boolean)" /></label>
<div v-if="field.type === 'number'" class="two"><label>Minimum<input :value="field.min" @input="field.min = ($event.target as HTMLInputElement).value" type="number"></label><label>Maksimum<input :value="field.max" @input="field.max = ($event.target as HTMLInputElement).value" type="number"></label></div>
<label v-if="['text','email','textarea'].includes(field.type)">Panjang minimum<input :value="field.minLength" @input="field.minLength = ($event.target as HTMLInputElement).value" type="number" min="0" max="10000"></label><label v-if="['text','email'].includes(field.type)">Pola validasi (regex HTML)<input v-model="field.pattern" placeholder="Contoh: [A-Za-z]+"></label>
</div></template>
