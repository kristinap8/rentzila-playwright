import { test, expect } from '@playwright/test';
import { MainPage } from '../pages/mainPage.page';
import feedbackData from '../fixtures/feedbackData.json';
import { getCreatedFeedback, deleteCreatedFeedback } from '../helper/feedbackApi';


let mainPage: MainPage;

test.describe('Feedback check', () => {
    test.beforeEach(async ({ page }) => {
        mainPage = new MainPage(page);
        await mainPage.openUrl();
    });

    test('C226 - Verify "У Вас залишилися питання?" form', async () => {
        await mainPage.scrollToConsultationForm();
        await expect(await mainPage.getConsultationForm()).toBeVisible();

        await mainPage.orderConsultation();
        await expect(await mainPage.getFeedbackNameInput()).toHaveAttribute('class', /ConsultationForm_error/);
        const feedbackNameErrorMsg = await mainPage.getFeedbackNameErrorMsg();
        await expect(feedbackNameErrorMsg).toBeVisible();
        await expect(feedbackNameErrorMsg).toHaveText("Поле не може бути порожнім");
        await expect(await mainPage.getFeedbackPhoneInput()).toHaveAttribute('class', /ConsultationForm_error/);
        const feedbackPhoneErrorMsg = await mainPage.getFeedbackPhoneErrorMsg();
        await expect(feedbackPhoneErrorMsg).toBeVisible();
        await expect(feedbackPhoneErrorMsg).toHaveText("Поле не може бути порожнім");

        await mainPage.orderConsultation({ name: feedbackData.validName });
        await expect(await mainPage.getFeedbackNameInput()).not.toHaveAttribute('class', /ConsultationForm_error/);
        await expect(await mainPage.getFeedbackPhoneInput()).toHaveAttribute('class', /ConsultationForm_error/);

        await mainPage.clickFeedbackPhoneInput();
        await expect(await mainPage.getFeedbackPhoneInput()).toHaveValue('+380');

        await mainPage.orderConsultation({ name: "", phone: feedbackData.validPhoneNumber });
        await expect(await mainPage.getFeedbackNameInput()).toHaveAttribute('class', /ConsultationForm_error/);
        await expect(await mainPage.getFeedbackPhoneInput()).not.toHaveAttribute('class', /ConsultationForm_error/);

        for (const invalidPhoneNumber of feedbackData.invalidPhoneNumbers) {
            await mainPage.orderConsultation({ name: feedbackData.validName, phone: invalidPhoneNumber });
            await expect(await mainPage.getFeedbackNameInput()).not.toHaveAttribute('class', /ConsultationForm_error/);
            await expect(await mainPage.getFeedbackPhoneInput()).toHaveAttribute('class', /ConsultationForm_error/);
            await expect(feedbackPhoneErrorMsg).toBeVisible();
            await expect(feedbackPhoneErrorMsg).toHaveText("Телефон не пройшов валідацію");
        }
        await mainPage.orderConsultation({ phone: feedbackData.validPhoneNumber });

        const createdFeedback = await getCreatedFeedback(feedbackData.validName, feedbackData.validPhoneNumber);
        expect(createdFeedback).not.toBeUndefined();
        expect(await deleteCreatedFeedback(createdFeedback!.id)).toBe(204);
    })
})