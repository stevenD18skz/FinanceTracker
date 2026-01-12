import React from "react";
import {
    Utensils,
    ShoppingBag,
    Zap,
    Film,
    Bus,
    HeartPulse,
    Briefcase,
    GraduationCap,
    Plane,
    Home,
    Wifi,
    Smartphone,
    Gift,
    MoreHorizontal,
    Coffee,
    ShoppingCart,
    Music,
    Dumbbell
} from "lucide-react";

export const getCategoryIcon = (category: string): React.ReactNode => {
    const normalizedCategory = category?.toLowerCase().trim() || "others";

    const icons: Record<string, React.ReactNode> = {
        // Food & Drink
        food: <Utensils className="h-6 w-6" />,
        comida: <Utensils className="h-6 w-6" />,
        cafe: <Coffee className="h-6 w-6" />,
        coffee: <Coffee className="h-6 w-6" />,
        drink: <Coffee className="h-6 w-6" />,
        restaurant: <Utensils className="h-6 w-6" />,

        // Shopping
        shopping: <ShoppingBag className="h-6 w-6" />,
        compras: <ShoppingBag className="h-6 w-6" />,
        clothes: <ShoppingCart className="h-6 w-6" />,
        clothing: <ShoppingCart className="h-6 w-6" />,
        ropa: <ShoppingCart className="h-6 w-6" />,
        groceries: <ShoppingCart className="h-6 w-6" />,

        // Entertainment
        entertainment: <Film className="h-6 w-6" />,
        entretenimiento: <Film className="h-6 w-6" />,
        movies: <Film className="h-6 w-6" />,
        cine: <Film className="h-6 w-6" />,
        music: <Music className="h-6 w-6" />,
        musica: <Music className="h-6 w-6" />,
        fun: <Gift className="h-6 w-6" />,

        // Services / Utilities
        services: <Zap className="h-6 w-6" />,
        servicios: <Zap className="h-6 w-6" />,
        bills: <Zap className="h-6 w-6" />,
        facturas: <Zap className="h-6 w-6" />,
        electricity: <Zap className="h-6 w-6" />,
        water: <Zap className="h-6 w-6" />,
        internet: <Wifi className="h-6 w-6" />,
        phone: <Smartphone className="h-6 w-6" />,
        celular: <Smartphone className="h-6 w-6" />,

        // Transport
        transport: <Bus className="h-6 w-6" />,
        transporte: <Bus className="h-6 w-6" />,
        bus: <Bus className="h-6 w-6" />,
        car: <Bus className="h-6 w-6" />,
        taxi: <Bus className="h-6 w-6" />,
        uber: <Bus className="h-6 w-6" />,
        travel: <Plane className="h-6 w-6" />,
        viajes: <Plane className="h-6 w-6" />,

        // Health
        health: <HeartPulse className="h-6 w-6" />,
        salud: <HeartPulse className="h-6 w-6" />,
        medical: <HeartPulse className="h-6 w-6" />,
        medico: <HeartPulse className="h-6 w-6" />,
        fitness: <Dumbbell className="h-6 w-6" />,
        gym: <Dumbbell className="h-6 w-6" />,

        // Others
        work: <Briefcase className="h-6 w-6" />,
        trabajo: <Briefcase className="h-6 w-6" />,
        salary: <Briefcase className="h-6 w-6" />,
        salario: <Briefcase className="h-6 w-6" />,
        education: <GraduationCap className="h-6 w-6" />,
        educacion: <GraduationCap className="h-6 w-6" />,
        rent: <Home className="h-6 w-6" />,
        alquiler: <Home className="h-6 w-6" />,
        casa: <Home className="h-6 w-6" />,
        home: <Home className="h-6 w-6" />,

        // Default
        others: <MoreHorizontal className="h-6 w-6" />,
        otros: <MoreHorizontal className="h-6 w-6" />,
    };

    // Try to find a partial match if exact match fails
    if (!icons[normalizedCategory]) {
        const key = Object.keys(icons).find(k => normalizedCategory.includes(k));
        if (key) return icons[key];
    }

    return icons[normalizedCategory] || icons["others"];
};
