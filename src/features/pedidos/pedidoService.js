const fs = require('fs');
const path = require('path');

const pedidoService = {
  /**
   * Processa a notificação de pedido recebida via webhook do Mercado Livre.
   * Inicialmente, para fins de teste, grava os dados em um arquivo .txt na raiz do projeto.
   * 
   * @param {Object} payload - O corpo da notificação recebida do Mercado Livre
   */
  async processarWebhookPedido(payload) {
    try {
      const logDir = path.resolve(__dirname, '../../..');
      const logFilePath = path.join(logDir, 'webhook_pedido_teste.txt');
      
      const timestamp = new Date().toISOString();
      const logContent = `
=========================================
RECEBIDO EM: ${timestamp}
TOPIC: ${payload.topic || 'Não especificado'}
RESOURCE: ${payload.resource || 'Não especificado'}
PAYLOAD COMPLETO:
${JSON.stringify(payload, null, 2)}
=========================================\n`;

      // Grava adicionando ao arquivo (append) para podermos testar múltiplos envios
      fs.appendFileSync(logFilePath, logContent, 'utf8');
      console.log(`[Webhook Pedidos] Dados gravados com sucesso em: ${logFilePath}`);
      
      return { success: true, path: logFilePath };
    } catch (error) {
      console.error('[Webhook Pedidos] Erro ao gravar dados no arquivo txt:', error);
      throw error;
    }
  }
};

module.exports = pedidoService;
