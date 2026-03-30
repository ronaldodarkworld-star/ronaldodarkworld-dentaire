(function() {
  // Styles
  const style = document.createElement('style');
  style.innerHTML = `
    #dental-chatbot-wrapper {
      position: fixed;
      bottom: 20px;
      right: 20px;
      z-index: 999999;
      font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
    }
    #dental-chatbot-toggle {
      width: 65px;
      height: 65px;
      border-radius: 50%;
      background: linear-gradient(135deg, #00d2df, #00b09b);
      color: white;
      display: flex;
      justify-content: center;
      align-items: center;
      box-shadow: 0 4px 15px rgba(0, 176, 155, 0.4);
      cursor: pointer;
      transition: transform 0.3s ease, box-shadow 0.3s ease;
      font-size: 32px;
    }
    #dental-chatbot-toggle:hover {
      transform: scale(1.08);
      box-shadow: 0 6px 20px rgba(0, 176, 155, 0.6);
    }
    #dental-chatbot-window {
      position: absolute;
      bottom: 85px;
      right: 0;
      width: 360px;
      max-height: 85vh;
      background: white;
      border-radius: 16px;
      box-shadow: 0 8px 30px rgba(0,0,0,0.15);
      display: none;
      flex-direction: column;
      overflow: hidden;
      transform-origin: bottom right;
      transition: all 0.3s ease;
    }
    #dental-chatbot-window.open {
      display: flex;
      animation: chatOpen 0.3s cubic-bezier(0.175, 0.885, 0.32, 1.275) forwards;
    }
    @keyframes chatOpen {
      from { opacity: 0; transform: scale(0.6); }
      to { opacity: 1; transform: scale(1); }
    }
    #dental-chatbot-header {
      background: linear-gradient(135deg, #00d2df, #00b09b);
      color: white;
      padding: 16px;
      display: flex;
      align-items: center;
      justify-content: space-between;
    }
    .dental-chatbot-agent {
      display: flex;
      align-items: center;
      gap: 12px;
    }
    .dental-chatbot-avatar {
      width: 44px;
      height: 44px;
      border-radius: 50%;
      background: rgba(255,255,255,0.2);
      display: flex;
      justify-content: center;
      align-items: center;
      font-size: 24px;
      border: 2px solid white;
    }
    .dental-chatbot-title {
      font-weight: 700;
      font-size: 16px;
      letter-spacing: 0.5px;
    }
    .dental-chatbot-subtitle {
      font-size: 13px;
      opacity: 0.9;
      display: flex;
      align-items: center;
      gap: 4px;
    }
    .dental-chatbot-subtitle::before {
      content: '';
      display: inline-block;
      width: 8px;
      height: 8px;
      background-color: #4CAF50;
      border-radius: 50%;
    }
    #dental-chatbot-close {
      background: none;
      border: none;
      color: white;
      font-size: 28px;
      cursor: pointer;
      line-height: 1;
      opacity: 0.8;
      transition: opacity 0.2s;
    }
    #dental-chatbot-close:hover {
      opacity: 1;
    }
    #dental-chatbot-messages {
      flex: 1;
      height: 380px;
      overflow-y: auto;
      padding: 20px;
      background: #f8fafc;
      display: flex;
      flex-direction: column;
      gap: 12px;
      scrollbar-width: thin;
      scrollbar-color: #cbd5e1 transparent;
    }
    #dental-chatbot-messages::-webkit-scrollbar {
      width: 6px;
    }
    #dental-chatbot-messages::-webkit-scrollbar-thumb {
      background-color: #cbd5e1;
      border-radius: 6px;
    }
    .chat-msg {
      max-width: 85%;
      padding: 12px 16px;
      border-radius: 16px;
      font-size: 14px;
      line-height: 1.5;
      animation: msgFadeIn 0.3s ease forwards;
      color: #334155;
    }
    @keyframes msgFadeIn {
      from { opacity: 0; transform: translateY(10px); }
      to { opacity: 1; transform: translateY(0); }
    }
    .chat-msg.bot {
      background: white;
      align-self: flex-start;
      border-bottom-left-radius: 4px;
      box-shadow: 0 2px 5px rgba(0,0,0,0.05);
      border: 1px solid #e2e8f0;
    }
    .chat-msg.user {
      background: #00d2df;
      color: white;
      align-self: flex-end;
      border-bottom-right-radius: 4px;
      box-shadow: 0 2px 5px rgba(0, 210, 223, 0.2);
    }
    .chat-buttons {
      display: flex;
      flex-direction: column;
      gap: 8px;
      margin-top: 4px;
      align-items: flex-start;
      width: 100%;
    }
    .chat-btn {
      background: white;
      border: 1px solid #00d2df;
      color: #00d2df;
      padding: 10px 14px;
      border-radius: 20px;
      font-size: 14px;
      font-weight: 500;
      cursor: pointer;
      transition: all 0.2s ease;
      text-align: left;
      box-shadow: 0 2px 4px rgba(0,0,0,0.02);
      display: inline-flex;
      align-items: center;
      gap: 6px;
    }
    .chat-btn:hover {
      background: rgba(0, 210, 223, 0.1);
      transform: translateY(-1px);
    }
    .chat-btn.primary {
      background: #00b09b;
      color: white;
      border-color: #00b09b;
      box-shadow: 0 2px 8px rgba(0, 176, 155, 0.3);
    }
    .chat-btn.primary:hover {
      background: #009886;
      box-shadow: 0 4px 12px rgba(0, 176, 155, 0.4);
    }
    #dental-chatbot-input-area {
      display: flex;
      padding: 12px;
      background: white;
      border-top: 1px solid #f1f5f9;
      align-items: center;
    }
    #dental-chatbot-input {
      flex: 1;
      border: 1px solid #e2e8f0;
      padding: 12px 16px;
      border-radius: 24px;
      background: #f8fafc;
      outline: none;
      font-size: 14px;
      transition: border-color 0.2s;
    }
    #dental-chatbot-input:focus {
      border-color: #00d2df;
      background: white;
    }
    #dental-chatbot-send {
      background: linear-gradient(135deg, #00d2df, #00b09b);
      border: none;
      width: 44px;
      height: 44px;
      border-radius: 50%;
      margin-left: 10px;
      color: white;
      cursor: pointer;
      display: flex;
      justify-content: center;
      align-items: center;
      transition: transform 0.2s, box-shadow 0.2s;
      box-shadow: 0 2px 6px rgba(0, 176, 155, 0.3);
    }
    #dental-chatbot-send:hover {
      transform: scale(1.05);
      box-shadow: 0 4px 10px rgba(0, 176, 155, 0.4);
    }
    .typing-indicator {
      display: flex;
      gap: 5px;
      padding: 14px 18px;
      background: white;
      border: 1px solid #e2e8f0;
      border-radius: 16px;
      border-bottom-left-radius: 4px;
      align-self: flex-start;
      margin-bottom: 8px;
      width: fit-content;
      box-shadow: 0 2px 5px rgba(0,0,0,0.02);
    }
    .typing-dot {
      width: 8px;
      height: 8px;
      background: #00d2df;
      border-radius: 50%;
      animation: typing 1.4s infinite ease-in-out both;
    }
    .typing-dot:nth-child(1) { animation-delay: -0.32s; }
    .typing-dot:nth-child(2) { animation-delay: -0.16s; }
    @keyframes typing {
      0%, 80%, 100% { transform: scale(0.6); opacity: 0.6; }
      40% { transform: scale(1); opacity: 1; }
    }
    @media (max-width: 480px) {
      #dental-chatbot-window {
        width: calc(100vw - 32px);
        bottom: 90px;
        right: 16px;
        height: 80vh;
      }
      #dental-chatbot-wrapper {
        bottom: 16px;
        right: 16px;
      }
    }
  `;
  document.head.appendChild(style);

  // DOM Structure
  const wrapper = document.createElement('div');
  wrapper.id = 'dental-chatbot-wrapper';
  wrapper.innerHTML = `
    <div id="dental-chatbot-window">
      <div id="dental-chatbot-header">
        <div class="dental-chatbot-agent">
          <div class="dental-chatbot-avatar">👩‍⚕️</div>
          <div>
            <div class="dental-chatbot-title">OdontoBot</div>
            <div class="dental-chatbot-subtitle">Online agora</div>
          </div>
        </div>
        <button id="dental-chatbot-close">&times;</button>
      </div>
      <div id="dental-chatbot-messages"></div>
      <div id="dental-chatbot-input-area">
        <input type="text" id="dental-chatbot-input" placeholder="Digite sua mensagem...">
        <button id="dental-chatbot-send">
          <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
            <line x1="22" y1="2" x2="11" y2="13"></line>
            <polygon points="22 2 15 22 11 13 2 9 22 2"></polygon>
          </svg>
        </button>
      </div>
    </div>
    <div id="dental-chatbot-toggle">
      <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
        <path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z"></path>
      </svg>
    </div>
  `;
  document.body.appendChild(wrapper);

  // Elements
  const toggleBtn = document.getElementById('dental-chatbot-toggle');
  const chatWindow = document.getElementById('dental-chatbot-window');
  const closeBtn = document.getElementById('dental-chatbot-close');
  const messagesDiv = document.getElementById('dental-chatbot-messages');
  const inputField = document.getElementById('dental-chatbot-input');
  const sendBtn = document.getElementById('dental-chatbot-send');

  let isOpen = false;
  let hasInteracted = false;
  let inactivityTimer = null;
  let messageCount = 0;

  // Scheduling State
  let flowState = 'main'; // main, waiting_name, waiting_phone, waiting_service, waiting_date, waiting_time
  let schedulingData = {
    nome: '',
    telefone: '',
    servico: '',
    data: '',
    horario: ''
  };

  const WHATSAPP_NUM = "5511987828745"; // Based on (11) 98782-8745

  // Initialize
  toggleBtn.addEventListener('click', toggleChat);
  closeBtn.addEventListener('click', toggleChat);
  sendBtn.addEventListener('click', handleSend);
  inputField.addEventListener('keypress', (e) => {
    if (e.key === 'Enter') handleSend();
  });

  function toggleChat() {
    isOpen = !isOpen;
    if (isOpen) {
      chatWindow.classList.add('open');
      document.getElementById('dental-chatbot-toggle').style.display = 'none';
      if (messageCount === 0) {
        showTyping();
        setTimeout(() => {
          removeTyping();
          addBotMessage("Olá! 👋 Bem-vindo à nossa clínica odontológica.<br><br>Posso te ajudar a agendar uma consulta ou tirar alguma dúvida.");
          showMainMenu();
        }, 1200);
      }
      resetInactivityTimer();
    } else {
      chatWindow.classList.remove('open');
      document.getElementById('dental-chatbot-toggle').style.display = 'flex';
      clearTimeout(inactivityTimer);
    }
  }

  function resetInactivityTimer() {
    clearTimeout(inactivityTimer);
    if (!hasInteracted && isOpen && messageCount > 0) {
      inactivityTimer = setTimeout(() => {
        showTyping();
        setTimeout(() => {
          removeTyping();
          addBotMessage("Posso te ajudar a agendar uma consulta 😊");
        }, 1200);
        hasInteracted = true; // Shows inactivity message only once
      }, 10000); // 10 seconds
    }
  }

  function handleSend() {
    const text = inputField.value.trim();
    if (!text) return;
    
    addUserMessage(text);
    inputField.value = '';
    hasInteracted = true;
    clearTimeout(inactivityTimer);

    processUserInput(text);
  }

  function showTyping() {
    const typingHtml = `
      <div class="typing-indicator" id="typing-indicator">
        <div class="typing-dot"></div>
        <div class="typing-dot"></div>
        <div class="typing-dot"></div>
      </div>
    `;
    messagesDiv.insertAdjacentHTML('beforeend', typingHtml);
    scrollToBottom();
  }

  function removeTyping() {
    const indicator = document.getElementById('typing-indicator');
    if (indicator) {
      indicator.remove();
    }
  }

  function addBotMessage(text) {
    messageCount++;
    const msgDiv = document.createElement('div');
    msgDiv.className = 'chat-msg bot';
    msgDiv.innerHTML = text;
    messagesDiv.appendChild(msgDiv);
    scrollToBottom();
  }

  function addUserMessage(text) {
    messageCount++;
    const msgDiv = document.createElement('div');
    msgDiv.className = 'chat-msg user';
    msgDiv.textContent = text;
    messagesDiv.appendChild(msgDiv);
    scrollToBottom();
  }

  function addButtonGroup(buttons) {
    const groupDiv = document.createElement('div');
    groupDiv.className = 'chat-buttons';
    
    buttons.forEach(btn => {
      const button = document.createElement('button');
      button.className = btn.primary ? 'chat-btn primary' : 'chat-btn';
      button.innerHTML = btn.text;
      button.addEventListener('click', () => {
        hasInteracted = true;
        clearTimeout(inactivityTimer);
        // Only append user message if it's text-based response context
        addUserMessage(button.textContent);
        if(btn.action) btn.action();
        groupDiv.style.pointerEvents = 'none'; // disable repeated clicks
        groupDiv.style.opacity = '0.7';
      });
      groupDiv.appendChild(button);
    });
    
    messagesDiv.appendChild(groupDiv);
    scrollToBottom();
  }

  function scrollToBottom() {
    messagesDiv.scrollTop = messagesDiv.scrollHeight;
  }

  function showMainMenu() {
    addButtonGroup([
      { text: "📅 Agendar consulta", primary: true, action: startScheduling },
      { text: "🦷 Ver serviços", action: showServices },
      { text: "💰 Solicitar orçamento", action: reqBudget },
      { text: "⏰ Horário de funcionamento", action: showHours },
      { text: "📍 Localização", action: showLocation },
      { text: "📞 Falar no WhatsApp", action: toWhatsApp },
      { text: "❓ Tirar dúvidas", action: () => handleBotResponseWithTyping("Claro! Qual é a sua dúvida? Pode digitar aqui embaixo.") }
    ]);
  }

  // Scheduling Flow
  function startScheduling() {
    flowState = 'waiting_name';
    schedulingData = { nome: '', telefone: '', servico: '', data: '', horario: '' };
    handleBotResponseWithTyping("Excelente! Para começar, qual é o seu nome?");
  }

  // NLP Answer Questions Logic
  function processUserInput(text) {
    showTyping();
    setTimeout(() => {
      removeTyping();
      
      const lowerText = text.toLowerCase();

      // Handle Scheduling Flow
      if (flowState === 'waiting_name') {
        schedulingData.nome = text;
        flowState = 'waiting_phone';
        addBotMessage(`Prazer, ${text}! Qual é o seu telefone com DDD?`);
        return;
      }
      if (flowState === 'waiting_phone') {
        schedulingData.telefone = text;
        flowState = 'waiting_service';
        addBotMessage("Certo! Qual serviço você deseja?");
        addButtonGroup([
          { text: "🦷 Cuidados gerais", action: () => setService("Cuidados gerais") },
          { text: "💎 Implantes dentários", action: () => setService("Implantes dentários") },
          { text: "✨ Odontologia estética", action: () => setService("Odontologia estética") },
          { text: "😁 Clareamento dental", action: () => setService("Clareamento dental") }
        ]);
        return;
      }
      
      // Ignore free text during service selection by checking buttons
      if (flowState === 'waiting_service') {
        setService(text);
        return;
      }
      
      if (flowState === 'waiting_date') {
        schedulingData.data = text;
        flowState = 'waiting_time';
        addBotMessage("Ótimo. E qual horário você prefere?");
        return;
      }
      
      if (flowState === 'waiting_time') {
        schedulingData.horario = text;
        flowState = 'main';
        finishScheduling();
        return;
      }

      // Handle natural language questions
      let responded = false;

      if (lowerText.includes('preço') || lowerText.includes('valor') || lowerText.includes('custa') || lowerText.includes('orçamento')) {
        addBotMessage("O valor dos tratamentos varia conforme a necessidade de cada paciente. Uma avaliação é essencial!");
        setTimeout(() => {
          addBotMessage("Para te passar valores exatos, posso agendar um horário para você?");
          addButtonGroup([
            { text: "📅 Sim, agendar", primary: true, action: startScheduling },
            { text: "💬 Falar no WhatsApp", action: toWhatsApp }
          ]);
        }, 1000);
        responded = true;
      } else if (lowerText.includes('clareamento') && (lowerText.includes('dói') || lowerText.includes('dor'))) {
        addBotMessage("O clareamento profissional é muito seguro. Pode haver uma leve sensibilidade temporária, mas usamos técnicas e produtos que minimizam qualquer desconforto.");
        setTimeout(() => {
          addBotMessage("Deseja agendar uma consulta para avaliação?");
          addButtonGroup([{ text: "📅 Sim, agendar", primary: true, action: startScheduling }]);
        }, 1000);
        responded = true;
      } else if (lowerText.includes('implante') && (lowerText.includes('demora') || lowerText.includes('tempo'))) {
        addBotMessage("O tempo do implante varia. A cirurgia é rápida (1 a 2 horas), mas a cicatrização óssea pode levar alguns meses. Temos opções de carga imediata dependendo do caso.");
        setTimeout(() => {
          addBotMessage("Posso agendar um horário para você conversar com nosso implantodontista?");
          addButtonGroup([{ text: "📅 Sim, agendar", primary: true, action: startScheduling }]);
        }, 1000);
        responded = true;
      } else if (lowerText.includes('convênio') || lowerText.includes('plano')) {
        addBotMessage("Trabalhamos de forma particular, mas emitimos nota fiscal para que você possa solicitar reembolso ao seu convênio.");
        setTimeout(() => {
          addBotMessage("Quer falar com um atendente no WhatsApp para mais detalhes?");
          addButtonGroup([
            { text: "💬 Sim, falar no WhatsApp", action: toWhatsApp },
            { text: "📅 Não, agendar consulta", primary: true, action: startScheduling }
          ]);
        }, 1000);
        responded = true;
      } else if (lowerText.includes('onde fica') || lowerText.includes('endereço') || lowerText.includes('local') || lowerText.includes('localização')) {
        showLocation();
        responded = true;
      } else if (lowerText.includes('horário') || lowerText.includes('horas') || lowerText.includes('aberto') || lowerText.includes('funcionamento')) {
        showHours();
        responded = true;
      } else if (lowerText.includes('telefone') || lowerText.includes('contato') || lowerText.includes('zap') || lowerText.includes('whatsapp') || lowerText.includes('whats')) {
        addBotMessage("Você pode ligar ou chamar no WhatsApp: (11) 98782-8745");
        responded = true;
      } else if (lowerText.includes('serviço') || lowerText.includes('tratamento')) {
        showServices();
        responded = true;
      } else if (lowerText.includes('agendar') || lowerText.includes('marcar') || lowerText.includes('consulta')) {
        startScheduling();
        responded = true;
      }

      if (!responded) {
        addBotMessage("Entendi. Para que possamos te dar a melhor atenção e detalhes específicos do seu caso, sugerimos falar com um atendente ou realizar uma avaliação presencial.");
        setTimeout(() => {
          addBotMessage("Deseja agendar uma consulta?");
          addButtonGroup([
            { text: "📅 Sim, agendar", primary: true, action: startScheduling },
            { text: "💬 Falar com atendente real", action: toWhatsApp }
          ]);
        }, 1000);
      }

    }, 1200); // 1.2s typing emulation
  }

  function setService(serviceName) {
    if (flowState !== 'waiting_service') return;
    schedulingData.servico = serviceName;
    flowState = 'waiting_date';
    handleBotResponseWithTyping(`Perfeito, agendamento para ${serviceName}. Qual data deseja? (Ex: Próxima segunda, 15/10...)`);
  }

  function finishScheduling() {
    addBotMessage("Obrigado! Sua solicitação foi enviada para nossa equipe.<br><br>Clique abaixo para confirmar seu agendamento pelo WhatsApp.");
    
    // Generate WhatsApp Link
    const msg = `Olá! Gostaria de confirmar meu agendamento.%0A%0A*Nome:* ${schedulingData.nome}%0A*Telefone:* ${schedulingData.telefone}%0A*Serviço:* ${schedulingData.servico}%0A*Data:* ${schedulingData.data}%0A*Horário:* ${schedulingData.horario}`;
    const link = `https://wa.me/${WHATSAPP_NUM}?text=${msg}`;
    
    setTimeout(() => {
      addButtonGroup([
        { text: "💬 Confirmar pelo WhatsApp", primary: true, action: () => window.open(link, '_blank') }
      ]);
    }, 500);
  }

  // Pre-defined responses helper
  function handleBotResponseWithTyping(text, afterAction) {
    showTyping();
    setTimeout(() => {
      removeTyping();
      addBotMessage(text);
      if (afterAction) afterAction();
    }, 1200);
  }

  function showServices() {
    showTyping();
    setTimeout(() => {
      removeTyping();
      addBotMessage(
        "Aqui estão nossos principais serviços:<br><br>" +
        "<b>🦷 Cuidados gerais</b> – Limpeza, restaurações e prevenção<br>" +
        "<b>💎 Implantes dentários</b> – Substituição de dentes perdidos<br>" +
        "<b>✨ Odontologia estética</b> – Lentes, facetas e estética do sorriso<br>" +
        "<b>😁 Clareamento dental</b> – Clareamento profissional"
      );
      setTimeout(() => {
        addBotMessage("Posso agendar um horário para você?");
        addButtonGroup([
          { text: "📅 Sim, agendar", primary: true, action: startScheduling },
          { text: "Menu inicial", action: showMainMenu }
        ]);
      }, 1000);
    }, 1200);
  }

  function reqBudget() {
    handleBotResponseWithTyping("Para fornecer um orçamento preciso, precisamos realizar uma avaliação clínica do seu sorriso.", () => {
      setTimeout(() => {
        addBotMessage("Deseja agendar uma consulta para orçamento?");
        addButtonGroup([
          { text: "📅 Sim, agendar avaliação", primary: true, action: startScheduling },
          { text: "💬 Falar com a equipe no WhatsApp", action: toWhatsApp }
        ]);
      }, 1000);
    });
  }

  function showHours() {
    handleBotResponseWithTyping("Nosso horário de atendimento é de Segunda a Sábado, das 9:00 às 21:00.", () => {
      setTimeout(() => {
        addBotMessage("Posso agendar um horário para você?");
        addButtonGroup([
          { text: "📅 Sim, agendar horário", primary: true, action: startScheduling },
          { text: "Outras dúvidas", action: showMainMenu }
        ]);
      }, 1000);
    });
  }

  function showLocation() {
    handleBotResponseWithTyping("Nossa clínica está super bem localizada no centro, com fácil acesso e estacionamento conveniado.", () => {
      setTimeout(() => {
        addBotMessage("Quer falar com um atendente no WhatsApp para enviarmos o mapa com a localização exata?");
        addButtonGroup([
          { text: "📍 Enviar mapa no WhatsApp", primary: true, action: toWhatsApp },
          { text: "📅 Prefiro agendar agora", action: startScheduling }
        ]);
      }, 1000);
    });
  }

  function toWhatsApp() {
    handleBotResponseWithTyping("Redirecionando para nossa equipe no WhatsApp...", () => {
      setTimeout(() => {
        window.open(`https://wa.me/${WHATSAPP_NUM}?text=Olá! Venho do site e gostaria de atendimento.`, '_blank');
      }, 800);
    });
  }

})();
