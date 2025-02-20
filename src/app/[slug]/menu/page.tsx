
import { notFound } from "next/navigation";

import { db } from "@/lib/prisma";

import RestaurantCategories from "./components/categories";
import RestaurantHeader from "./components/header";

interface RestaurantMenuPageProps {
    params: Promise<{ slug: string }>;
    searchParams: Promise<{ ConsumptionMethod: string }>;
}

const isConsumptionMethodValid = (ConsumptionMethod: string) => {
    return ["DINE_IN", "TAKEAWAY"].includes(ConsumptionMethod.toUpperCase());
};

const RestaurantMenuPage = async ({ params, searchParams  }: RestaurantMenuPageProps) => {
    
    const {slug} = await params;   
    const {ConsumptionMethod} =  await searchParams;

    if (!isConsumptionMethodValid(ConsumptionMethod)) {
        return notFound();
    }
    const restaurant = await db.restaurant.findUnique({ where: { slug } });
    if (!restaurant) {
        return notFound();
    }
    return ( 
        <div>
            <RestaurantHeader restaurant={restaurant} />
            <RestaurantCategories restaurant={restaurant} />
        </div>
     );
}
 
export default RestaurantMenuPage;