import { z } from "zod";

export const ResponseFetchDashboardSchema = z.object({
  products: z.object({
    total_price: z.string().nullable(),
    total_quantity: z.string().nullable(),
    total_products: z.string().nullable(),
  }),

  toBuyItems: z.object({
    total_buying_price: z.string().nullable(),
    total_buying_quantity: z.string().nullable(),
    total_buying_items: z.string().nullable(),
  }),

  orders: z.object({
    total_order_price: z.string().nullable(),
    total_order_quantity: z.string().nullable(),
    total_orders: z.string().nullable(),
  }),

  sales: z.object({
    total_sold_price: z.string().nullable(),
    total_sold_quantity: z.string().nullable(),
    total_sales: z.string().nullable(),
  }),
});
