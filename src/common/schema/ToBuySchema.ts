import { z } from "zod";

export const CreateToBuySchema = z.object({
  product_name: z.string(),
  product_price: z.number(),
  quantity: z.number(),
  buy_from: z.string(),
  businessId: z.string(),
});
export type TCreateToBuy = z.infer<typeof CreateToBuySchema>;
export const UpdateToBuySchema = CreateToBuySchema.partial({
  product_name: true,
  product_price: true,
  quantity: true,
})
  .extend({
    toBuyId: z.string(),
  })
  .omit({
    businessId: true,
    buy_from: true,
  });
export type TUpdateToBuy = z.infer<typeof UpdateToBuySchema>;

export const DeleteToBuySchema = z.object({
  toBuyId: z.string(),
});
export type TDeleteToBuy = z.infer<typeof DeleteToBuySchema>;

// response from get to buy
export const FetchToBuySchema = z.array(
  z.object({
    id: z.string(),
    product_name: z.string(),
    product_price: z.number(),
    quantity: z.number(),
    buy_from: z.number(),
    created_at: z.date(),
    buyerId: z.string(),
    businessId: z.string(),
  })
);
