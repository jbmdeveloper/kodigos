import { test, expect } from '@playwright/test';

// Adicionando um nova solicitação de compra

test.describe.only('test nova solicitação', async ()=> {

    function formatDate(date: Date) {
        const day = String(date.getDate()).padStart(2, '0');
        const month = String(date.getMonth() + 1).padStart(2, '0');
        const year = date.getFullYear();
      
        return `${day}/${month}/${year}`;
      }

    const today = new Date();
    const formattedDate = formatDate(today);

    const descricao = 'SOLICITAÇÃO DE COMPRA - MATERIAL PARA OBRAS';
    const tipoSolicitacao = 'div:nth-child(4) > div > .q-field > .q-field__inner > .q-field__control > .q-field__control-container > .q-field__native';


  test('test criar', async ({ page }) => {
    await page.goto('https://app.kodigos.com.br:63995/scm/front/');
    await page.goto('https://app.kodigos.com.br:63995/scm/front/Login');
    await page.goto('https://app.kodigos.com.br:63995/scm/front/');
    await page.getByText('descriptionSolicitação').click();
    await page.locator('a').filter({ hasText: /^description$/ }).click()
    await page.waitForTimeout(1000);
    await page.locator('label').filter({hasText:'Filial'}).click();
    await page.getByText('/01 - Instituto Kodigos').click();
    await page.locator('div').filter({ hasText: /^Centro de Custo$/ }).first().click();
    await page.getByText('- COMPRAS').click();
    await page.locator('div').filter({ hasText: /^Tipo de Solicitação$/ }).first().click();
    await page.getByRole('option', { name: 'MATERIAL' }).locator('div').nth(2).click();
    await page.locator(tipoSolicitacao).first().click();
    await page.getByRole('option', { name: descricao }).locator('div').nth(1).click();
    await page.getByLabel('Justificativa/Projeto').fill('segurança');
    await page.getByLabel('Descrição do produto genérico').fill('epis teste');
    await page.getByPlaceholder('0,00').fill('10');
    await page.getByLabel('UM').fill('ki');
    await page.getByRole('option', { name: 'KT - KIT' }).locator('div').nth(1).click();
    await page.getByRole('button', { name: 'Adicionar' }).click();
    await page.getByRole('button', { name: 'SALVAR' }).click();
    await page.waitForSelector('text=carregando', { state: 'hidden' });
    await page.waitForSelector('text=Solicitação enviada com sucesso!', { state: 'hidden' });

    await expect(page.getByText(descricao).first()).toBeVisible();
    await expect(page.locator('td').nth(4)).toHaveText(formattedDate);

  });
});