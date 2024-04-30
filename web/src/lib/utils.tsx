import {clsx} from "clsx";
import {ClassNameValue, twMerge} from "tailwind-merge";

export function cn(...inputs: ClassNameValue[]) {
    return twMerge(clsx(inputs));
}

export async function saveCookie(key: string, value: string) {
    document.cookie = `${key}=${value}; path=/`;
}

export function getCookie(key: string): string | null {
    const cookies = document.cookie.split('; ');
    const cookie = cookies.find(cookie => cookie.startsWith(key + '='));
    return cookie ? cookie.split('=')[1] : null;
}

export async function deleteCookie(key: string): Promise<void> {
    document.cookie = `${key}=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/`;
}
