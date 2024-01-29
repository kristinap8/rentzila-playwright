import { request } from '@playwright/test';

const baseURL: string = "https://stage.rentzila.com.ua/api/";

export interface feedback {
    id: number,
    name: string,
    phone: string,
    created_date: string,
    closed_date: string | null,
    is_closed: boolean
},

export function sortFeedbackByCreatedDate(feedbackArray: feedback[]) {
    feedbackArray.sort((a, b) => new Date(a.created_date).getTime() - new Date(b.created_date).getTime());
}

export async function getCreatedFeedback(name: string, phone: string) {
    const apiContext = await request.newContext({
        baseURL: baseURL,
        extraHTTPHeaders: { 'Authorization': `Bearer ${process.env.BEARER_TOKEN}` },
    });
    const response: feedback[] = await (await apiContext.get('backcall/', {
        params: {
            'name': name,
            'phone': phone,
        }
    })).json();

    sortFeedbackByCreatedDate(response);
    return response.at(-1);
}

export async function deleteCreatedFeedback(id: number) {
    const apiContext = await request.newContext({
        baseURL: baseURL,
        extraHTTPHeaders: { 'Authorization': `Bearer ${process.env.BEARER_TOKEN}` },
    });

    const response = await apiContext.delete(`backcall/${id}/`);
    return response.status();
}