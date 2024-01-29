import { test, expect } from "@playwright/test";
import { NavBar } from "../pages/components/navbar";
import { ProductsPage } from "../pages/products.page";
import { MainPage } from "../pages/mainPage.page";
import { UnitDetailsPage } from "../pages/unitDetails.page";
import { servicesData } from "../fixtures/servicesData.json";
import { vehiclesData } from "../fixtures/vehiclesData.json";

let navBar: NavBar;
let productsPage: ProductsPage;
let mainPage: MainPage;
let unitDetailsPage: UnitDetailsPage;

test.describe('Sections check', () => {
    test.beforeEach(async ({ page }) => {
        mainPage = new MainPage(page);
        navBar = new NavBar(page);
        productsPage = new ProductsPage(page);
        unitDetailsPage = new UnitDetailsPage(page);

        await mainPage.openUrl();
    });

    test('C212 - Checking "Послуги" section on the main page', async () => {
        const servicesTabs = await mainPage.getServicesTabs();
        for (let i = 0; i < servicesTabs.length; i++) {
            await mainPage.scrollToServicesSection();
            await mainPage.clickServicesSectionTab(i);

            const services = await mainPage.getServices();
            await expect(services).toHaveCount(7);
            await expect(services).toHaveText(servicesData[i].services);

            for (let j = 0; j < 7; j++) {
                await mainPage.clickService(j);
                await expect(productsPage.page).toHaveURL(/products/);
                await expect(await productsPage.getSelectedFilter()).toHaveText(servicesData[i].services[j]);

                const unitCards = await productsPage.getUnitCards();
                for (const unitCard of unitCards) {
                    await expect(unitCard).toBeVisible();
                }

                if (unitCards.length > 0) {
                    await productsPage.clickFistUnitCard();
                    await expect(await unitDetailsPage.getServices()).toContainText([servicesData[i].services[j]]);
                }
                await navBar.clickLogo();
                await mainPage.scrollToServicesSection();
                await mainPage.clickServicesSectionTab(i);
            }
        }
    })

    test('C213 - Checking "Спецтехніка" section on the main page', async () => {
        const vehiclesTabs = await mainPage.getVehiclesTabs();
        for (let i = 0; i < vehiclesTabs.length; i++) {
            await mainPage.scrollToVehiclesSection();
            await mainPage.clickVehiclesSectionTab(i);

            const vehicles = await mainPage.getVehicles();
            await expect(vehicles).toHaveCount(7);
            await expect(vehicles).toHaveText(vehiclesData[i].equipment.map(item => item.name));

            for (let j = 0; j < 7; j++) {
                await mainPage.clickVehicle(j);
                await expect(productsPage.page).toHaveURL(/products/);
                await expect(await productsPage.getSelectedFilter()).toHaveText(vehiclesData[i].equipment[j].filter);

                const unitCards = await productsPage.getUnitCards();
                for (const unitCard of unitCards) {
                    await expect(unitCard).toBeVisible();
                }

                if (unitCards.length > 0) {
                    await productsPage.clickFistUnitCard();
                    const category = await unitDetailsPage.getCategoryName();
                    expect(vehiclesData[i].equipment[j].categories).toContainEqual(category?.replace(/./, c => c.toUpperCase()).trim());
                }
                await navBar.clickLogo();
                await mainPage.scrollToVehiclesSection();
                await mainPage.clickVehiclesSectionTab(i);
            }
        }
    })
});

