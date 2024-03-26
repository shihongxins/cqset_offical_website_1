<script lang="ts" setup>
import type { IBrief, IContactInfomation, ISuggestion } from '~/types';
import type { Form, FormError, FormSubmitEvent } from "#ui/types"
import type { IResponseData } from '~/types/request';


const brief = useState<IBrief>('brief');
const contactInfomation = useState<IContactInfomation>('contact-infomation');

const genSuggestion = (): ISuggestion => {
  return {
    content: '',
    name: '',
    email: '',
    phone: '',
  }
}

const suggestion = reactive<ISuggestion>(genSuggestion());

const validateSuggestion = (formData: ISuggestion): FormError[] => {
  const errors = [];
  if (!formData.content) {
    errors.push({ path: 'content', message: '内容不能为空' });
  }
  if (!(formData.name.trim())) {
    errors.push({ path: 'name', message: '姓名不能为空' });
  }
  if (formData.name.length > 15) {
    errors.push({ path: 'name', message: '姓名长度不能超过15个字符' });
  }
  if (formData.email) {
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
      errors.push({ path: 'email', message: '邮箱格式不正确' });
    }
  }
  if (formData.phone) {
    if (!(/^(\+\d{1,4}\s?)?1[3-9]\d{9}$/.test(formData.phone) || /^0\d{2,3}-?\d{7,8}$/.test(formData.phone))) {
      errors.push({ path: 'phone', message: '电话格式不正确' });
    }
    if (formData.phone.length > 15) {
      errors.push({ path: 'phone', message: '电话长度不能超过15个字符' });
    }
  }
  if (!(formData.email + formData.phone).trim()) {
    errors.push({ path: 'phone', message: '请至少留下一直联系方式' });
    errors.push({ path: 'email', message: '请至少留下一直联系方式' });
  }
  return errors;
}

const refCompUFrom = ref<Form<ISuggestion>>();

const submitSuggestionLoading = ref(false);
const submitSuggestion = async (event: FormSubmitEvent<ISuggestion>) => {
  await refCompUFrom.value?.validate();
  submitSuggestionLoading.value = true;
  const resData = await $fetch('/backend/suggest/add', {
    method: 'post',
    body: event.data,
  }).catch((reason) => reason);
  submitSuggestionLoading.value = false;
  const isSuccess = (resData as IResponseData)?.code === 0;
  if (isSuccess) {
    Object.assign(suggestion, genSuggestion());
  }
  const toast = useToast();
  toast.add({
    icon: isSuccess ? 'i-heroicons-check-cricle' : 'i-heroicons-exclamation-cricle',
    color: isSuccess ? 'green' : 'red',
    title: isSuccess ? '提交成功' : '提交失败',
    description: isSuccess ? '感谢您的建议，我们会尽快处理' : (resData as IResponseData).msg || (resData as Error).message,
  });
}
</script>

<template>
  <main>
    <PageBanner banner-img-file-key="banner_aboutus"></PageBanner>
    <article class="container">
      <section class="brief">
        <h2 id="公司简介" class="section__title">公司简介</h2>
        <section class="dynamic-content__container" v-html="brief.content"></section>
      </section>
      <section class="contact-us">
        <h2 id="联系我们" class="section__title">联系我们</h2>
        <address class="text-sm text-center">
          <p>
            <span>电话：</span>
            <a :href="'tel:+86' + contactInfomation.phone">{{ contactInfomation.phone }}</a>
          </p>
          <p>
            <span>地址：</span>
            <a :href="contactInfomation.bMapLink" target="_blank" rel="noopener noreferrer">
              {{ contactInfomation.address }}
            </a>
          </p>
        </address>
        <div class="mt-9 border border-color-gray">
          <ClientOnly>
            <BaiduMap></BaiduMap>
          </ClientOnly>
        </div>
      </section>
      <section class="suggest">
        <h2 id="意见反馈" class="section__title">意见反馈</h2>
        <UForm ref="refCompUFrom" :state="suggestion" :validate="validateSuggestion" @submit="submitSuggestion">
          <UFormGroup label="意见反馈" name="content" required size="xl">
            <UTextarea v-model="suggestion.content" placeholder="请填写您的意见或建议" :rows="2" class="w-full" color="sky">
            </UTextarea>
          </UFormGroup>
          <UFormGroup label="您的姓名" name="name" required size="xl">
            <UInput v-model="suggestion.name" placeholder="请填写您的姓名" class="w-full" color="sky"></UInput>
          </UFormGroup>
          <UFormGroup label="联系邮箱" name="email" size="xl">
            <UInput v-model="suggestion.email" placeholder="请填写您的邮箱/" class="w-full" color="sky"></UInput>
          </UFormGroup>
          <UFormGroup label="联系电话" name="phone" size="xl">
            <div class="flex">
              <UInput v-model="suggestion.phone" placeholder="请填写您的电话/手机" class="flex-1" color="sky"></UInput>
              <UButton type="submit" class="ml-3" color="sky" :loading="submitSuggestionLoading">提交</UButton>
            </div>
          </UFormGroup>
        </UForm>
      </section>
    </article>
  </main>
</template>
