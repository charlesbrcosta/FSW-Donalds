import { notFound } from "next/navigation";

import { db } from "@/lib/prisma";

import ProductHeader from "./components/product-header";

interface ProductPagePros {
    params: Promise<{slug: string; productId: string}>
}

const ProductPage = async ({params}: ProductPagePros) => {
    const {slug, productId} = await params;
    const product = await db.product.findUnique({ where: {id: productId} });
    if (!product) {
        return notFound();
    }
    return (
        <>  
            <ProductHeader product={product}/>
            <h1>Product Page</h1>
            {slug}
            {productId}
        </>
    );
}
 
export default ProductPage;