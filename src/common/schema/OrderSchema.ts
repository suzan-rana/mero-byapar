import { z } from "zod";

export const CreateOrderSchema = z.object({
  productId: z.string().nonempty(),
  customer_name: z.string().nonempty(),
  customer_email: z.string().email().nonempty(),
  customer_contact_number: z.string().nonempty(),
  quantity: z.number().nonnegative(),
  price: z.number().nonnegative(),
  businessId: z.string(),
});
export type TCreateOrder = z.infer<typeof CreateOrderSchema>;

export const UpdateOrderSchema = CreateOrderSchema.pick({
  customer_name: true,
  customer_contact_number: true,
  customer_email: true,
})
  .partial()
  .extend({
    id: z.string(),
  });
export type TUpdateOrder = z.infer<typeof UpdateOrderSchema>;
export const DeleteOrderSchema = z.object({
  id: z.string(),
});
export type TDeleteOrder = z.infer<typeof DeleteOrderSchema>;

export const ResponseFetchOrderSchema = z.object({
  message: z.string(),
  data: z.array(
    z.object({
      id: z.string(),
      productId: z.string(),
      order_quantity: z.number(),
      customer_name: z.string(),
      customer_email: z.string(),
      customer_contact_number: z.string(),
      created_at: z.string(),
      businessId: z.string(),
      product: z.object({
        id: z.string(),
        product_name: z.string(),
        price: z.number(),
        product_code: z.string(),
      }),
    })
  ),
  totalPages: z.number(),
  totalItems: z.number(),
});

export const ResponseFetchOrderItemSchema = z.object({
  id: z.string(),
  created_at: z.string(),
  customer_email: z.string(),
  customer_contact_number: z.string(),
  order_quantity: z.number(),
  customer_name: z.string(),
  product: z.object({
    product_name: z.string(),
    product_code: z.string(),
    id: z.string(),
    price: z.number(),
    quantity: z.number(),
    category: z.object({
      category_name: z.string(),
      category_code: z.string(),
    }),
  }),
});
