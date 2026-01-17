import { test, expect, request } from '@playwright/test';
import { getValidBrandModel, createAuthedApi } from './utils.js';
import path from 'path';

const STORAGE_PATH = path.resolve('state/user-state.json');

test.describe('/api/cars POST (create)', () => {
  test('POST /api/cars | 201', async ({ baseURL }) => {
    const api = await createAuthedApi(baseURL);
    const { brandId, modelId } = await getValidBrandModel(api);

    const res = await api.post('/api/cars', {
      data: { carBrandId: brandId, carModelId: modelId, mileage: 23452 },
    });

    expect(res.status()).toBe(201);

    const json = await res.json();

    expect(json.status).toBe('ok');

    await api.delete(`/api/cars/${json.data.id}`);
  });

  test('POST /api/cars | 400 | invalid carId', async ({ baseURL }) => {
    const api = await createAuthedApi(baseURL);
    const { brandId, modelId } = await getValidBrandModel(api);

    const res = await api.post('/api/cars', {
      data: { carBrandId: brandId, carModelId: 155, mileage: 23452 },
    });

    expect(res.status(), await res.text()).toBe(404);
    const json = await res.json();
    expect(json.status).toBe('error');
  });

  test('POST /api/cars | 400 | missing a mileage', async ({ baseURL }) => {
    const api = await createAuthedApi(baseURL);
    const { brandId, modelId } = await getValidBrandModel(api);

    const res = await api.post('/api/cars', {
      data: { carBrandId: brandId, carModelId: modelId },
    });

    expect(res.status(), await res.text()).toBe(400);
    const json = await res.json();
    expect(json.status).toBe('error');
    expect(String(json.message)).toMatch(/mileage.*required/i);
  });
});
