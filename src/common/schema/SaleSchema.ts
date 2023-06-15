import { z } from "zod";

export const CreateSalesSchema = z.object({
  sold_price: z.number(),
  sold_quantity: z.number(),
  sellerId: z.string(),
  productId: z.string(),
  soldTo: z.object({
    name: z.string(),
    email: z.string().email(),
    contact_number: z.string(),
  }),
  businessId: z.string(),
  orderId: z.string(),
});
export type TCreateSales = z.infer<typeof CreateSalesSchema>;
export const ResponseFetchSalesWithPagination = z.object({
  message: z.string(),
  totalItems: z.number(),
  totalPages: z.number(),
  data: z.array(
    z.object({
      id: z.string(),
      seller: z.object({
        name: z.string(),
      }),
      soldTo: z.object({
        name: z.string(),
      }),
      created_at: z.string(),
      sold_price: z.number(),
      sold_quantity: z.number(),
      product: z.object({
        product_name: z.string(),
        id: z.string(),
        product_code: z.string(),
        price: z.number(),
        quantity: z.number(),
      }),
    })
  ),
});
