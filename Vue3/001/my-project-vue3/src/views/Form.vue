<template>
   <div style="padding: 10px 0;">
    <div v-for="(v, i) in nameList" :key="i">
      {{v}}
    </div>

    <hr>
    <div v-for="(v, i) in nameList" :key="i">
      <a-input v-model:value="nameList[i]"></a-input>
      <!-- v-model cannot be used on v-for or v-slot scope variables because they are not writable -->
      <!-- <a-input v-model:value="v"></a-input> -->
    </div>
    <a-button @click="insertInput">insert</a-button>
    <a-button @click="handleSave">save</a-button>
    <hr>

    <hr>
  <a-form
    ref="formRef"
    :model="formState"
    :rules="rules"
    :label-col="labelCol"
    :wrapper-col="wrapperCol"
  >
    <a-form-item ref="name" label="Activity name" name="name">
      <a-input v-model:value="formState.name" />
    </a-form-item>
    <a-form-item label="Activity zone" name="region">
      <a-select v-model:value="formState.region" placeholder="please select your zone">
        <a-select-option value="shanghai">Zone one</a-select-option>
        <a-select-option value="beijing">Zone two</a-select-option>
      </a-select>
    </a-form-item>
    <a-form-item label="Activity time" required name="date1">
      <a-date-picker
        v-model:value="formState.date1"
        show-time
        type="date"
        placeholder="Pick a date"
        style="width: 100%"
      />
    </a-form-item>
    <a-form-item label="Instant delivery" name="delivery">
      <a-switch v-model:checked="formState.delivery" />
    </a-form-item>
    <a-form-item label="Activity type" name="type">
      <a-checkbox-group v-model:value="formState.type">
        <a-checkbox value="1" name="type">Online</a-checkbox>
        <a-checkbox value="2" name="type">Promotion</a-checkbox>
        <a-checkbox value="3" name="type">Offline</a-checkbox>
      </a-checkbox-group>
    </a-form-item>
    <a-form-item label="Resources" name="resource">
      <a-radio-group v-model:value="formState.resource">
        <a-radio value="1">Sponsor</a-radio>
        <a-radio value="2">Venue</a-radio>
      </a-radio-group>
    </a-form-item>
    <a-form-item label="Activity form" name="desc">
      <a-textarea v-model:value="formState.desc" />
    </a-form-item>
    <a-form-item :wrapper-col="{ span: 14, offset: 4 }">
      <a-button type="primary" @click="onSubmit">Create</a-button>&nbsp;&nbsp;
      <a-button type="primary" @click="onSubmit2">Test validate()</a-button>&nbsp;
      <a-button style="margin-left: 10px" @click="resetForm">Reset</a-button>&nbsp;&nbsp;
    </a-form-item>
  </a-form>
 
    <a-button @click="goHome">Go Home</a-button>
  </div>
</template>
<script lang="ts" setup>
import { Dayjs } from 'dayjs';
import { reactive, ref, toRaw, onMounted, toRefs } from 'vue';
import type { UnwrapRef } from 'vue';
import type { Rule } from 'ant-design-vue/es/form';
import { useRouter } from 'vue-router'

const router = useRouter()
interface FormState {
  name: string;
  region: string | undefined;
  date1: Dayjs | undefined;
  delivery: boolean;
  type: string[];
  resource: string;
  desc: string;
}

// interface state {
//   nameList: any
// }

const formRef = ref();
const labelCol = { span: 5 };
const wrapperCol = { span: 13 };

const state = reactive<state>({
  nameList: ['ab', 'c']
})

// const { nameList } = toRefs(state) 

const nameList = ref<string[]>(['ab', 'c'])

const formState: UnwrapRef<FormState> = reactive({
  name: '',
  region: undefined,
  date1: undefined,
  delivery: false,
  type: [],
  resource: '',
  desc: '',
});
const rules: Record<string, Rule[]> = {
  name: [
    { required: true, message: 'Please input Activity name', trigger: 'change' },
    { min: 3, max: 5, message: 'Length should be 3 to 5', trigger: 'blur' },
  ],
  region: [{ required: true, message: 'Please select Activity zone', trigger: 'change' }],
  date1: [{ required: true, message: 'Please pick a date', trigger: 'change', type: 'object' }],
  type: [
    {
      type: 'array',
      required: true,
      message: 'Please select at least one activity type',
      trigger: 'change',
    },
  ],
  resource: [{ required: true, message: 'Please select activity resource', trigger: 'change' }],
  desc: [{ required: true, message: 'Please input activity form', trigger: 'blur' }],
};

onMounted(() => {
  console.log('nameList')
  console.log(nameList.value)
})

function handleSave() {
  console.log('nameList2')
  console.log(nameList.value)
}
function insertInput() {
  nameList.value.push('')
}

const goHome = () => {
  router.push('/home')
}

const onSubmit2 = () => {
  console.log('formRef', formRef)
  formRef.value
    .validate(['name', 'region'])
    .then(() => {
      console.log('values', formState, toRaw(formState));
    })
    .catch(error => {
      console.log('error', error);
    });
};

const onSubmit = () => {
  formRef.value
    .validate()
    .then(() => {
      console.log('values', formState, toRaw(formState));
    })
    .catch(error => {
      console.log('error', error);
    });
};
const resetForm = () => {
  formRef.value.resetFields();
};
</script>

