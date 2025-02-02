import * as process from "node:process";

export const test_user_email: string = process.env.TEST_USER_EMAIL;
export const test_user_password: string = process.env.TEST_USER_PASSWORD;

export const base_url: string = process.env.BASE_URL;
export const app_url: string = process.env.APP_URL;
export const login_endpoint: string = "/auth/login";
export const orders_endpoint: string = "/customer/orders/open";
export const draft_endpoint: string = "/customer/draft";
export const create_draft_endpoint: string = `${draft_endpoint}/new`;
