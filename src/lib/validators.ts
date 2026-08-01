import { z } from "zod";

export const userRoleSchema = z.enum(["BUYER", "SELLER", "ADMIN"]);
export const storeStatusSchema = z.enum(["PENDING", "ACTIVE", "SUSPENDED"]);
export const productStatusSchema = z.enum(["DRAFT", "PUBLISHED", "ARCHIVED"]);
export const mediaCategorySchema = z.enum(["LOGO", "COVER", "BANNER", "PRODUCT"]);
export const orderStatusSchema = z.enum(["PENDING", "PAID", "FULFILLED", "CANCELED", "REFUNDED"]);
export const payoutStatusSchema = z.enum(["PENDING", "PROCESSING", "PAID", "FAILED", "REJECTED"]);
export const paymentProviderSchema = z.enum(["STRIPE", "MANUAL"]);

export const idSchema = z.string().min(1);
export const emailSchema = z.string().email();
export const slugSchema = z.string().min(1).regex(/^[a-z0-9]+(?:-[a-z0-9]+)*$/, "Invalid slug");
export const urlSchema = z.string().url().optional().nullable();

export const moneySchema = z.number().int().nonnegative();
export const quantitySchema = z.number().int().positive();
export const ratingSchema = z.number().int().min(1).max(5);

export const storeCreateSchema = z.object({
  ownerId: idSchema,
  name: z.string().min(2).max(120),
  slug: slugSchema,
  description: z.string().max(2000).optional().nullable(),
  logoUrl: urlSchema,
  coverUrl: urlSchema,
  status: storeStatusSchema.optional(),
  stripeAccountId: z.string().min(1).optional().nullable(),
  commissionRate: z.number().int().min(0).max(100).default(10),
});

export const storeUpdateSchema = storeCreateSchema.partial().extend({
  id: idSchema,
});

export const productCreateSchema = z.object({
  storeId: idSchema,
  categoryId: idSchema.optional().nullable(),
  title: z.string().min(2).max(160),
  slug: slugSchema,
  description: z.string().max(5000).optional().nullable(),
  shortDescription: z.string().max(300).optional().nullable(),
  price: moneySchema,
  compareAtPrice: moneySchema.optional().nullable(),
  status: productStatusSchema.optional(),
  featured: z.boolean().optional(),
  digitalFileUrl: urlSchema,
  previewUrl: urlSchema,
  thumbnailUrl: urlSchema,
  stock: z.number().int().min(0).optional().nullable(),
  salesCount: z.number().int().min(0).optional(),
  publishedAt: z.coerce.date().optional().nullable(),
});

export const productUpdateSchema = productCreateSchema.partial().extend({
  id: idSchema,
});

export const orderItemInputSchema = z.object({
  productId: idSchema,
  title: z.string().min(1).max(160),
  unitPrice: moneySchema,
  quantity: quantitySchema.default(1),
  totalPrice: moneySchema,
});

export const orderCreateSchema = z.object({
  buyerId: idSchema,
  storeId: idSchema,
  status: orderStatusSchema.optional(),
  subtotal: moneySchema,
  commissionFee: moneySchema.optional().default(0),
  total: moneySchema,
  currency: z.string().min(3).max(10).default("XOF"),
  paymentProvider: paymentProviderSchema.optional(),
  stripeSessionId: z.string().min(1).optional().nullable(),
  stripePaymentId: z.string().min(1).optional().nullable(),
  billingEmail: emailSchema.optional().nullable(),
  customerName: z.string().min(1).max(120).optional().nullable(),
  fulfilledAt: z.coerce.date().optional().nullable(),
  paidAt: z.coerce.date().optional().nullable(),
  items: z.array(orderItemInputSchema).min(1),
});

export const orderUpdateSchema = orderCreateSchema.partial().extend({
  id: idSchema,
  items: z.array(orderItemInputSchema).optional(),
});

export const payoutCreateSchema = z.object({
  userId: idSchema,
  storeId: idSchema,
  orderId: idSchema.optional().nullable(),
  amount: moneySchema,
  currency: z.string().min(3).max(10).default("XOF"),
  status: payoutStatusSchema.optional(),
  method: z.string().min(1).max(50).optional().nullable(),
  externalRef: z.string().min(1).optional().nullable(),
  stripeTransferId: z.string().min(1).optional().nullable(),
  requestedAt: z.coerce.date().optional(),
  processedAt: z.coerce.date().optional().nullable(),
});

export const payoutUpdateSchema = payoutCreateSchema.partial().extend({
  id: idSchema,
});

export const reviewCreateSchema = z.object({
  userId: idSchema,
  productId: idSchema,
  rating: ratingSchema,
  comment: z.string().max(2000).optional().nullable(),
});

export const reviewUpdateSchema = reviewCreateSchema.partial().extend({
  id: idSchema,
});

export const notificationCreateSchema = z.object({
  userId: idSchema,
  title: z.string().min(1).max(120),
  message: z.string().min(1).max(2000),
  readAt: z.coerce.date().optional().nullable(),
});

export const notificationUpdateSchema = notificationCreateSchema.partial().extend({
  id: idSchema,
});
