import { expect, request } from "@playwright/test";

export async function createAuthedApi(baseURL) {
  return await request.newContext({
    baseURL,
    storageState: './state/user-state.json',
    httpCredentials: {
      username: process.env.AUTH_USER || "",
      password: process.env.AUTH_PASS || "",
    },
    extraHTTPHeaders: {
      accept: "application/json",
      "content-type": "application/json",
    },
  });
}

export async function getValidBrandModel(api) {
  const brandsRes = await api.get("/api/cars/brands");
  expect(brandsRes.ok(), await brandsRes.text()).toBeTruthy();
  const brands = (await brandsRes.json()).data;
  const brandId = brands[0].id;

  const modelsRes = await api.get(`/api/cars/models?carBrandId=${brandId}`);
  expect(modelsRes.ok(), await modelsRes.text()).toBeTruthy();
  const models = (await modelsRes.json()).data;
  const modelId = models[0].id;

  return { brandId, modelId };
}