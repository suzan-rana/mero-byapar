import { z } from "zod";

export const ResponseFetchDashboardSchema = z.object({
  products: z.object({
    total_price: z.string(),
    total_quantity: z.string(),
    total_products: z.string(),
  }),

  toBuyItems: z.object({
    total_buying_price: z.string(),
    total_buying_quantity: z.string(),
    total_buying_items: z.string(),
  }),

  orders: z.object({
    total_order_price: z.string(),
    total_order_quantity: z.string(),
    total_orders: z.string(),
  }),

  sales: z.object({
    total_sold_price: z.string(),
    total_sold_quantity: z.string(),
    total_sales: z.string(),
  }),
});
