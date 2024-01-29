import { test, expect } from '@playwright/test';
import { Footer } from '../pages/components/footer';
import { NavBar } from '../pages/components/navbar';
import { MainPage } from '../pages/mainPage.page';

let footer: Footer;
let navBar: NavBar;
let mainPage: MainPage;

test.describe('Footer check', () => {
    test.beforeEach(async ({ page }) => {
        footer = new Footer(page);
        mainPage = new MainPage(page);
        navBar = new NavBar(page);

        await mainPage.openUrl();
    });

    test("C214 - Verify that all elements on the footer are displayed and all links are clickable", async () => {
        await footer.scrollToFooter();
        await expect(await footer.getFooter()).toBeVisible();

        await expect(await footer.getAboutUsLabel()).toBeVisible();
        await expect(await footer.getPrivacyPolicyLink()).toBeVisible();
        await expect(await footer.getTermsConditionsLink()).toBeVisible();

        await expect(await footer.getForBuyersLabel()).toBeVisible();
        await expect(await footer.getAdvertismentsLink()).toBeVisible();
        await expect(await footer.getTendersLink()).toBeVisible();
        await expect(await footer.getJobRequestsLink()).toBeVisible();

        await expect(await footer.getContactsLabel()).toBeVisible();
        await expect(await footer.getEmail()).toBeVisible();

        await expect(await footer.getFooterLogo()).toBeVisible();
        await expect(await footer.getCopyrightLabel()).toBeVisible();

        await footer.clickPrivacyPolicyLink();
        await expect(footer.page).toHaveURL(/privacy-policy/);
        await expect(await footer.getPrivacyPolicyTitle()).toBeVisible();
        await expect(await footer.getPrivacyPolicyTitle()).toHaveText('Політика конфіденційності');

        await footer.scrollToFooter();
        await footer.clickCookiePolicyLink();
        await expect(footer.page).toHaveURL(/cookie-policy/);
        await expect(await footer.getCookiePolicyTitle()).toBeVisible();
        await expect(await footer.getCookiePolicyTitle()).toHaveText('Політика використання файлів cookie');

        await footer.scrollToFooter();
        await footer.clickTermsConditionsLink();
        await expect(footer.page).toHaveURL(/terms-conditions/);
        await expect(await footer.getTermsConditionsTitle()).toBeVisible();
        await expect(await footer.getTermsConditionsTitle()).toHaveText('Угода користувача');

        await footer.scrollToFooter();
        await footer.clickAdvertismentsLink();
        await expect(footer.page).toHaveURL(/products/);
        await expect(await navBar.getSearchInput()).toHaveAttribute('placeholder', 'Пошук оголошень або послуг'); 
        await navBar.clickLogo();

        await footer.scrollToFooter();
        await footer.clickTendersLink();
        await expect(footer.page).toHaveURL(/tenders-map/);
        await expect(await navBar.getTendersJobRequestsSearchInput()).toHaveAttribute('placeholder', 'Пошук тендера за ключовими словами');

        await navBar.clickLogo();
        await footer.scrollToFooter();
        await footer.clickJobRequestsLink();
        await expect(footer.page).toHaveURL(/requests-map/);
        await expect(await navBar.getTendersJobRequestsSearchInput()).toHaveAttribute('placeholder', 'Пошук запита на роботу за ключовими словами');

        await navBar.clickLogo();
        await expect(await mainPage.getPageTitle()).toBeVisible();

        await footer.scrollToFooter();
        await expect(await footer.getEmail()).toHaveAttribute('href', /mailto/);
    })
});