<script setup>
import { useStore } from "vuex";

import { ref } from "vue";

const $store = useStore();

const inputValues = ref($store.state.data);

function addKid() {
  inputValues.value.kids.push({
    name: {
      value: "",
      isEmpty: false,
    },
    age: {
      value: "",
      isEmpty: false,
    },
  });
}

function saveData() {
  if (
    !inputValues.value.parent.name.value ||
    !inputValues.value.parent.age.value
  ) {
    inputValues.value.parent.name.isEmpty = !inputValues.value.parent.name.value
      ? true
      : false;
    inputValues.value.parent.age.isEmpty = !inputValues.value.parent.age.value
      ? true
      : false;
  } else {
    inputValues.value.parent.name.isEmpty = false;
    inputValues.value.parent.age.isEmpty = false;

    if (inputValues.value.kids.length > 0) {
      if (
        inputValues.value.kids.some((kid) => !kid.name.value || !kid.age.value)
      ) {
        inputValues.value.kids = inputValues.value.kids.map((kid) => ({
          name: { ...kid.name, isEmpty: !kid.name.value ? true : false },
          age: { ...kid.age, isEmpty: !kid.age.value ? true : false },
        }));
      } else {
        inputValues.value.kids = inputValues.value.kids.map((kid) => ({
          name: { ...kid.name, isEmpty: false },
          age: { ...kid.age, isEmpty: false },
        }));
        $store.commit("saveData", inputValues.value);
      }
    } else {
      $store.commit("saveData", inputValues.value);
    }
  }
}

function isNumber(e) {
  let char = String.fromCharCode(e.keyCode);
  if (/^[0-9]+$/.test(char)) return true;
  else e.preventDefault();
}
</script>

<template>
  <div class="form">
    <div class="form__personal-data-container">
      <div class="form__header-container">
        <h2>Персональные данные</h2>
      </div>
      <div class="form__input">
        <input
          :style="{
            border: inputValues.parent.name.isEmpty
              ? '1px solid var(--red)'
              : '1px solid var(--gray-l)',
          }"
          id="name-input-main"
          type="text"
          placeholder="Введите имя"
          v-model="inputValues.parent.name.value"
        />
        <label for="name-input-main">Имя</label>
      </div>
      <div class="form__input">
        <input
          :style="{
            border: inputValues.parent.age.isEmpty
              ? '1px solid var(--red)'
              : '1px solid var(--gray-l)',
          }"
          id="age-input-main"
          type="text"
          placeholder="Введите возраст"
          v-model="inputValues.parent.age.value"
          keypress="isNumber($event)"
        />
        <label for="age-input-main">Возраст</label>
      </div>
    </div>
    <div class="form__kids-container">
      <div class="form__top-options-container">
        <h2>Дети (макс. 5)</h2>
        <button
          :style="{
            visibility: inputValues.kids.length < 5 ? 'visible' : 'hidden',
          }"
          @click="addKid()"
        >
          <img src="/assets/plus_icon.svg" alt="plus sign" /><span
            >Добавить ребёнка</span
          >
        </button>
      </div>

      <div class="form__kids">
        <div v-for="(kid, index) in inputValues.kids" class="form__kid">
          <div class="form__input">
            <input
              :style="{
                border: kid.name.isEmpty
                  ? '1px solid var(--red)'
                  : '1px solid var(--gray-l)',
              }"
              :id="`name-input-${index}`"
              type="text"
              placeholder="Введите имя"
              v-model="kid.name.value"
            />
            <label :for="`name-input-${index}`">Имя</label>
          </div>
          <div class="form__input">
            <input
              :style="{
                border: kid.age.isEmpty
                  ? '1px solid var(--red)'
                  : '1px solid var(--gray-l)',
              }"
              :id="`age-input-${index}`"
              type="text"
              placeholder="Введите возраст"
              v-model="kid.age.value"
              keypress="isNumber($event)"
            />
            <label :for="`age-input-${index}`">Возраст</label>
          </div>
          <div
            class="form__delete-button"
            @click="inputValues.kids.splice(index, 1)"
          >
            Удалить
          </div>
        </div>
      </div>
    </div>
    <button @click="saveData()" class="form__save-button">Сохранить</button>
  </div>
</template>
