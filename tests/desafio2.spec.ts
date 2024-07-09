import { test, expect } from '@playwright/test';  
  
  // reprovando sem motivo

test.describe('test reprovar sem motivo', async ()=> {
    test('reprovando sem motivo', async ({ page }) => {
      await page.goto('https://app.kodigos.com.br:63995/scm/front/listaAprovarSolicitacoes');
      await page.goto('https://app.kodigos.com.br:63995/scm/front/Login');
      await page.goto('https://app.kodigos.com.br:63995/scm/front/');
      await page.getByText('assignment_turned_inAprovar').click();
      await page.locator('td').filter({ hasText: 'visibility' }).first().click();
      await expect(page.getByText('Visualização')).toBeVisible();
      await page.getByRole('button', { name: 'REPROVAR' }).click();
      await expect(page.getByText('Confirmação')).toBeVisible();
      await page.getByRole('button', { name: 'Sim' }).click();
      await expect(page.getByText('O motivo não pode ser vazio')).toBeVisible();
    
    });
});