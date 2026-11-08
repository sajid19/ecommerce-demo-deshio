// Same contract as catalog.ts: swap for CMS/API calls later.
import { announcements, banners, customer, orders, policies, siteInfo, stores, trustBadges } from "./mock/content";
import type { Announcement, Banner, Customer, Order, PolicyPage, Store } from "./types";

export const getSiteInfo = async () => siteInfo;
export const getTrustBadges = async () => trustBadges;
export const getAnnouncements = async (): Promise<Announcement[]> => announcements;
export const getBanners = async (): Promise<Banner[]> => banners;
export const getStores = async (): Promise<Store[]> => stores;
export const getStore = async (slug: string): Promise<Store | undefined> => stores.find((s) => s.slug === slug);
export const getPolicies = async (): Promise<PolicyPage[]> => policies;
export const getPolicy = async (slug: string): Promise<PolicyPage | undefined> => policies.find((p) => p.slug === slug);
export const getCustomer = async (): Promise<Customer> => customer;
export const getOrders = async (): Promise<Order[]> => orders;
export const getOrder = async (orderNumber: string): Promise<Order | undefined> =>
  orders.find((o) => o.order_number === orderNumber);

/** Track-order lookup: by invoice number, or by mobile number (returns the latest order). */
export async function trackOrder(input: string): Promise<Order | undefined> {
  const key = input.trim().toUpperCase();
  const digits = input.replace(/\D/g, "");
  return orders.find((o) => o.invoice_number === key || o.order_number === key || (digits.length >= 10 && o.phone === digits.slice(-11)));
}
