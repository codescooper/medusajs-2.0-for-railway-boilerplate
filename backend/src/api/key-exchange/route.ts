import { MedusaRequest, MedusaResponse } from "@medusajs/framework";
import { IApiKeyModuleService } from '@medusajs/framework/types';
import { ContainerRegistrationKeys, Modules } from '@medusajs/framework/utils';

// Used by the Railway template to bootstrap the storefront's publishable key.
// Scoped to publishable keys only so secret keys are never loaded or exposed.
export const GET = async (req: MedusaRequest, res: MedusaResponse) => {
  const logger = req.scope.resolve(ContainerRegistrationKeys.LOGGER);
  try {
    const apiKeyModuleService: IApiKeyModuleService = req.scope.resolve(Modules.API_KEY);
    const apiKeys = await apiKeyModuleService.listApiKeys({ type: 'publishable' });
    const defaultApiKey = apiKeys.find((apiKey) => apiKey.title === 'Webshop');
    if (!defaultApiKey) {
      res.json({});
    } else {
      res.json({ publishableApiKey: defaultApiKey.token });
    }
  } catch (error) {
    logger.error(`key-exchange failed: ${error.message}`);
    res.status(500).json({ error: 'Unable to retrieve publishable key' });
  }
}
