import Page from './page';

const pageTitle: string = '[class*="HeroSection_title"]';
const consultationForm: string = '*[class*="ConsultationForm_container"]';
const orderConsultationBtn: string = '*[class*="ConsultationForm_container"] button';
const feedbackNameInput: string = 'div[class*="ConsultationForm_name"] input';
const feedbackPhoneInput: string = 'div[class*="ConsultationForm_phone"] input';
const feedbackNameErrorMsg: string = 'div[class*="ConsultationForm_name"] *[class*="ConsultationForm_error_message"]';
const feedbackPhoneErrorMsg: string = 'div[class*="ConsultationForm_phone"] *[class*="ConsultationForm_error_message"]';
const servicesSection: string = '*[data-testid="services"]';
const specialEquipmentSection: string = '*[data-testid="specialEquipment"]';
const servicesTabs: string = 'div[data-testid*="services__"]';
const services: string = 'div[data-testid*="service__"]';
const vehiclesTabs: string = '*[data-testid*="specialEquipment__"]';
const vehicles: string = 'div[data-testid*="category__"]';

export class MainPage extends Page {
    constructor(page: Page['page']) {
        super(page);
    }

    async getPageTitle() {
        return await super.getElement(pageTitle);
    }

    async getConsultationForm() {
        return await super.getElement(consultationForm);
    }

    async getFeedbackNameInput() {
        return await super.getElement(feedbackNameInput);
    }

    async getFeedbackNameErrorMsg() {
        return await super.getElement(feedbackNameErrorMsg);
    }

    async getFeedbackPhoneInput() {
        return await super.getElement(feedbackPhoneInput);
    }

    async getFeedbackPhoneErrorMsg() {
        return await super.getElement(feedbackPhoneErrorMsg);
    }

    async getServicesTabs() {
        return await super.getElementsArray(servicesTabs);
    }

    async getVehiclesTabs() {
        return await super.getElementsArray(vehiclesTabs);
    }

    async getServices() {
        return await super.getElement(services);
    }

    async getVehicles() {
        return await super.getElement(vehicles);
    }

    async clickFeedbackPhoneInput() {
        await super.clickElement(feedbackPhoneInput);
    }

    async clickServicesSectionTab(index: number) {
        await super.clickElementByIndex(servicesTabs, index);
    }

    async clickVehiclesSectionTab(index: number) {
        await super.clickElementByIndex(vehiclesTabs, index);
    }

    async clickService(index: number) {
        await super.clickElementByIndex(services, index);
        await super.pause(1000);
    }

    async clickVehicle(index: number) {
        await super.clickElementByIndex(vehicles, index);
        await super.pause(1000);
    }

    async orderConsultation(options?: { name?: string, phone?: string }) {
        const { name, phone } = options ?? {};

        if (name !== undefined) {
            await super.fillElement(feedbackNameInput, name);
        }

        if (phone !== undefined) {
            await super.fillElement(feedbackPhoneInput, phone);
        }

        await super.clickElement(orderConsultationBtn);
    }

    async scrollToConsultationForm() {
        await super.scrollToElement(consultationForm);
    }

    async scrollToServicesSection() {
        await super.scrollToElement(servicesSection);
    }

    async scrollToVehiclesSection() {
        await super.scrollToElement(specialEquipmentSection);
    }
}