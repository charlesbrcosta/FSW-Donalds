"use client"
import { Prisma } from "@prisma/client";
import { ScrollArea } from "@radix-ui/react-scroll-area";
import { Clock1Icon } from "lucide-react";
import Image from "next/image";
import { useState } from "react";

import { Button } from "@/components/ui/button";
import { ScrollBar } from "@/components/ui/scroll-area";

import Products from "./products";

interface RestaurantCategoriesProps {
    restaurant: Prisma.RestaurantGetPayload<{
        include: {
            menuCategories: {
                include: { products: true }
            }
        }
    }>
}

type MenuCategoriesWithProducts = Prisma.MenuCategoryGetPayload<{
    include: {products: true}
}>

const RestaurantCategories = ({restaurant}: RestaurantCategoriesProps) => {
    const [selectCategory, setSelectCategory] = useState<MenuCategoriesWithProducts>(restaurant.menuCategories[0]);
    const handleCategoryClick = (category: MenuCategoriesWithProducts) => {
        setSelectCategory(category);
    }
    const getCategoryButtonVariant = (category: MenuCategoriesWithProducts)  => {
        return selectCategory.id === category.id ? "default" : "secondary";
    }
    return ( 
        <div className="relative z-50 mt-[-1.5rem] rounded-t-3xl bg-white">
            <div className="p-5">
                <div className="flex items-center gap-3">
                    <Image 
                        src={restaurant.avatarImageUrl}
                        alt={restaurant.name}
                        height={45}
                        width={45}
                    />
                    <div>
                        <h2 className="text-lg font-semibold">{restaurant.name}</h2>
                        <p className="text-xs opacity-55">{restaurant.description}</p>
                    </div>                
                </div>
                <div className=" mt-3 flex items-center gap-1 text-xs text-green-500">
                    <Clock1Icon size={12}/>
                    <p>Aberto!</p>
                </div>
            </div>
            <ScrollArea className="w-full">
                <div className="flex w-max space-x-4 p-4 pt-0">
                    {restaurant.menuCategories.map(category => ( 
                        <Button 
                            onClick={() => handleCategoryClick(category)}
                            key={category.id}
                            variant={getCategoryButtonVariant(category)}
                            size="sm" 
                            className="rounded-full"
                        >
                                {category.name}
                        </Button>
                    ))}
                </div>
                <ScrollBar orientation="horizontal" />
            </ScrollArea>
            <h3 className="px-5 pt-2 font-semibold">{selectCategory.name}</h3>
            <Products products={selectCategory.products} />
        </div>         
    );
}
 
export default RestaurantCategories;